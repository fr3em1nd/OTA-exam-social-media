-- Social Media Analytics Dashboard Schema
-- This migration creates the posts and daily_metrics tables with RLS policies

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  caption TEXT,
  thumbnail_url TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'carousel')),
  posted_at TIMESTAMPTZ NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  permalink TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily metrics table
CREATE TABLE IF NOT EXISTS daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  engagement INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);
CREATE INDEX IF NOT EXISTS idx_posts_posted_at ON posts(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_id ON daily_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_user_date ON daily_metrics(user_id, date);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR POSTS TABLE
-- ============================================

-- Policy: Users can only SELECT their own posts
-- This ensures User A cannot read User B's posts
CREATE POLICY "Users can view own posts"
  ON posts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only INSERT posts with their own user_id
-- This prevents users from inserting posts on behalf of other users
CREATE POLICY "Users can insert own posts"
  ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own posts
-- This ensures users cannot modify other users' posts
CREATE POLICY "Users can update own posts"
  ON posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only DELETE their own posts
-- This prevents users from deleting other users' content
CREATE POLICY "Users can delete own posts"
  ON posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES FOR DAILY_METRICS TABLE
-- ============================================

-- Policy: Users can only SELECT their own daily metrics
CREATE POLICY "Users can view own daily metrics"
  ON daily_metrics
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only INSERT daily metrics with their own user_id
CREATE POLICY "Users can insert own daily metrics"
  ON daily_metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own daily metrics
CREATE POLICY "Users can update own daily metrics"
  ON daily_metrics
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only DELETE their own daily metrics
CREATE POLICY "Users can delete own daily metrics"
  ON daily_metrics
  FOR DELETE
  USING (auth.uid() = user_id);
