# Content Pipeline: PDF Extraction, Translation & Review

## Source

- **Book:** *Danske Bylag* — Poul Meyer, 1949
- **PDF:** https://jura.ku.dk/jurabog/pdf/juridiske-monografier/Meyer_Dansk_bylag_1949.pdf
- **Format:** Scanned with OCR text embedded
- **Language:** 1940s Danish, some fraktur-style citations

---

## Step 1: PDF Download & Analysis

```bash
# Download
curl -o source.pdf "https://jura.ku.dk/jurabog/pdf/juridiske-monografier/Meyer_Dansk_bylag_1949.pdf"

# Page count
pdfinfo source.pdf

# Test OCR quality (first 3 pages)
pdftotext -f 1 -l 3 source.pdf - | head -40

# Determine page offset (find printed page numbers in extracted text)
pdftotext -f 10 -l 20 source.pdf -
```

### Page offset

The scanned PDF has front matter (cover, title page, blank pages) before the numbered text begins. Record the offset:

- **PDF page N** = **printed page 1**
- **Offset** = N - 1

> Fill in after extraction: Offset = ___

---

## Step 2: Table of Contents Extraction

Locate the *Indholdsfortegnelse* in the PDF. Extract it and map each chapter to:

- Chapter number
- Danish title
- PDF page range (using offset)
- Printed page range

This becomes the chapter registry at `apps/web/content/chapters/index.ts`.

---

## Step 3: Chapter-by-Chapter Text Extraction

```bash
# Extract a specific chapter (adjust page numbers using offset)
pdftotext -f <pdf_start> -l <pdf_end> -layout source.pdf text/kapitel-NN.txt
```

---

## Step 4: OCR Quality Review

Before investing in cleanup and translation, validate OCR accuracy by comparing extracted text against the original page images using Claude's vision capability.

### Select sample pages

Pick 5–10 pages spread across the book. Prioritize:
- Pages with Danish special characters (æ, ø, å)
- Pages with fraktur-style citations
- Pages with footnotes, tables, or unusual formatting
- A few "plain text" pages as a baseline

### Render sample pages as images

```bash
# Render specific pages at 300 DPI
pdftoppm -f <page> -l <page> -png -r 300 source.pdf samples/page

# Example: render pages 15, 50, 100, 150, 200
for p in 15 50 100 150 200; do
  pdftoppm -f $p -l $p -png -r 300 source.pdf samples/page-$p
done
```

### Compare with Claude vision

For each sample page, provide Claude with:
1. The rendered page image (PNG)
2. The corresponding extracted text from `pdftotext`

Claude compares them and flags:
- Missing or garbled words
- Wrong characters (especially æ/ø/å, l↔1, O↔0, rn→m)
- Lost paragraph breaks or merged lines
- Fraktur text that was not recognized

### Quality report

Document findings per page:

| Page | Error count | Error types | Severity |
|------|-------------|-------------|----------|
| 15   | 2           | æ→ae        | Low      |
| 50   | 0           | —           | —        |
| 100  | 8           | fraktur garbled | High |

### Decision gate

- **Low error rate** (< 5 errors/page on most pages) → proceed to cleanup (Step 5)
- **High error rate** or **systematic failures** → fall back to visual re-transcription for affected chapters:

```bash
# Rasterize all pages of a problematic chapter at 300 DPI
pdftoppm -f <start> -l <end> -png -r 300 source.pdf text/chapter-images/page

# Then use Claude vision to transcribe directly from images
```

---

## Step 5: Text Cleanup

Apply after OCR quality review passes. Per chapter:

- [ ] Remove page headers and footers
- [ ] Fix line-break hyphenation (re-join split words)
- [ ] Verify Danish special characters: æ, ø, å, Æ, Ø, Å
- [ ] Fix OCR artifacts (common: l→1, O→0, rn→m — guided by quality report)
- [ ] Handle fraktur citations (use visual comparison where flagged)
- [ ] Preserve paragraph structure
- [ ] Add markdown formatting (headings, emphasis where appropriate)
- [ ] Reproduce tables as markdown tables; if a figure or diagram appears, describe its content in a `[Figur: description]` block
- [ ] Mark unreadable or uncertain passages (e.g. unclear numbers, garbled text) with a `[källa osäker]` note — never guess at what the source says
- [ ] Save as `da.md` in the chapter directory

---

## Step 6: Translation Workflow

### Context management (divide and conquer)

Each chapter is translated by a dedicated agent that receives ONLY:

1. The current chapter's `da.md` (~10-30 pages of text)
2. The accumulated glossary (`glossary.ts`) for term consistency
3. Translation guidelines (this section)

This keeps each agent's context lean (~20-40K tokens) instead of loading the entire book.

### Translation guidelines

The translation converts 1940s Danish (`da.md`) into modern Swedish (`sv.md`). Modernization principles ensure faithfulness — no content is added, removed, or simplified. The result must be a complete, faithful translation, not a summary.

#### Scope of modernization

**Allowed changes:**
- Modernize spelling and grammar to modern Swedish
- Replace archaic formulations with modern equivalents
- Correct obvious OCR errors during translation

**Forbidden:**
- Removing any information
- Adding new information
- Simplifying or abbreviating content
- Interpreting or reformulating so that meaning changes

All reasoning, examples, and details must be preserved. Text structure must follow the original as closely as possible.

> **Scope note:** These rules apply to `sv.md` (the full translation). The `summary.md` follows its own template and is intentionally a condensed pedagogical overview — see template below.

#### Language & style
- Write in **modern Swedish**
- **Never translate** person or place names
- Keep Danish terms in *italics* at first occurrence, with Swedish explanation. After first explanation, use the term without italics or re-explanation, unless a reminder aids readability in a new context
- **Legal terms** → translate as close to the original's legal meaning as possible
- **Law names** → reproduce exactly as in original
- Note ambiguous terms where Meyer uses a word in a specific legal sense
- Be aware: 1940s Danish — some words/constructions may have changed meaning
- If the Danish source text contains an uncertain or unreadable passage (marked `[källa osäker]`), preserve the marker in the translation — do not attempt to reconstruct the original
- Page references always use **printed page numbers**, not PDF page numbers
- Preserve Meyer's argumentation structure
- Cross-references to other chapters should note the chapter number clearly (e.g., "se kapitel III"). These will be converted to internal links in Phase 3

#### Special rules

- **Legal text quotes:** Reproduce in original language, followed by Swedish translation
- **Latin expressions:** Keep in original and translate in parentheses
- **Footnotes:**
  - Reproduce exactly as in the original text
  - Footnote content is copied from the original — **not translated**
  - Footnote number and text must be kept unchanged
  - Format using markdown footnote syntax: `[^N]` in text, `[^N]: original Danish text` at end of chapter

#### Formatting for readability
- **Use bullet lists** when the source text enumerates items — lists are much easier to read than inline enumerations
- **Bold key concepts** at first occurrence, e.g. "Det viktigaste beslutande organet i byn var **bystævnet (bystämman)**."
- **Never mix analysis with summary** — if a section contains analysis (beyond what the source text says), label it clearly as such

#### Geographic names
For every chapter, extract **all** geographic names (including härader, socknar, län, öar, byar, städer) from the `da.md` source text. Keep original Danish spelling. Sort by: länder / regioner / härader / socknar / orter, byar och städer / övrigt.

### Per-chapter output

Each translation agent produces:

1. **`sv.md`** — Full Swedish translation
   - Preserve all sections and paragraphs
   - Tone follows Meyer's original — do not add pedagogical framing
   - Reference specific pages: (s. XX) or (s. XX–YY)

2. **`summary.md`** — Structured Swedish summary (see template below)

3. **New glossary entries** — added to `glossary.ts`

### `summary.md` template

Every chapter's `summary.md` must follow this exact structure:

```markdown
## Kapitel X – [Swedish chapter title]

## Kort kärna

3–5 sentences giving the reader a quick overview of what the chapter covers
before they read the longer text.

## Historiskt sammanhang

Brief section placing the chapter in its historical context —
time period, societal structures, legal framework.

## Sammanfattning av texten

### X.I [Full section title]

Pedagogical Swedish summary text. Length follows the priority rule
(important sections get more space). All headings from the source
must appear here.

No original analysis in this section — everything must come from
the source text.

### X.II [Full section title]

...

## Nyckelbegrepp

**Danskt begrepp** – svensk förklaring.
En förklarande mening av begreppet på svenska.

## Geografiska namn

All geographic names mentioned in the chapter, in original language.
Sorted by: länder / regioner / härader / socknar / orter, byar och
städer / övrigt.

## Begreppslistan

**Oldermand – ålderman.**
Bylagets valda ledare som ansvarade för att byns regler följdes.

**Bystævne – bystämma.**
Möte där alla bymän fattade gemensamma beslut.
```

#### Section notes

| Section | Purpose |
|---------|---------|
| Kort kärna | 3–5 sentences — quick chapter preview |
| Historiskt sammanhang | Historical context for the chapter's subject |
| Sammanfattning av texten | Section-by-section summary using structure codes `[X.I, X.II …]` with full titles. No analysis, only source content. All source headings must appear. |
| Nyckelbegrepp | 5–10 most important concepts for understanding the chapter. Danish term + Swedish explanation + deeper explanatory text. |
| Geografiska namn | All places, regions, parishes, hundreds, islands etc. Original Danish spelling. |
| Begreppslistan | Complete alphabetical list of all Danish terms used in the chapter. Danish word – Swedish word + brief one-line definition (lookup reference). |

---

## Step 7: Review Workflow

After each chapter is translated, a **review agent** checks quality:

### Review agent input
- `da.md` (Danish original)
- `sv.md` (Swedish translation)
- `summary.md` (Swedish summary)
- `glossary.ts` (current glossary)

### Review checklist

| Check | Description |
|-------|-------------|
| Completeness | All sections of the Danish original represented in translation — no information removed, abbreviated, or simplified |
| Accuracy | Key legal terms match glossary; spot-check important passages |
| Faithfulness | Translation preserves all reasoning, examples, and details from original |
| Page references | Correct printed page numbers (not PDF pages) |
| Swedish quality | Natural, modern prose; no calque constructions |
| Footnotes | Kept in original Danish, not translated; numbers unchanged |
| Latin expressions | Kept in original with Swedish translation in parentheses |
| Legal text quotes | Reproduced in original language, followed by Swedish translation |
| Law names | Reproduced exactly as in original |
| Geographic names | Kept in original Danish form |
| Summary quality | Captures main arguments and conclusions |
| Glossary consistency | New terms match previously established translations |
| Fraktur handling | Citations from older sources correctly transcribed |
| No untranslated text | No Danish left unmarked in the Swedish output (except footnotes, legal quotes, Latin, and law names as specified) |

### Review output

The review agent produces a report:
- **PASS** — chapter is ready for user approval
- **FAIL** — list of specific issues to fix, with locations

If FAIL: fix issues → re-run review → repeat until PASS.

---

## Step 8: User Approval

After review passes, present to user:
- Chapter number and title
- Summary of the translation
- Any flagged items from review
- Link to the files

User approves → proceed to next chapter.

---

## Files NOT committed to git

Add to `.gitignore`:
```
source.pdf
full-text.txt
text/           # Raw extraction intermediates
*.png           # Rasterized page images
```

Only the cleaned, structured content in `apps/web/content/` is committed.
