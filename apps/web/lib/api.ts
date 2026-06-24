const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export async function fetchPages() {
  const response = await fetch(`${API_BASE_URL}/pages?limit=100`)
  if (!response.ok) {
    throw new Error('Failed to fetch pages')
  }
  return response.json()
}

export async function fetchHomePage() {
  const response = await fetch(`${API_BASE_URL}/pages?where[slug][equals]=home`)
  if (!response.ok) {
    throw new Error('Failed to fetch home page')
  }
  const result = await response.json()
  return result.docs?.[0] || null
}

export async function fetchPageBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/pages?where[slug][equals]=${slug}`)
  if (!response.ok) {
    throw new Error('Failed to fetch page')
  }
  const result = await response.json()
  return result.docs?.[0] || null
}
