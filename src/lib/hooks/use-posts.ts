import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { queryKeys } from './query-keys'
import type { Post } from '@/lib/database.types'
import type { Platform, SortColumn, SortDirection } from '@/lib/stores/dashboard-store'

interface UsePostsOptions {
  platform?: Platform
  sortColumn?: SortColumn
  sortDirection?: SortDirection
}

async function fetchPosts(options: UsePostsOptions): Promise<Post[]> {
  const supabase = createClient()

  let query = supabase.from('posts').select('*')

  // Apply platform filter
  if (options.platform && options.platform !== 'all') {
    query = query.eq('platform', options.platform)
  }

  // Apply sorting
  const sortColumn = options.sortColumn || 'posted_at'
  const sortDirection = options.sortDirection || 'desc'
  query = query.order(sortColumn, { ascending: sortDirection === 'asc' })

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export function usePosts(options: UsePostsOptions = {}) {
  return useQuery({
    queryKey: queryKeys.posts.list(options),
    queryFn: () => fetchPosts(options),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook for fetching a single post by ID
export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
    enabled: !!id,
  })
}
