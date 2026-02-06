import type { Platform, SortColumn, SortDirection } from '@/lib/stores/dashboard-store'

// Query key factory pattern for consistent cache management
export const queryKeys = {
  // Posts
  posts: {
    all: ['posts'] as const,
    list: (filters: {
      platform?: Platform
      sortColumn?: SortColumn
      sortDirection?: SortDirection
    }) => [...queryKeys.posts.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.posts.all, 'detail', id] as const,
  },

  // Daily Metrics
  dailyMetrics: {
    all: ['daily-metrics'] as const,
    list: (days?: number) => [...queryKeys.dailyMetrics.all, 'list', { days }] as const,
  },

  // Analytics Summary (from API route)
  analytics: {
    all: ['analytics'] as const,
    summary: () => [...queryKeys.analytics.all, 'summary'] as const,
  },
} as const
