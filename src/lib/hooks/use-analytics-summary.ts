import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './query-keys'
import type { Post } from '@/lib/database.types'

export interface AnalyticsSummary {
  totalEngagement: number
  averageEngagementRate: number
  topPerformingPost: Post | null
  trendPercentage: number
  trendDirection: 'up' | 'down' | 'neutral'
  totalPosts: number
  totalReach: number
  periodDays: number
}

async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await fetch('/api/analytics/summary')

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to fetch analytics summary')
  }

  return response.json()
}

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: queryKeys.analytics.summary(),
    queryFn: fetchAnalyticsSummary,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
