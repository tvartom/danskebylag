<template>
  <header class="sticky top-0 z-50 bg-surface-0 border-b border-surface-200">
    <nav class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink to="/" class="text-lg font-semibold text-primary hover:text-primary/80">
        Danske Bylag
      </NuxtLink>
      <div class="flex gap-4 text-sm">
        <NuxtLink to="/" class="text-muted-color hover:text-primary">Hem</NuxtLink>
        <NuxtLink to="/ordlista" class="text-muted-color hover:text-primary">Ordlista</NuxtLink>
        <NuxtLink to="/om" class="text-muted-color hover:text-primary">Om</NuxtLink>
      </div>
    </nav>
  </header>
</template>
