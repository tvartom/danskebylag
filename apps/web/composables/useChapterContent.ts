const danishFiles = import.meta.glob<string>('~/content/chapters/*/da.md', { query: '?raw', import: 'default' })
const swedishFiles = import.meta.glob<string>('~/content/chapters/*/sv.md', { query: '?raw', import: 'default' })
const summaryFiles = import.meta.glob<string>('~/content/chapters/*/summary.md', { query: '?raw', import: 'default' })

function findFile(files: Record<string, () => Promise<string>>, slug: string) {
  const key = Object.keys(files).find(k => k.includes(`/${slug}/`))
  return key ? files[key] : undefined
}

export async function useChapterContent(slug: string) {
  const [da, sv, summary] = await Promise.all([
    findFile(danishFiles, slug)?.() ?? '',
    findFile(swedishFiles, slug)?.() ?? '',
    findFile(summaryFiles, slug)?.() ?? '',
  ])
  return { da, sv, summary }
}
