import { useQuery } from '@tanstack/react-query'
import { fetchHomePage, fetchPageBySlug, fetchPages } from './api'

export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: fetchPages,
  })
}

export function useHomePage() {
  return useQuery({
    queryKey: ['homePage'],
    queryFn: fetchHomePage,
  })
}

export function usePageBySlug(slug: string) {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: () => fetchPageBySlug(slug),
    enabled: !!slug,
  })
}
