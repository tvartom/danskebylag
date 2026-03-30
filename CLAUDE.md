# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare monorepo with Nuxt 4 frontend, Cloudflare Workers, and D1 database using Drizzle ORM.

**UI Stack**: Tailwind CSS v4 + PrimeVue v4 (with `Prime` prefix)

## Common Commands

```bash
pnpm dev              # Start all apps in development
pnpm dev:kill         # Kill all dev processes
pnpm build            # Build all packages
pnpm check            # Run Biome linting
pnpm test             # Run tests
pnpm generate:types   # Generate Cloudflare types (wrangler types)
pnpm typecheck        # Type-check all packages
pnpm db:generate      # Generate Drizzle migrations from schema
pnpm db:migrate:local # Apply migrations to local D1
pnpm deploy:production # Deploy all apps to production
```

## Configuration Files

**IMPORTANT**: This project uses specific configuration file names:
- **Wrangler** (Cloudflare Workers): `wrangler.jsonc` (NOT wrangler.toml)
- **Drizzle** (Database ORM): `drizzle.config.ts` (NOT drizzle.config.js)

Never create alternative config files with different extensions!

## Code Conventions

### Database Schema

- **Table names**: Use camelCase (e.g., `users`, `posts`, `userProfiles`)
- **Column names**: Use camelCase in the database (e.g., `createdAt`, `authorId`, `isPublished`)
- Column names in Drizzle should match the database column names exactly

Example:
```typescript
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  authorId: integer('authorId').notNull(),  // camelCase in DB
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
})
```

### Server API Endpoints

**IMPORTANT**: Always use **static URL paths** for server API endpoints so that Nuxt can auto-infer the return type via Nitro's typed routes. Never use dynamic path segments when the call site would need a function URL in `useFetch`.

- **Do**: `server/api/area/detail.get.ts` with query params
- **Don't**: `server/api/area/[areaTypeCode]/[...slug].get.ts` — forces `useFetch(() => ...)` which makes the type `unknown`

### TypeScript/JavaScript

- **Use `.js` extensions** for relative imports in TypeScript source files (ESM requirement)
- Example: `import { users } from './users.js'`
- Drizzle-kit runs with tsx which supports `.js` extensions for TypeScript files
- Package imports don't need extensions: `import { users } from '@repo/database/schema'`

### Formatting

- Biome is used for linting and formatting (not ESLint/Prettier)
- Run `pnpm check` to auto-fix issues

### UI Components (PrimeVue)

- All PrimeVue components use the `Prime` prefix: `<PrimeButton>`, `<PrimeCard>`, `<PrimeTag>`
- Use Tailwind utilities alongside PrimeVue components
- PrimeVue-specific utilities from `tailwindcss-primeui`: `text-primary`, `bg-surface-50`, `text-muted-color`

Example:
```vue
<PrimeCard class="shadow-lg">
  <template #title>Title</template>
  <template #content>
    <PrimeButton label="Submit" class="w-full" />
  </template>
</PrimeCard>
```

### Vue Template Style

Use **camelCase** for prop bindings and event listeners, and **shorthand** when the value matches the prop name:

```vue
<!-- ✅ Correct -->
<PrimeVirtualScroller
  :rows
  :items="allItems"
  :itemSize="72"
  @scrollIndexChange="onScrollChange"
/>

<!-- ❌ Wrong -->
<PrimeVirtualScroller
  :rows="rows"
  :items="allItems"
  :item-size="72"
  @scroll-index-change="onScrollChange"
/>
```

## Architecture

- `apps/web` - Nuxt 4 frontend on Cloudflare Pages
- `apps/api-worker` - API Worker (RPC consumer)
- `apps/auth-worker` - Auth Worker (RPC provider)
- `packages/database` - Drizzle schema and D1 migrations
- `packages/shared` - Common types and utilities
- `packages/tsconfig` - Shared TypeScript configurations

### Cloudflare Pages Build Configuration

The `apps/web` Nuxt app deploys to Cloudflare Pages. The Nitro preset is `cloudflare_pages`, which generates a `_worker.js` bundle inside the output directory so CF Pages can discover the SSR worker without needing to find `wrangler.jsonc` (important in a monorepo where the config is in a subdirectory).

### Cloudflare Types

Each app that uses Cloudflare bindings runs `wrangler types` to generate type definitions. This is integrated into the `prepare` and `typecheck` scripts. The generated `worker-configuration.d.ts` file is referenced from `env.d.ts`.
