# Cloudflare Monorepo Template

A full-stack monorepo template for Cloudflare Pages + Workers with Nuxt 4, Drizzle ORM, and D1 database.

## Stack

- **Frontend**: Nuxt 4 on Cloudflare Pages
- **Styling**: Tailwind CSS v4 + PrimeVue v4
- **Backend**: Cloudflare Workers with RPC service bindings
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM
- **Build**: Turborepo + pnpm workspaces
- **Linting**: Biome
- **Testing**: Vitest

## Structure

```
apps/
├── web/              # Nuxt 4 frontend (Cloudflare Pages)
├── api-worker/       # API Worker (RPC consumer example)
└── auth-worker/      # Auth Worker (RPC provider example)

packages/
├── database/         # Drizzle schema + D1 migrations
├── shared/           # Common types and utilities
└── tsconfig/         # Shared TypeScript configs
```

## Prerequisites

- Node.js >= 20
- pnpm (enabled via corepack)
- Cloudflare account with Wrangler CLI authenticated

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Authenticate with Cloudflare

```bash
pnpm wrangler login
```

### 3. Create D1 Database

```bash
# Create production database
pnpm wrangler d1 create my-database

# Create preview database (for PR previews)
pnpm wrangler d1 create my-database-preview
```

Copy the returned `database_id` values and update the following files:

- `apps/web/wrangler.jsonc`
- `apps/api-worker/wrangler.jsonc`
- `packages/database/wrangler.jsonc`

Replace `<DATABASE_ID>` and `<PREVIEW_DATABASE_ID>` with your actual IDs.

### 4. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Cloudflare credentials (required for Drizzle Kit remote operations):

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_api_token
```

### 5. Generate Initial Migration

```bash
pnpm db:generate
```

This creates SQL migration files in `packages/database/drizzle/` based on the schema.

### 6. Apply Migrations

```bash
# Apply to local D1 (for development)
pnpm db:migrate:local

# Apply to remote D1 (for production)
pnpm db:migrate:remote
```

### 7. Start Development

```bash
pnpm dev
```

This starts all apps in parallel:
- Nuxt frontend: http://localhost:3000
- API Worker: http://localhost:8787
- Auth Worker: http://localhost:8788

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages and apps |
| `pnpm deploy` | Deploy all apps to Cloudflare |
| `pnpm check` | Run Biome linting and formatting check |
| `pnpm check:fix` | Auto-fix lint and format issues |
| `pnpm db:generate` | Generate Drizzle migrations from schema |
| `pnpm db:migrate:local` | Apply migrations to local D1 |
| `pnpm db:migrate:remote` | Apply migrations to remote D1 |
| `pnpm db:studio` | Open Drizzle Studio for database inspection |
| `pnpm test` | Run tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage |

## Database Workflow

### Adding a New Table

1. Create schema file in `packages/database/src/schema/`:

```typescript
// packages/database/src/schema/comments.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { posts } from './posts.js'

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  postId: integer('postId').references(() => posts.id),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
```

2. Export from `packages/database/src/schema/index.ts`:

```typescript
export * from './comments.js'
```

3. Generate and apply migration:

```bash
pnpm db:generate
pnpm db:migrate:local   # Test locally first
pnpm db:migrate:remote  # Then apply to production
```

### Using the Database

In Nuxt server routes:

```typescript
// apps/web/server/api/comments.get.ts
import { comments } from '@repo/database/schema'

export default defineEventHandler(async (event) => {
  const db = useDB(event)
  return db.select().from(comments)
})
```

In Workers:

```typescript
import { createDatabase, schema } from '@repo/database'

const db = createDatabase(env.DB)
const allComments = await db.select().from(schema.comments)
```

## UI Components

This template uses [PrimeVue](https://primevue.org/) v4 with the `Prime` prefix for all components:

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

Tailwind CSS v4 is integrated for utility styling. Use both together:

```vue
<PrimeButton label="Submit" class="w-full md:w-auto" />
```

The `tailwindcss-primeui` plugin adds PrimeVue-aware utilities like `text-primary`, `bg-surface-50`, `text-muted-color`.

## Worker-to-Worker RPC

Workers can call each other directly via service bindings (zero network overhead):

```typescript
// In api-worker, calling auth-worker
const result = await this.env.AUTH.verifyToken(token)
```

See `apps/api-worker/src/index.ts` and `apps/auth-worker/src/index.ts` for examples.

## Deployment

### Deploy All Apps

```bash
pnpm deploy
```

### Deploy Individual Apps

```bash
pnpm --filter @repo/web deploy
pnpm --filter @repo/api-worker deploy
pnpm --filter @repo/auth-worker deploy
```

**Note**: Deploy `auth-worker` before `api-worker` since it has a service binding dependency.

## VS Code Setup

Recommended extensions are configured in `.vscode/extensions.json`. Install them for:

- **Biome**: Formatting and linting on save
- **Vue Official**: Vue/Nuxt language support
- **Cloudflare Workers**: Bindings and D1 integration

## License

MIT
