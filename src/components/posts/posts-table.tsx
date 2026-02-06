'use client'

import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { usePosts } from '@/lib/hooks'
import { useDashboardStore } from '@/lib/stores/dashboard-store'
import type { Post } from '@/lib/database.types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUpDown, ArrowUp, ArrowDown, ImageIcon, Video, Images, Instagram } from 'lucide-react'
import Image from 'next/image'

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

// Format date to readable string
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Truncate caption to specified length
function truncateCaption(caption: string | null, maxLength: number = 50): string {
  if (!caption) return 'No caption'
  if (caption.length <= maxLength) return caption
  return caption.substring(0, maxLength) + '...'
}

// Media type icon component
function MediaTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4" />
    case 'carousel':
      return <Images className="h-4 w-4" />
    default:
      return <ImageIcon className="h-4 w-4" />
  }
}

// Platform badge component
function PlatformBadge({ platform }: { platform: string }) {
  if (platform === 'instagram') {
    return (
      <Badge variant="secondary" className="gap-1">
        <Instagram className="h-3 w-3" />
        Instagram
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="gap-1">
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
      TikTok
    </Badge>
  )
}

// Sortable column header - uses Zustand store for server-side sorting
function SortableHeader({
  columnId,
  children,
}: {
  columnId: string
  children: React.ReactNode
}) {
  const { sortColumn, sortDirection, setSorting } = useDashboardStore()
  const isActive = sortColumn === columnId
  const currentDirection = isActive ? sortDirection : null

  const handleClick = () => {
    if (!isActive) {
      // First click on a new column: sort descending
      setSorting(columnId as typeof sortColumn, 'desc')
    } else if (currentDirection === 'desc') {
      // Second click: sort ascending
      setSorting(columnId as typeof sortColumn, 'asc')
    } else {
      // Third click: sort descending again
      setSorting(columnId as typeof sortColumn, 'desc')
    }
  }

  return (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={handleClick}
    >
      {children}
      {currentDirection === 'asc' ? (
        <ArrowUp className="h-4 w-4" />
      ) : currentDirection === 'desc' ? (
        <ArrowDown className="h-4 w-4" />
      ) : (
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      )}
    </button>
  )
}

// Loading skeleton for the table
function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Thumbnail</TableHead>
            <TableHead className="min-w-[200px]">Caption</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Eng. Rate</TableHead>
            <TableHead>Posted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-12 w-12 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[180px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Empty state component
function EmptyState() {
  return (
    <div className="rounded-md border">
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground max-w-sm">
          When you connect your social media accounts and import posts, they will appear here.
        </p>
      </div>
    </div>
  )
}

export function PostsTable() {
  const {
    platformFilter,
    setPlatformFilter,
    sortColumn,
    sortDirection,
    openModal,
  } = useDashboardStore()

  const { data: posts, isLoading, error } = usePosts({
    platform: platformFilter,
    sortColumn,
    sortDirection,
  })

  // Define columns using TanStack Table
  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: 'thumbnail_url',
        header: 'Thumbnail',
        cell: ({ row }) => {
          const thumbnailUrl = row.getValue('thumbnail_url') as string | null
          const mediaType = row.original.media_type

          return (
            <div className="relative h-12 w-12 rounded overflow-hidden bg-muted flex items-center justify-center">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt="Post thumbnail"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <MediaTypeIcon type={mediaType} />
              )}
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'caption',
        header: 'Caption',
        cell: ({ row }) => (
          <span className="text-sm" title={row.getValue('caption') || undefined}>
            {truncateCaption(row.getValue('caption'))}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'platform',
        header: 'Platform',
        cell: ({ row }) => <PlatformBadge platform={row.getValue('platform')} />,
        enableSorting: false,
      },
      {
        accessorKey: 'likes',
        header: () => <SortableHeader columnId="likes">Likes</SortableHeader>,
        cell: ({ row }) => formatNumber(row.getValue('likes')),
      },
      {
        accessorKey: 'comments',
        header: () => <SortableHeader columnId="comments">Comments</SortableHeader>,
        cell: ({ row }) => formatNumber(row.getValue('comments')),
      },
      {
        accessorKey: 'shares',
        header: () => <SortableHeader columnId="shares">Shares</SortableHeader>,
        cell: ({ row }) => formatNumber(row.getValue('shares')),
      },
      {
        accessorKey: 'engagement_rate',
        header: () => <SortableHeader columnId="engagement_rate">Eng. Rate</SortableHeader>,
        cell: ({ row }) => {
          const rate = row.getValue('engagement_rate') as number | null
          return rate !== null ? `${rate.toFixed(1)}%` : 'N/A'
        },
      },
      {
        accessorKey: 'posted_at',
        header: () => <SortableHeader columnId="posted_at">Posted</SortableHeader>,
        cell: ({ row }) => formatDate(row.getValue('posted_at')),
      },
    ],
    []
  )

  const table = useReactTable({
    data: posts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Note: Sorting is handled server-side via Supabase query
    // We don't need client-side sorting here
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <TableSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4">
        <p className="text-red-600">Error loading posts: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select
          value={platformFilter}
          onValueChange={(value) => setPlatformFilter(value as typeof platformFilter)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!posts || posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => openModal(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
