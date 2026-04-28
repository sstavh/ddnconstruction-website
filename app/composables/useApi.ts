export const API_BASE = 'http://localhost:3001'

export function imgUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('/')) return path
  return `${API_BASE}/${path}`
}

export async function fetchSection(section: string) {
  const res = await fetch(`${API_BASE}/section-images/section/${section}`)
  return res.json()
}
