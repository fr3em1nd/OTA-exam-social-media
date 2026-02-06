'use client'

import { useDashboardStore } from '@/lib/stores/dashboard-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  BarChart3,
  ExternalLink,
  Calendar,
  ImageIcon,
  Video,
  Images,
  Instagram,
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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

// Format date to readable string
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
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

// Metric display component
function MetricItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
    >
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{typeof value === 'number' ? formatNumber(value) : value}</p>
      </div>
    </motion.div>
  )
}

export function PostDetailModal() {
  const { selectedPost, isModalOpen, closeModal } = useDashboardStore()

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <PlatformBadge platform={selectedPost.platform} />
                  <Badge variant="outline" className="gap-1">
                    <MediaTypeIcon type={selectedPost.media_type} />
                    {selectedPost.media_type}
                  </Badge>
                </div>
                <DialogTitle>Post Details</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedPost.posted_at)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Thumbnail/Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative aspect-square max-h-[300px] w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center"
                >
                  {selectedPost.thumbnail_url ? (
                    <Image
                      src={selectedPost.thumbnail_url}
                      alt="Post image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <MediaTypeIcon type={selectedPost.media_type} />
                      <span>No preview available</span>
                    </div>
                  )}
                </motion.div>

                {/* Caption */}
                {selectedPost.caption && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Caption</h4>
                    <p className="text-sm whitespace-pre-wrap">{selectedPost.caption}</p>
                  </motion.div>
                )}

                <Separator />

                {/* Engagement Metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Engagement Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <MetricItem icon={Heart} label="Likes" value={selectedPost.likes} />
                    <MetricItem icon={MessageCircle} label="Comments" value={selectedPost.comments} />
                    <MetricItem icon={Share2} label="Shares" value={selectedPost.shares} />
                    <MetricItem icon={Bookmark} label="Saves" value={selectedPost.saves} />
                  </div>
                </motion.div>

                <Separator />

                {/* Performance Metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                >
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <MetricItem icon={Eye} label="Reach" value={selectedPost.reach} />
                    <MetricItem
                      icon={BarChart3}
                      label="Impressions"
                      value={selectedPost.impressions}
                    />
                    <MetricItem
                      icon={BarChart3}
                      label="Engagement Rate"
                      value={
                        selectedPost.engagement_rate !== null
                          ? `${selectedPost.engagement_rate.toFixed(1)}%`
                          : 'N/A'
                      }
                    />
                    <MetricItem
                      icon={Heart}
                      label="Total Engagement"
                      value={selectedPost.likes + selectedPost.comments + selectedPost.shares}
                    />
                  </div>
                </motion.div>

                {/* View on Platform Button */}
                {selectedPost.permalink && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Button asChild className="w-full">
                      <a
                        href={selectedPost.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on {selectedPost.platform === 'instagram' ? 'Instagram' : 'TikTok'}
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
