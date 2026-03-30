<template>
  <div class="min-h-screen flex flex-col bg-surface-0 text-surface-900">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
