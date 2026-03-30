<template>
  <div class="max-w-4xl mx-auto p-8 font-sans">
    <h1 class="text-4xl font-bold text-primary mb-2">Welcome to Cloudflare Monorepo</h1>
    <p class="text-muted-color text-lg mb-8">A Nuxt 4 + Cloudflare Workers template</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <PrimeCard>
        <template #title>🚀 Nuxt 4</template>
        <template #content>
          <p class="text-muted-color">Latest Nuxt with Cloudflare Pages</p>
        </template>
      </PrimeCard>
      <PrimeCard>
        <template #title>⚡ Workers</template>
        <template #content>
          <p class="text-muted-color">Standalone Workers with RPC</p>
        </template>
      </PrimeCard>
      <PrimeCard>
        <template #title>🗃️ D1 Database</template>
        <template #content>
          <p class="text-muted-color">SQLite with Drizzle ORM</p>
        </template>
      </PrimeCard>
    </div>

    <PrimeCard v-if="users">
      <template #title>Users from D1</template>
      <template #content>
        <ul v-if="users.length" class="space-y-2">
          <li v-for="user in users" :key="user.id" class="flex items-center gap-2">
            <PrimeTag :value="user.name" />
            <span class="text-muted-color">{{ user.email }}</span>
          </li>
        </ul>
        <p v-else class="text-muted-color">No users yet. Add some via the API!</p>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@repo/database/schema'

const { data: users } = await useFetch<User[]>('/api/users')
</script>
