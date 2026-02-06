'use client'

import { useMemo } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useDailyMetrics } from '@/lib/hooks'
import { useDashboardStore } from '@/lib/stores/dashboard-store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, BarChart3 } from 'lucide-react'

interface ChartDataPoint {
  date: string
  displayDate: string
  engagement: number
  reach: number
}

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Format numbers with K/M suffixes
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Custom tooltip component
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="bg-background border rounded-lg shadow-lg p-3">
      <p className="text-sm font-medium mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-medium">{formatNumber(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

// Loading skeleton
function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}

// Empty state
function EmptyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Engagement Trends
        </CardTitle>
        <CardDescription>Track your engagement over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex flex-col items-center justify-center text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No data yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Your engagement metrics will appear here once you start tracking your social media activity.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export function EngagementChart() {
  const { chartViewType, setChartViewType } = useDashboardStore()
  const { data: metrics, isLoading, error } = useDailyMetrics(30)

  // Transform data for the chart
  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!metrics || metrics.length === 0) {
      return []
    }

    return metrics.map((metric) => ({
      date: metric.date,
      displayDate: formatDate(metric.date),
      engagement: metric.engagement,
      reach: metric.reach,
    }))
  }, [metrics])

  if (isLoading) {
    return <ChartSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Engagement Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-red-600">Error loading chart data: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!chartData || chartData.length === 0) {
    return <EmptyChart />
  }

  const ChartComponent = chartViewType === 'line' ? LineChart : AreaChart

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Engagement Trends
            </CardTitle>
            <CardDescription>Daily engagement and reach over the last 30 days</CardDescription>
          </div>
          <Tabs
            value={chartViewType}
            onValueChange={(value) => setChartViewType(value as typeof chartViewType)}
          >
            <TabsList>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ChartComponent
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatNumber}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {chartViewType === 'area' ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="reach"
                    name="Reach"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </>
              ) : (
                <>
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    name="Engagement"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reach"
                    name="Reach"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </>
              )}
            </ChartComponent>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
