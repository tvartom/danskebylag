# Roadmap: Danske Bylag Web Presentation

> Static website presenting *Danske Bylag* (Poul Meyer, 1949) with original Danish text, Swedish translation, and Swedish summary per chapter.

## Phase 1: PDF Extraction & Content Structure

### 1a. Download & Analyze

- [ ] Download PDF from KU source
- [ ] Install poppler-utils (pdftotext, pdftoppm, pdfinfo)
- [ ] Run pdfinfo to get page count
- [ ] Determine PDF page offset vs printed page numbers
- [ ] Extract table of contents (Indholdsfortegnelse)

### 1b. Extract Text

- [ ] Create content directory structure (`apps/web/content/chapters/`)
- [ ] Extract raw text chapter by chapter using `pdftotext`
- [ ] Create chapter registry (`chapters/index.ts`) with metadata

### 1c. OCR Quality Review

The PDF is a 1949 scan — OCR quality is unknown. Before investing in cleanup and translation, validate accuracy using Claude vision comparison.

- [ ] Select sample pages (5–10 spread across book, plus any fraktur/special formatting pages)
- [ ] Render sample pages as PNG at 300 DPI (`pdftoppm`)
- [ ] Compare each page image against extracted text using Claude vision
- [ ] Produce quality report: error rate, common error patterns, problematic pages
- [ ] **Decision gate:**
  - Acceptable quality → proceed to cleanup (1d)
  - Poor quality → re-extract affected pages via visual transcription

### 1d. Text Cleanup

- [ ] Remove page headers and footers
- [ ] Fix line-break hyphenation (re-join split words)
- [ ] Verify Danish special characters: æ, ø, å
- [ ] Fix OCR artifacts identified in quality report
- [ ] Handle fraktur citations
- [ ] Preserve paragraph structure, add markdown formatting
- [ ] Mark unreadable or uncertain passages (e.g. unclear numbers, garbled characters from bad scanning) with a `[källa osäker]` note — never guess
- [ ] Save cleaned text as `da.md` files

## Phase 2: Translation & Summary

Each chapter follows: translate → review → approve → next.

- [ ] Create initial glossary file (`apps/web/content/glossary.ts`)

### Output structure per chapter

Each chapter produces three files. The `summary.md` follows a strict template defined in `docs/content-pipeline.md`:

1. **`sv.md`** — Full Swedish translation
2. **`summary.md`** — Structured summary with these sections:
   - **Kort kärna** — 3–5 sentence chapter preview
   - **Historiskt sammanhang** — historical context
   - **Sammanfattning av texten** — section-by-section summary (structure codes `[X.I, X.II …]`, all source headings, no analysis)
   - **Nyckelbegrepp** — Danish term + Swedish explanation
   - **Geografiska namn** — all geographic names in original Danish, sorted by type
   - **Begreppslistan** — Danish–Swedish glossary with explanatory sentences
3. **Glossary entries** — added to `glossary.ts`

### Translation approach

Danish→Swedish translation that modernizes spelling and grammar while preserving all content, argumentation, and structure unchanged. Footnotes, Latin expressions, law names, and legal quotes are kept in original form. Full translation guidelines in `docs/content-pipeline.md` § Step 6.

### Chapters (update after TOC extraction)

<!-- Chapters will be listed here after Phase 1, step 6 -->

| # | Chapter | `da.md` | `sv.md` | `summary.md` | Reviewed | Approved |
|---|---------|---------|---------|---------------|----------|----------|
| — | *To be populated after TOC extraction* | | | | | |

## Phase 3: Web Application

- [ ] Install dependencies (`marked`, `@tailwindcss/typography`)
- [ ] Update `nuxt.config.ts` (pre-render, head, SEO)
- [ ] Update `main.css` with typography plugin
- [ ] Create `layouts/default.vue` (AppHeader + AppFooter)
- [ ] Update `app.vue` to use NuxtLayout
- [ ] Define TypeScript types (ChapterMeta, GlossaryEntry)
- [ ] Build composables: `useChapterContent`, `useMarkdown`
- [ ] Build `pages/index.vue` — book overview + table of contents
- [ ] Build `pages/kapitel/[slug].vue` — chapter reader with 3 tabs
- [ ] Build `pages/ordlista.vue` — searchable glossary
- [ ] Build `pages/om.vue` — about page
- [ ] Build components: ChapterTabs, ChapterContent, ChapterNav, GlossaryTable
- [ ] Typography polish, serif font, lang attributes
- [ ] SEO meta per page
- [ ] Test static generation (`pnpm generate`)
- [ ] Verify Cloudflare Pages deployment

## Status

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1 | Not started | |
| Phase 2 | Not started | Depends on Phase 1 |
| Phase 3 | Not started | Can start in parallel with Phase 2 once structure is known |
