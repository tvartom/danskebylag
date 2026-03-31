<script setup lang="ts">
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'

const props = defineProps<{
	pdfPages: string
}>()

function parsePageRange(pdfPages: string) {
	const match = pdfPages.match(/^(\d+)\s*[–-]\s*(\d+)$/)
	if (match) return { start: Number(match[1]), end: Number(match[2]) }
	const single = pdfPages.match(/^(\d+)$/)
	if (single) return { start: Number(single[1]), end: Number(single[1]) }
	return { start: 1, end: 1 }
}

const { start: startPage, end: endPage } = parsePageRange(props.pdfPages)
const totalChapterPages = endPage - startPage + 1

const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentPage = ref(startPage)
const loading = ref(true)
const error = ref<string | null>(null)

let pdfDoc: PDFDocumentProxy | null = null

async function renderPage(pageNum: number) {
	if (!pdfDoc || !canvasRef.value) return
	loading.value = true
	try {
		const page = await pdfDoc.getPage(pageNum)
		const scale = 1.5
		const viewport = page.getViewport({ scale })
		const canvas = canvasRef.value
		canvas.height = viewport.height
		canvas.width = viewport.width
		await page.render({ canvas, viewport }).promise
	} catch (e) {
		error.value = `Kunde inte rendera sida ${pageNum}.`
	} finally {
		loading.value = false
	}
}

function prevPage() {
	if (currentPage.value > startPage) {
		currentPage.value--
		renderPage(currentPage.value)
	}
}

function nextPage() {
	if (currentPage.value < endPage) {
		currentPage.value++
		renderPage(currentPage.value)
	}
}

onMounted(async () => {
	GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
	try {
		pdfDoc = await getDocument('/source.pdf').promise
		await renderPage(currentPage.value)
	} catch (e) {
		error.value = 'Kunde inte ladda PDF:en.'
		loading.value = false
	}
})

onUnmounted(() => {
	pdfDoc?.destroy()
	pdfDoc = null
})
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <div class="flex items-center gap-3">
      <PrimeButton
        label="‹ Förra"
        severity="secondary"
        text
        :disabled="currentPage <= startPage"
        @click="prevPage"
      />
      <span class="text-sm text-muted-color tabular-nums">
        Sida {{ currentPage }} / {{ endPage }}
        <span class="text-xs">({{ currentPage - startPage + 1 }} av {{ totalChapterPages }} i kapitlet)</span>
      </span>
      <PrimeButton
        label="Nästa ›"
        severity="secondary"
        text
        :disabled="currentPage >= endPage"
        @click="nextPage"
      />
    </div>

    <p v-if="error" class="text-red-600">
      {{ error }}
      <a href="/source.pdf" class="text-primary underline" download>Ladda ner PDF:en istället</a>
    </p>

    <div v-if="loading" class="flex items-center justify-center h-[60vh]">
      <PrimeProgressSpinner strokeWidth="3" />
    </div>

    <canvas ref="canvasRef" class="max-w-full border border-surface-200 rounded shadow-sm" :class="{ hidden: loading }" />

    <p class="text-sm text-muted-color">
      <a href="/source.pdf" class="text-primary underline" download>Ladda ner hela PDF:en</a>
    </p>
  </div>
</template>
