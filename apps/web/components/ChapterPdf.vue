<script setup lang="ts">
const props = defineProps<{
	pdfPages: string
}>()

const startPage = computed(() => {
	const match = props.pdfPages.match(/^(\d+)/)
	return match ? Number(match[1]) : 1
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <iframe
      :src="`/source.pdf#page=${startPage}`"
      class="w-full h-[80vh] border border-surface-200 rounded"
      title="Original PDF"
    />
    <p class="text-sm text-muted-color">
      s. {{ props.pdfPages }} i PDF:en.
      <a href="/source.pdf" class="text-primary underline" download>Ladda ner hela PDF:en</a>
    </p>
  </div>
</template>
