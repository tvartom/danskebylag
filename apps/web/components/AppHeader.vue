<script setup lang="ts">
defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <header class="sticky top-0 z-50 bg-surface-0 border-b border-surface-200">
    <nav class="px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button
          class="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-color hover:text-primary hover:bg-surface-100 transition-colors"
          aria-label="Öppna innehållsförteckning"
          @click="$emit('toggleSidebar')"
        >
          <i class="pi pi-bars text-lg" />
        </button>
        <NuxtLink to="/" class="text-lg font-semibold text-primary hover:text-primary/80">
          Danske Bylag
        </NuxtLink>
      </div>
      <div class="flex gap-4 text-sm">
        <NuxtLink to="/" class="text-muted-color hover:text-primary">Hem</NuxtLink>
        <NuxtLink to="/ordlista" class="text-muted-color hover:text-primary">Ordlista</NuxtLink>
        <NuxtLink to="/om" class="text-muted-color hover:text-primary">Om</NuxtLink>
      </div>
    </nav>
  </header>
</template>
