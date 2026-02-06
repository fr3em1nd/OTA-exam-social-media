import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { DailyMetric } from '@/lib/database.types'

// Configure this route to run at the edge for low latency
export const runtime = 'edge'

// Validate and parse the days query parameter
function parseAndValidateDays(daysParam: string | null): number {
  if (!daysParam) {
    return 30 // Default to 30 days
  }

  const days = parseInt(daysParam, 10)

  // Validate: must be a positive integer, max 90 days
  if (isNaN(days) || days < 1) {
    return 30
  }

  return Math.min(days, 90) // Cap at 90 days to prevent abuse
}

export async function GET(request: Request): Promise<NextResponse<{ data: DailyMetric[] } | { error: string }>> {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const days = parseAndValidateDays(searchParams.get('days'))

    const supabase = await createClient()

    // Validate authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Calculate the date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateStr = startDate.toISOString().split('T')[0]

    // Fetch daily metrics within the date range
    // RLS ensures only the user's data is returned
    const { data: metrics, error: metricsError } = await supabase
      .from('daily_metrics')
      .select('*')
      .gte('date', startDateStr)
      .order('date', { ascending: true })

    if (metricsError) {
      console.error('Error fetching daily metrics:', metricsError)
      return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
    }

    // Return empty array if no data (handle empty state gracefully)
    return NextResponse.json({
      data: metrics || [],
    })
  } catch (error) {
    console.error('Daily metrics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
