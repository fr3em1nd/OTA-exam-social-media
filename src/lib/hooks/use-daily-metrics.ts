import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './query-keys'
import type { DailyMetric } from '@/lib/database.types'

interface DailyMetricsResponse {
  data: DailyMetric[]
  error?: string
}

async function fetchDailyMetrics(days: number = 30): Promise<DailyMetric[]> {
  // Fetch from the Edge Function API route
  const response = await fetch(`/api/metrics/daily?days=${days}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to fetch daily metrics')
  }

  const result: DailyMetricsResponse = await response.json()

  if (result.error) {
    throw new Error(result.error)
  }

  return result.data || []
}

export function useDailyMetrics(days: number = 30) {
  return useQuery({
    queryKey: queryKeys.dailyMetrics.list(days),
    queryFn: () => fetchDailyMetrics(days),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
