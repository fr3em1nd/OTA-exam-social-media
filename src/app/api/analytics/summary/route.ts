import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Post } from '@/lib/database.types'

// Design Decision: Trend calculation uses last 7 days vs prior 7 days
// This provides a meaningful short-term comparison while having enough data points
// to show actual trends. 30 days would smooth out too much detail.
const TREND_PERIOD_DAYS = 7

interface AnalyticsSummaryResponse {
  totalEngagement: number
  averageEngagementRate: number
  topPerformingPost: Post | null
  trendPercentage: number
  trendDirection: 'up' | 'down' | 'neutral'
  totalPosts: number
  totalReach: number
  periodDays: number
}

export async function GET(): Promise<NextResponse<AnalyticsSummaryResponse | { error: string }>> {
  try {
    const supabase = await createClient()

    // Validate authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all posts for the user (RLS ensures only their data is returned)
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('posted_at', { ascending: false })

    if (postsError) {
      console.error('Error fetching posts:', postsError)
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }

    // Handle empty state - user has no posts
    if (!posts || posts.length === 0) {
      return NextResponse.json({
        totalEngagement: 0,
        averageEngagementRate: 0,
        topPerformingPost: null,
        trendPercentage: 0,
        trendDirection: 'neutral' as const,
        totalPosts: 0,
        totalReach: 0,
        periodDays: TREND_PERIOD_DAYS,
      })
    }

    // Calculate total engagement (likes + comments + shares)
    const totalEngagement = posts.reduce(
      (sum, post) => sum + (post.likes || 0) + (post.comments || 0) + (post.shares || 0),
      0
    )

    // Calculate average engagement rate
    // Handle case where some posts might have null engagement_rate
    const postsWithEngagementRate = posts.filter((post) => post.engagement_rate !== null)
    const averageEngagementRate =
      postsWithEngagementRate.length > 0
        ? postsWithEngagementRate.reduce((sum, post) => sum + (post.engagement_rate || 0), 0) /
          postsWithEngagementRate.length
        : 0

    // Find top performing post (by total engagement)
    const topPerformingPost = posts.reduce((top, post) => {
      const postEngagement = (post.likes || 0) + (post.comments || 0) + (post.shares || 0)
      const topEngagement = (top.likes || 0) + (top.comments || 0) + (top.shares || 0)
      return postEngagement > topEngagement ? post : top
    }, posts[0])

    // Calculate trend: compare last 7 days vs prior 7 days
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - TREND_PERIOD_DAYS * 24 * 60 * 60 * 1000)
    const fourteenDaysAgo = new Date(now.getTime() - TREND_PERIOD_DAYS * 2 * 24 * 60 * 60 * 1000)

    const recentPosts = posts.filter((post) => new Date(post.posted_at) >= sevenDaysAgo)
    const priorPosts = posts.filter(
      (post) => new Date(post.posted_at) >= fourteenDaysAgo && new Date(post.posted_at) < sevenDaysAgo
    )

    const recentEngagement = recentPosts.reduce(
      (sum, post) => sum + (post.likes || 0) + (post.comments || 0) + (post.shares || 0),
      0
    )
    const priorEngagement = priorPosts.reduce(
      (sum, post) => sum + (post.likes || 0) + (post.comments || 0) + (post.shares || 0),
      0
    )

    // Calculate trend percentage
    let trendPercentage = 0
    let trendDirection: 'up' | 'down' | 'neutral' = 'neutral'

    if (priorEngagement > 0) {
      trendPercentage = ((recentEngagement - priorEngagement) / priorEngagement) * 100
      trendDirection = trendPercentage > 0 ? 'up' : trendPercentage < 0 ? 'down' : 'neutral'
    } else if (recentEngagement > 0) {
      // If no prior engagement but have recent engagement, treat as 100% increase
      trendPercentage = 100
      trendDirection = 'up'
    }

    // Calculate total reach
    const totalReach = posts.reduce((sum, post) => sum + (post.reach || 0), 0)

    return NextResponse.json({
      totalEngagement,
      averageEngagementRate: Math.round(averageEngagementRate * 100) / 100,
      topPerformingPost,
      trendPercentage: Math.round(Math.abs(trendPercentage) * 100) / 100,
      trendDirection,
      totalPosts: posts.length,
      totalReach,
      periodDays: TREND_PERIOD_DAYS,
    })
  } catch (error) {
    console.error('Analytics summary error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
