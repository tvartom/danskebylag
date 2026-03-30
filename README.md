# Danske Bylag

A static website presenting *Danske Bylag* (Poul Meyer, 1949) with original Danish text, Swedish translation, and Swedish summary per chapter.

**Source PDF:** [Juridiske Monografier — Meyer, Dansk bylag, 1949](https://jura.ku.dk/jurabog/pdf/juridiske-monografier/Meyer_Dansk_bylag_1949.pdf) (Copenhagen University)

## Stack

- **Frontend**: Nuxt 4 on Cloudflare Pages
- **Styling**: Tailwind CSS v4 + PrimeVue v4
- **Build**: Turborepo + pnpm workspaces
- **Linting**: Biome
- **Testing**: Vitest

## Structure

```
apps/
└── web/              # Nuxt 4 frontend (Cloudflare Pages)

packages/
├── shared/           # Common types and utilities
└── tsconfig/         # Shared TypeScript configs
```

## Prerequisites

- Node.js >= 24
- pnpm (enabled via corepack)
- Cloudflare account with Wrangler CLI authenticated

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development

```bash
pnpm dev
```

Nuxt frontend: http://localhost:3000

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm dev:kill` | Kill all dev processes |
| `pnpm build` | Build all packages |
| `pnpm check` | Run Biome linting and formatting (auto-fix) |
| `pnpm test` | Run tests |
| `pnpm typecheck` | Type-check all packages |
| `pnpm deploy:production` | Deploy to Cloudflare Pages |

## Cloudflare Pages Settings

When connecting this repo in the Cloudflare Pages dashboard, use these settings:

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | `npx turbo run build --filter=@repo/web` |
| **Build output directory** | `apps/web/.output/public` |
| **Root directory** | `/` (repository root) |
| **Node.js version** | `24` (set via environment variable `NODE_VERSION=24`) |

### Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_VERSION` | `24` | Required — Cloudflare Pages defaults to an older Node version |
| `PNPM_VERSION` | `10` | Ensures correct pnpm version is used |

### How It Works

The Nuxt app uses the `cloudflare_pages` Nitro preset (configured in `apps/web/nuxt.config.ts`). This produces a `_worker.js` bundle inside the build output directory (`apps/web/.output/public`), which Cloudflare Pages discovers automatically for SSR — no need for Wrangler to locate `wrangler.jsonc` in the monorepo.

The Wrangler config at `apps/web/wrangler.jsonc` defines the project name (`danskebylag-web`), compatibility date, and `production`/`preview` environments.

## UI Components

This project uses [PrimeVue](https://primevue.org/) v4 with the `Prime` prefix for all components:

```vue
<template>
  <PrimeCard>
    <template #title>Card Title</template>
    <template #content>
      <PrimeButton label="Click me" />
      <PrimeTag value="Status" />
    </template>
  </PrimeCard>
</template>
```

Tailwind CSS v4 is integrated for utility styling. The `tailwindcss-primeui` plugin adds PrimeVue-aware utilities like `text-primary`, `bg-surface-50`, `text-muted-color`.

## License

MIT
