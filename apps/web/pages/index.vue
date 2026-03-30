<template>
  <div class="max-w-4xl mx-auto p-8 font-sans">
    <h1 class="text-4xl font-bold text-primary mb-2">Welcome to danskebylag</h1>
    <p class="text-muted-color text-lg mb-8">A Nuxt 4 + Cloudflare Pages app</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PrimeCard>
        <template #title>Nuxt 4</template>
        <template #content>
          <p class="text-muted-color">Latest Nuxt with Cloudflare Pages</p>
        </template>
      </PrimeCard>
      <PrimeCard>
        <template #title>Tailwind CSS v4</template>
        <template #content>
          <p class="text-muted-color">Utility-first CSS framework</p>
        </template>
      </PrimeCard>
      <PrimeCard>
        <template #title>PrimeVue</template>
        <template #content>
          <p class="text-muted-color">Rich UI component library</p>
        </template>
      </PrimeCard>
    </div>
  </div>
</template>
