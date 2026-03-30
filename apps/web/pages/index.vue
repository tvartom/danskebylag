<script setup lang="ts">
import { chapters } from '~/content/chapters/index.js'

useHead({
  title: 'Danske Bylag — Poul Meyer (1949)',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-serif font-bold mb-2">Danske Bylag</h1>
      <p class="text-lg text-muted-color">
        En framställning af det danske landsbystyre
      </p>
      <p class="text-sm text-muted-color mt-1">Poul Meyer, 1949</p>
    </header>

    <section class="mb-8">
      <p class="text-base leading-relaxed text-surface-700">
        Denna webbplats presenterar Poul Meyers doktorsavhandling <em>Danske Bylag</em> (1949)
        i tre vyer per kapitel: den danska originaltexten, en svensk översättning och en
        strukturerad svensk sammanfattning.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-serif font-semibold mb-6">Innehållsförteckning</h2>
      <ol class="space-y-3">
        <li v-for="chapter in chapters" :key="chapter.slug">
          <NuxtLink
            :to="`/kapitel/${chapter.slug}`"
            class="group flex items-baseline gap-3 hover:bg-surface-50 rounded-lg px-3 py-2 -mx-3 transition-colors"
          >
            <span class="text-sm text-muted-color w-8 shrink-0">
              {{ chapter.number != null ? `${chapter.number}.` : '' }}
            </span>
            <span class="group-hover:text-primary">
              {{ chapter.titleSv }}
            </span>
            <span class="text-xs text-muted-color ml-auto shrink-0">
              s. {{ chapter.printedPages }}
            </span>
          </NuxtLink>
        </li>
      </ol>
    </section>
  </div>
</template>
