export function getApiBase(): string {
  if (import.meta.server) {
    return process.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:3001'
  }
  try {
    return useRuntimeConfig().public.apiUrl || 'http://127.0.0.1:3001'
  } catch {
    return 'http://127.0.0.1:3001'
  }
}

export function imgUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('/')) return path
  return `${getApiBase()}/${path}`
}

export async function fetchSection(section: string) {
  const res = await fetch(`${getApiBase()}/section-images/section/${section}`)
  return res.json()
}
