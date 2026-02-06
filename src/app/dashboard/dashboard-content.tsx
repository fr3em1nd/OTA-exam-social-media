'use client'

import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PostsTable } from '@/components/posts/posts-table'
import { SummaryCards } from '@/components/posts/summary-cards'
import { EngagementChart } from '@/components/charts/engagement-chart'
import { PostDetailModal } from '@/components/posts/post-detail-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BarChart3, LogOut, User as UserIcon } from 'lucide-react'

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch with Radix DropdownMenu
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  // Get user initials for avatar
  const getInitials = () => {
    const email = user.email || ''
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
          </div>

          {isMounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* Summary Cards */}
        <section>
          <SummaryCards />
        </section>

        {/* Engagement Chart */}
        <section>
          <EngagementChart />
        </section>

        {/* Posts Table */}
        <section>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Recent Posts</h2>
              <p className="text-muted-foreground">
                View and analyze your social media posts
              </p>
            </div>
            <PostsTable />
          </div>
        </section>
      </main>

      {/* Post Detail Modal */}
      <PostDetailModal />
    </div>
  )
}
