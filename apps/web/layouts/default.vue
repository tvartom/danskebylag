<script setup lang="ts">
const sidebarVisible = ref(false)

const route = useRoute()
watch(
	() => route.fullPath,
	() => {
		sidebarVisible.value = false
	},
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-0 text-surface-900">
    <AppHeader @toggleSidebar="sidebarVisible = !sidebarVisible" />

    <div class="flex flex-1">
      <!-- Desktop sidebar -->
      <aside class="hidden lg:block w-64 shrink-0 border-r border-surface-200 sticky top-0 h-screen overflow-y-auto py-6 px-2">
        <SidebarToc />
      </aside>

      <!-- Main content -->
      <div class="flex-1 flex flex-col min-w-0">
        <main class="flex-1">
          <slot />
        </main>
        <AppFooter />
      </div>
    </div>

    <!-- Mobile drawer -->
    <PrimeDrawer v-model:visible="sidebarVisible" position="left" :modal="true" class="w-72!">
      <template #header>
        <span class="font-semibold text-lg">Navigation</span>
      </template>
      <SidebarToc @select="sidebarVisible = false" />
    </PrimeDrawer>
  </div>
</template>
