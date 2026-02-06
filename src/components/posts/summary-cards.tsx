'use client'

import { useAnalyticsSummary } from '@/lib/hooks'
import { useDashboardStore } from '@/lib/stores/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Percent,
  Trophy,
  Eye,
} from 'lucide-react'

// Format numbers with K/M suffixes
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

// Truncate text
function truncateText(text: string | null, maxLength: number = 40): string {
  if (!text) return 'No caption'
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Trend indicator component
function TrendIndicator({
  percentage,
  direction,
  periodDays,
}: {
  percentage: number
  direction: 'up' | 'down' | 'neutral'
  periodDays: number
}) {
  const Icon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus
  const colorClass =
    direction === 'up'
      ? 'text-green-600'
      : direction === 'down'
        ? 'text-red-600'
        : 'text-muted-foreground'

  return (
    <div className={`flex items-center gap-1 text-sm ${colorClass}`}>
      <Icon className="h-4 w-4" />
      <span>{percentage}%</span>
      <span className="text-muted-foreground">vs last {periodDays} days</span>
    </div>
  )
}

// Loading skeleton for cards
function CardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Empty state for cards
function EmptyCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">No engagement data yet</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">N/A</div>
          <p className="text-xs text-muted-foreground">Post data needed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performing Post</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground">No posts yet</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">No reach data yet</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function SummaryCards() {
  const { openModal } = useDashboardStore()
  const { data: summary, isLoading, error } = useAnalyticsSummary()

  if (isLoading) {
    return <CardsSkeleton />
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-red-600">Error loading summary: {error.message}</p>
      </div>
    )
  }

  if (!summary || summary.totalPosts === 0) {
    return <EmptyCards />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(summary.totalEngagement)}</div>
          <TrendIndicator
            percentage={summary.trendPercentage}
            direction={summary.trendDirection}
            periodDays={summary.periodDays}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.averageEngagementRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Across {summary.totalPosts} posts
          </p>
        </CardContent>
      </Card>

      <Card
        className={summary.topPerformingPost ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}
        onClick={() => {
          if (summary.topPerformingPost) {
            openModal(summary.topPerformingPost)
          }
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performing Post</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summary.topPerformingPost
              ? formatNumber(
                  (summary.topPerformingPost.likes || 0) +
                    (summary.topPerformingPost.comments || 0) +
                    (summary.topPerformingPost.shares || 0)
                )
              : '--'}
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.topPerformingPost
              ? truncateText(summary.topPerformingPost.caption)
              : 'No posts yet'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(summary.totalReach)}</div>
          <p className="text-xs text-muted-foreground">
            Unique accounts reached
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
