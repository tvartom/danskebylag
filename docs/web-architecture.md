# Web Architecture: Danske Bylag

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 4 (Vue 3) |
| UI components | PrimeVue v4 (Aura theme, `Prime` prefix) |
| Styling | Tailwind CSS v4 + `tailwindcss-primeui` |
| Typography | `@tailwindcss/typography` (prose class) |
| Markdown | `marked` (build-time rendering) |
| Hosting | Cloudflare Pages (fully static, `nuxt generate`) |
| Build | pnpm + Turborepo |
| Linting | Biome |

---

## Decision: No @nuxt/content

`@nuxt/content` v3 requires SQLite WASM — architecturally heavy for ~15 chapters of pre-authored static content. Instead:

- **Content as plain files:** `.md` for text, `.ts` for metadata
- **Loaded via Vite:** `import.meta.glob` with `?raw` for markdown, direct imports for TS
- **Rendered with `marked`:** lightweight, zero-dep markdown→HTML at pre-render time
- **Code-split per chapter:** each chapter's content is a lazy chunk

---

## Content Structure

```
apps/web/content/
  meta.ts                         # { title, author, year, description }
  glossary.ts                     # GlossaryEntry[]
  chapters/
    index.ts                      # ChapterMeta[] — ordered registry
    01-indledning/
      meta.ts                     # { slug, number, titleDa, titleSv, pageRange }
      da.md                       # Original Danish
      sv.md                       # Swedish translation
      summary.md                  # Swedish summary
    02-bylagets-oprindelse/
      meta.ts
      da.md
      sv.md
      summary.md
    ...
```

### Types

```typescript
interface ChapterMeta {
  slug: string                    // "01-indledning"
  number: number                  // 1
  titleDa: string                 // Danish chapter title
  titleSv: string                 // Swedish chapter title
  pageRange: [number, number]     // Printed page range [start, end]
}

interface GlossaryEntry {
  termDa: string                  // Danish term
  termSv: string                  // Swedish translation
  definition?: string             // Optional explanation
  category?: string               // "juridisk", "förvaltning", etc.
  pages?: number[]                // Where the term appears
}
```

---

## Routes

| URL | File | Description |
|-----|------|-------------|
| `/` | `pages/index.vue` | Book overview + table of contents |
| `/kapitel/[slug]` | `pages/kapitel/[slug].vue` | Chapter: 3-tab reader |
| `/ordlista` | `pages/ordlista.vue` | Searchable glossary |
| `/om` | `pages/om.vue` | About the book & project |

All routes pre-rendered at build time via Nuxt's built-in crawler (follows NuxtLinks from `/`).

---

## Layout

```
layouts/default.vue
├── AppHeader (sticky nav: Hem | Ordlista | Om)
├── <slot /> (page content)
└── AppFooter (attribution, source link)
```

---

## Components

### Navigation
- **`AppHeader.vue`** — Sticky top nav with NuxtLinks
- **`AppFooter.vue`** — Attribution and source link

### Home page
- **`BookHero.vue`** — Title, author, year, short description
- **`TableOfContents.vue`** — Ordered chapter list with NuxtLinks

### Chapter page
- **`ChapterTabs.vue`** — PrimeVue `Tabs` component:
  - Tab 1: "Sammanfattning" → `<ChapterContent :html="summaryHtml" lang="sv" />`
  - Tab 2: "Svensk översättning" → `<ChapterContent :html="svHtml" lang="sv" />`
  - Tab 3: "Dansk original" → `<ChapterContent :html="daHtml" lang="da" />`
  - Tab 4: "Original PDF" → `<ChapterPdf :pdfPages />` (lazy-loaded iframe of `public/source.pdf` at the chapter's starting page)
- **`ChapterContent.vue`** — Renders markdown to HTML, applies `prose` typography, sets `lang` attribute
- **`ChapterPdf.vue`** — Embeds the source PDF in an `<iframe>` with `#page=N` fragment, sized to `80vh`. Parses `pdfPages` string to extract the starting page. Includes a download link.
- **`ChapterNav.vue`** — Previous/Next chapter links

### Glossary page
- **`GlossaryTable.vue`** — PrimeVue `DataTable` with global filter, columns: term, translation, category

---

## Composables

### `useChapterContent(slug: string)`

Uses `import.meta.glob` for code-split loading:

```typescript
const danishFiles = import.meta.glob<string>('~/content/chapters/*/da.md', { query: '?raw', import: 'default' })
const swedishFiles = import.meta.glob<string>('~/content/chapters/*/sv.md', { query: '?raw', import: 'default' })
const summaryFiles = import.meta.glob<string>('~/content/chapters/*/summary.md', { query: '?raw', import: 'default' })

export async function useChapterContent(slug: string) {
  const base = `/content/chapters/${slug}`
  const [da, sv, summary] = await Promise.all([
    danishFiles[`${base}/da.md`](),
    swedishFiles[`${base}/sv.md`](),
    summaryFiles[`${base}/summary.md`](),
  ])
  return { da, sv, summary }
}
```

### `useMarkdown(source: string): string`

```typescript
import { marked } from 'marked'

export function useMarkdown(source: string): string {
  return marked.parse(source, { async: false }) as string
}
```

---

## Configuration Changes

### `nuxt.config.ts` additions

```typescript
nitro: {
  preset: 'cloudflare_pages',
  prerender: {
    crawlLinks: true,
    routes: ['/'],
  },
},
app: {
  head: {
    htmlAttrs: { lang: 'sv' },
  },
},
```

### `package.json` new deps

```
marked
@tailwindcss/typography
```

### `main.css` addition

```css
@plugin "@tailwindcss/typography";
```

---

## Static Generation

Build command: `nuxt generate` (already in `package.json` as the `generate` script).

The Nuxt crawler starts at `/` and follows all `NuxtLink` elements to discover chapter pages, glossary, and about page. All routes become static HTML in `.output/public/`.

Cloudflare Pages serves from `pages_build_output_dir: ".output/public"` (configured in `wrangler.jsonc`).
