# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 frontend deployed to Cloudflare Pages. No server-side code, no database, no workers.

**UI Stack**: Tailwind CSS v4 + PrimeVue v4 (with `Prime` prefix)

## Common Commands

```bash
pnpm dev              # Start dev server
pnpm dev:kill         # Kill all dev processes
pnpm build            # Build all packages
pnpm check            # Run Biome linting
pnpm test             # Run tests
pnpm typecheck        # Type-check all packages
pnpm deploy:production # Deploy to production
```

## Configuration Files

**IMPORTANT**: This project uses specific configuration file names:
- **Wrangler** (Cloudflare Pages): `wrangler.jsonc` (NOT wrangler.toml)

Never create alternative config files with different extensions!

## Code Conventions

### TypeScript/JavaScript

- **Use `.js` extensions** for relative imports in TypeScript source files (ESM requirement)
- Example: `import { foo } from './foo.js'`
- Package imports don't need extensions: `import { foo } from '@repo/shared'`

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
<!-- Correct -->
<PrimeVirtualScroller
  :rows
  :items="allItems"
  :itemSize="72"
  @scrollIndexChange="onScrollChange"
/>

<!-- Wrong -->
<PrimeVirtualScroller
  :rows="rows"
  :items="allItems"
  :item-size="72"
  @scroll-index-change="onScrollChange"
/>
```

## Architecture

- `apps/web` - Nuxt 4 frontend on Cloudflare Pages
- `packages/shared` - Common types and utilities
- `packages/tsconfig` - Shared TypeScript configurations

### Cloudflare Pages Build Configuration

The `apps/web` Nuxt app deploys to Cloudflare Pages. The Nitro preset is `cloudflare_pages`, which generates a `_worker.js` bundle inside the output directory so CF Pages can discover the SSR worker without needing to find `wrangler.jsonc` (important in a monorepo where the config is in a subdirectory).

## Project: Danske Bylag

This project presents the book *Danske Bylag* (Poul Meyer, 1949) as a static website with three views per chapter: original Danish text, Swedish translation, and Swedish summary.

- **PDF source:** `https://jura.ku.dk/jurabog/pdf/juridiske-monografier/Meyer_Dansk_bylag_1949.pdf`
- **Roadmap:** See `ROADMAP.md` for task tracking
- **Content pipeline:** See `docs/content-pipeline.md` for extraction/translation/review workflow
- **Web architecture:** See `docs/web-architecture.md` for components, routes, and decisions

### Working Principles

- **Content-first:** Extract and structure all content before building the web UI
- **Divide and conquer:** Translate one chapter at a time in dedicated subagents to keep context small
- **Review before proceed:** Each chapter gets a review agent check before user approval
- **No @nuxt/content:** Plain `.md` + `.ts` files rendered with `marked` — no SQLite dependency
