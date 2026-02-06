import { create } from 'zustand'
import type { Post } from '@/lib/database.types'

export type Platform = 'all' | 'instagram' | 'tiktok'
export type ChartViewType = 'line' | 'area'
export type SortDirection = 'asc' | 'desc'
export type SortColumn = 'posted_at' | 'likes' | 'comments' | 'shares' | 'engagement_rate'

interface DashboardState {
  // Filter state
  platformFilter: Platform

  // Chart state
  chartViewType: ChartViewType

  // Modal state
  selectedPost: Post | null
  isModalOpen: boolean

  // Sorting state (could also be URL state, but keeping in Zustand for simplicity)
  sortColumn: SortColumn
  sortDirection: SortDirection

  // Actions
  setPlatformFilter: (platform: Platform) => void
  setChartViewType: (viewType: ChartViewType) => void
  setSelectedPost: (post: Post | null) => void
  openModal: (post: Post) => void
  closeModal: () => void
  setSorting: (column: SortColumn, direction: SortDirection) => void
  toggleSortDirection: () => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  platformFilter: 'all',
  chartViewType: 'area',
  selectedPost: null,
  isModalOpen: false,
  sortColumn: 'posted_at',
  sortDirection: 'desc',

  // Actions
  setPlatformFilter: (platform) => set({ platformFilter: platform }),

  setChartViewType: (viewType) => set({ chartViewType: viewType }),

  setSelectedPost: (post) => set({ selectedPost: post }),

  openModal: (post) => set({ selectedPost: post, isModalOpen: true }),

  closeModal: () => set({ isModalOpen: false, selectedPost: null }),

  setSorting: (column, direction) => set({ sortColumn: column, sortDirection: direction }),

  toggleSortDirection: () =>
    set((state) => ({
      sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
    })),
}))
