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

export function thumbUrl(imageUrl: string, width: number): string {
  if (!imageUrl) return ''
  // Cloudinary URL — використовуємо трансформації Cloudinary
  if (imageUrl.includes('res.cloudinary.com')) {
    return imageUrl.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/`)
  }
  // Старі локальні URL (зворотна сумісність)
  const base = getApiBase()
  const prefix = `${base}/uploads/`
  if (imageUrl.startsWith(prefix)) {
    return `${base}/img/${imageUrl.slice(prefix.length)}?w=${width}`
  }
  return imageUrl
}

export async function fetchSection(section: string) {
  const res = await fetch(`${getApiBase()}/section-images/section/${section}`)
  return res.json()
}
