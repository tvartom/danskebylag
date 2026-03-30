<script setup lang="ts">
import { chapters } from '~/content/chapters/index.js'
import { useChapterContent } from '~/composables/useChapterContent.js'
import { useMarkdown } from '~/composables/useMarkdown.js'

const route = useRoute()
const slug = route.params.slug as string

const chapter = chapters.find(c => c.slug === slug)
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
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <header class="mb-6">
      <p v-if="chapter.number != null" class="text-sm text-muted-color">
        Kapitel {{ chapter.number }}
      </p>
      <h1 class="text-3xl font-serif font-bold">{{ chapter.titleSv }}</h1>
      <p class="text-sm text-muted-color mt-1">
        {{ chapter.titleDa }} &middot; s. {{ chapter.printedPages }}
      </p>
    </header>

    <ChapterTabs :daHtml :svHtml :summaryHtml />
    <ChapterNav :slug />
  </div>
</template>
