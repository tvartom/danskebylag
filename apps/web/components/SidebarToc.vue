<script setup lang="ts">
import { chapters } from '~/content/chapters/index.js'

const emit = defineEmits<{ select: [] }>()

const route = useRoute()
const currentSlug = computed(() => route.params.slug as string | undefined)
</script>

<template>
  <nav aria-label="Innehållsförteckning">
    <h2 class="text-sm font-semibold uppercase tracking-wide text-muted-color mb-3 px-3">
      Innehållsförteckning
    </h2>
    <ol class="space-y-0.5">
      <li v-for="chapter in chapters" :key="chapter.slug">
        <NuxtLink
          :to="`/kapitel/${chapter.slug}`"
          class="flex items-baseline gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
          :class="
            currentSlug === chapter.slug
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-surface-700 hover:bg-surface-100 hover:text-surface-900'
          "
          @click="emit('select')"
        >
          <span v-if="chapter.number != null" class="w-5 shrink-0 text-right text-muted-color text-xs">
            {{ chapter.number }}.
          </span>
          <span v-else class="w-5 shrink-0" />
          <span class="leading-snug">{{ chapter.titleSv }}</span>
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>
