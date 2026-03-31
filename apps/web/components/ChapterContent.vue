<script setup lang="ts">
const props = defineProps<{
	html: string
	lang: string
}>()
</script>

<template>
  <div
    class="prose prose-stone max-w-none prose-headings:font-serif prose-p:leading-relaxed"
    :lang="props.lang"
    v-html="props.html"
  />
</template>
