<script setup lang="ts">
import { useChapterContent } from '~/composables/useChapterContent.js'
import { useMarkdown } from '~/composables/useMarkdown.js'
import { chapters } from '~/content/chapters/index.js'

const route = useRoute()
const slug = route.params.slug as string

const chapter = chapters.find((c) => c.slug === slug)
if (!chapter) {
	throw createError({ statusCode: 404, message: 'Kapitlet hittades inte' })
}

useHead({
	title: `${chapter.titleSv} — Danske Bylag`,
	meta: [
		{ name: 'description', content: `${chapter.titleSv} ur Danske Bylag av Poul Meyer (1949).` },
	],
})

const { da, sv, summary } = await useChapterContent(slug)

const daHtml = useMarkdown(da)
const svHtml = useMarkdown(sv)
const summaryHtml = useMarkdown(summary)

const isWide = ref(false)
if (import.meta.client) {
	const mql = window.matchMedia('(min-width: 1536px)')
	isWide.value = mql.matches
	mql.addEventListener('change', (e) => {
		isWide.value = e.matches
	})
}
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-3xl 2xl:max-w-full 2xl:flex 2xl:gap-8">
    <div class="w-full max-w-3xl shrink-0">
      <header class="mb-6">
        <p v-if="chapter.number != null" class="text-sm text-muted-color">
          Kapitel {{ chapter.number }}
        </p>
        <h1 class="text-3xl font-serif font-bold">{{ chapter.titleSv }}</h1>
        <p class="text-sm text-muted-color mt-1">
          {{ chapter.titleDa }} &middot; s. {{ chapter.printedPages }}
        </p>
      </header>

      <ChapterTabs :daHtml :svHtml :summaryHtml :pdfPages="chapter.pdfPages" :showPdfTab="!isWide" />
      <ChapterNav :slug />
    </div>

    <aside v-if="isWide" class="hidden 2xl:block flex-1 min-w-0 sticky top-4 self-start max-h-screen overflow-y-auto">
      <ChapterPdf :pdfPages="chapter.pdfPages" />
    </aside>
  </div>
</template>
