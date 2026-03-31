<script setup lang="ts">
import { chapters } from '~/content/chapters/index.js'

const props = defineProps<{ slug: string }>()

const currentIndex = computed(() => chapters.findIndex((c) => c.slug === props.slug))
const prev = computed(() => (currentIndex.value > 0 ? chapters[currentIndex.value - 1] : null))
const next = computed(() =>
	currentIndex.value < chapters.length - 1 ? chapters[currentIndex.value + 1] : null,
)
</script>

<template>
  <nav class="flex justify-between items-center py-6 border-t border-surface-200 mt-8">
    <NuxtLink
      v-if="prev"
      :to="`/kapitel/${prev.slug}`"
      class="text-sm text-primary hover:underline"
    >
      &larr; {{ prev.titleSv }}
    </NuxtLink>
    <span v-else />
    <NuxtLink
      v-if="next"
      :to="`/kapitel/${next.slug}`"
      class="text-sm text-primary hover:underline"
    >
      {{ next.titleSv }} &rarr;
    </NuxtLink>
  </nav>
</template>
