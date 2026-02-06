-- Seed Data for Social Media Analytics Dashboard
-- This file creates sample data for testing.
--
-- IMPORTANT: Before running this seed file, you must:
-- 1. Create two test users via Supabase Auth (email/password signup)
-- 2. Replace the UUIDs below with the actual user IDs from auth.users
--
-- Test Users (create these first):
-- User A: test.user.a@example.com / Password123!
-- User B: test.user.b@example.com / Password123!

-- ============================================
-- INSTRUCTIONS FOR SEEDING
-- ============================================
-- 1. Go to your Supabase project > Authentication > Users
-- 2. Create User A with email: test.user.a@example.com
-- 3. Create User B with email: test.user.b@example.com
-- 4. Copy their UUIDs and replace the placeholders below
-- 5. Run this SQL in the SQL Editor

-- Replace these with actual user UUIDs from your Supabase Auth
-- User A UUID (replace with actual):
DO $$
DECLARE
  user_a_id UUID;
  user_b_id UUID;
BEGIN
  -- Get User A's ID (assumes they're already created in auth.users)
  SELECT id INTO user_a_id FROM auth.users WHERE email = 'test.user.a@example.com' LIMIT 1;
  SELECT id INTO user_b_id FROM auth.users WHERE email = 'test.user.b@example.com' LIMIT 1;

  -- Only proceed if both users exist
  IF user_a_id IS NULL OR user_b_id IS NULL THEN
    RAISE EXCEPTION 'Please create test users first. See instructions above.';
  END IF;

  -- ============================================
  -- POSTS FOR USER A (Creator/Influencer profile)
  -- ============================================

  INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink)
  VALUES
    (user_a_id, 'instagram', 'Excited to share our latest product launch! 🚀 What do you think? #startup #launch', 'https://picsum.photos/seed/post1/400/400', 'image', NOW() - INTERVAL '1 day', 1243, 89, 45, 156, 15420, 18650, 8.20, 'https://instagram.com/p/example1'),
    (user_a_id, 'tiktok', 'Behind the scenes of our creative process 🎬 #bts #creative', 'https://picsum.photos/seed/post2/400/400', 'video', NOW() - INTERVAL '2 days', 5621, 234, 189, 423, 45000, 52000, 12.50, 'https://tiktok.com/@example/video/123'),
    (user_a_id, 'instagram', 'Monday motivation! 💪 How are you starting your week?', 'https://picsum.photos/seed/post3/400/400', 'carousel', NOW() - INTERVAL '3 days', 876, 56, 23, 89, 9800, 11200, 6.80, 'https://instagram.com/p/example3'),
    (user_a_id, 'instagram', 'New collection dropping soon! Stay tuned 👀 #fashion #newdrop', 'https://picsum.photos/seed/post4/400/400', 'image', NOW() - INTERVAL '4 days', 2156, 178, 92, 345, 24500, 28900, 9.10, 'https://instagram.com/p/example4'),
    (user_a_id, 'tiktok', 'POV: When the code finally works 😂 #developer #tech #coding', 'https://picsum.photos/seed/post5/400/400', 'video', NOW() - INTERVAL '5 days', 12450, 567, 823, 1234, 89000, 102000, 15.30, 'https://tiktok.com/@example/video/124'),
    (user_a_id, 'instagram', 'Grateful for this amazing community ❤️ Thank you all!', 'https://picsum.photos/seed/post6/400/400', 'image', NOW() - INTERVAL '6 days', 3421, 289, 145, 567, 32100, 38900, 10.70, 'https://instagram.com/p/example6'),
    (user_a_id, 'tiktok', 'Tutorial: How to create viral content in 2024 📱 #tutorial #viral', 'https://picsum.photos/seed/post7/400/400', 'video', NOW() - INTERVAL '7 days', 8934, 412, 534, 890, 67000, 78500, 13.20, 'https://tiktok.com/@example/video/125'),
    (user_a_id, 'instagram', 'Weekend vibes ✨ Where are you spending your Sunday?', 'https://picsum.photos/seed/post8/400/400', 'carousel', NOW() - INTERVAL '8 days', 1567, 98, 34, 178, 14200, 16800, 7.40, 'https://instagram.com/p/example8'),
    (user_a_id, 'instagram', 'Big announcement coming tomorrow! 🎉 Can you guess what it is?', 'https://picsum.photos/seed/post9/400/400', 'image', NOW() - INTERVAL '9 days', 4523, 678, 234, 789, 41000, 48500, 11.80, 'https://instagram.com/p/example9'),
    (user_a_id, 'tiktok', 'Responding to comments! Thanks for all the questions 💬', 'https://picsum.photos/seed/post10/400/400', 'video', NOW() - INTERVAL '10 days', 6789, 890, 345, 567, 52000, 61000, 14.10, 'https://tiktok.com/@example/video/126'),
    (user_a_id, 'instagram', 'Throwback to last summer ☀️ #tbt #memories', 'https://picsum.photos/seed/post11/400/400', 'image', NOW() - INTERVAL '12 days', 987, 45, 12, 67, 8900, 10200, 5.60, 'https://instagram.com/p/example11'),
    (user_a_id, 'tiktok', 'Day in my life as a content creator 🎥 #dayinmylife #creator', 'https://picsum.photos/seed/post12/400/400', 'video', NOW() - INTERVAL '14 days', 15678, 789, 923, 1456, 112000, 134000, 16.80, 'https://tiktok.com/@example/video/127'),
    (user_a_id, 'instagram', 'Coffee and creativity ☕ What fuels your work?', 'https://picsum.photos/seed/post13/400/400', 'image', NOW() - INTERVAL '16 days', 2345, 167, 78, 234, 21000, 25600, 8.90, 'https://instagram.com/p/example13'),
    (user_a_id, 'instagram', 'Collaboration with @brand 🤝 Link in bio!', 'https://picsum.photos/seed/post14/400/400', 'carousel', NOW() - INTERVAL '18 days', 3890, 234, 156, 456, 35600, 42100, 10.20, 'https://instagram.com/p/example14'),
    (user_a_id, 'tiktok', 'This trend but make it educational 📚 #edutok #learning', 'https://picsum.photos/seed/post15/400/400', 'video', NOW() - INTERVAL '20 days', 9876, 543, 678, 901, 78000, 92000, 13.90, 'https://tiktok.com/@example/video/128'),
    (user_a_id, 'instagram', 'Q&A time! Drop your questions below 👇', 'https://picsum.photos/seed/post16/400/400', 'image', NOW() - INTERVAL '22 days', 1234, 456, 45, 123, 11200, 13500, 7.80, 'https://instagram.com/p/example16'),
    (user_a_id, 'tiktok', 'Reacting to my first ever video 😱 #throwback #reaction', 'https://picsum.photos/seed/post17/400/400', 'video', NOW() - INTERVAL '25 days', 18234, 1234, 1567, 2345, 156000, 189000, 18.20, 'https://tiktok.com/@example/video/129'),
    (user_a_id, 'instagram', 'New merch available now! 🛍️ Limited stock #merch', 'https://picsum.photos/seed/post18/400/400', 'carousel', NOW() - INTERVAL '28 days', 5678, 345, 234, 678, 48000, 56700, 11.40, 'https://instagram.com/p/example18');

  -- ============================================
  -- POSTS FOR USER B (Small business profile)
  -- ============================================

  INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink)
  VALUES
    (user_b_id, 'instagram', 'Fresh batch ready! 🍪 Order now for the weekend', 'https://picsum.photos/seed/post19/400/400', 'image', NOW() - INTERVAL '1 day', 456, 34, 12, 67, 4200, 5100, 6.20, 'https://instagram.com/p/business1'),
    (user_b_id, 'tiktok', 'How we make our signature cookies 🍪✨ #bakery #asmr', 'https://picsum.photos/seed/post20/400/400', 'video', NOW() - INTERVAL '3 days', 2345, 123, 89, 234, 18000, 21500, 11.80, 'https://tiktok.com/@business/video/201'),
    (user_b_id, 'instagram', 'Customer appreciation post! 💕 Thank you for your support', 'https://picsum.photos/seed/post21/400/400', 'carousel', NOW() - INTERVAL '5 days', 678, 89, 23, 45, 5600, 6800, 7.90, 'https://instagram.com/p/business2'),
    (user_b_id, 'instagram', 'New flavor alert! 🍓 Strawberry dream now available', 'https://picsum.photos/seed/post22/400/400', 'image', NOW() - INTERVAL '7 days', 890, 67, 34, 89, 7800, 9200, 8.40, 'https://instagram.com/p/business3'),
    (user_b_id, 'tiktok', 'Packing orders for the weekend rush 📦 #smallbusiness #packing', 'https://picsum.photos/seed/post23/400/400', 'video', NOW() - INTERVAL '9 days', 1567, 78, 56, 123, 12000, 14500, 9.60, 'https://tiktok.com/@business/video/202'),
    (user_b_id, 'instagram', 'Behind the counter 👋 Meet our team!', 'https://picsum.photos/seed/post24/400/400', 'image', NOW() - INTERVAL '11 days', 345, 45, 12, 34, 3200, 3900, 5.80, 'https://instagram.com/p/business4'),
    (user_b_id, 'tiktok', 'From our kitchen to your table 🏠 #homemade #fresh', 'https://picsum.photos/seed/post25/400/400', 'video', NOW() - INTERVAL '13 days', 3456, 234, 145, 345, 28000, 33500, 12.30, 'https://tiktok.com/@business/video/203'),
    (user_b_id, 'instagram', 'Special offer this weekend only! 🎁 Use code SWEET20', 'https://picsum.photos/seed/post26/400/400', 'image', NOW() - INTERVAL '15 days', 1234, 156, 78, 167, 10500, 12800, 10.10, 'https://instagram.com/p/business5'),
    (user_b_id, 'instagram', 'Custom orders welcome! 🎂 DM us for details', 'https://picsum.photos/seed/post27/400/400', 'carousel', NOW() - INTERVAL '17 days', 567, 89, 23, 56, 4800, 5700, 7.20, 'https://instagram.com/p/business6'),
    (user_b_id, 'tiktok', 'The most requested recipe revealed! 🤫 #recipe #viral', 'https://picsum.photos/seed/post28/400/400', 'video', NOW() - INTERVAL '19 days', 8765, 456, 678, 890, 67000, 79500, 14.50, 'https://tiktok.com/@business/video/204'),
    (user_b_id, 'instagram', 'Market day setup 🏪 Come visit us!', 'https://picsum.photos/seed/post29/400/400', 'image', NOW() - INTERVAL '21 days', 234, 23, 8, 19, 2100, 2500, 4.90, 'https://instagram.com/p/business7'),
    (user_b_id, 'tiktok', 'Honest review of our products by customers 💬', 'https://picsum.photos/seed/post30/400/400', 'video', NOW() - INTERVAL '23 days', 2134, 178, 112, 234, 17500, 20800, 10.80, 'https://tiktok.com/@business/video/205'),
    (user_b_id, 'instagram', 'Holiday collection sneak peek 🎄 Coming soon!', 'https://picsum.photos/seed/post31/400/400', 'carousel', NOW() - INTERVAL '26 days', 789, 67, 34, 78, 6700, 8100, 8.10, 'https://instagram.com/p/business8');

  -- ============================================
  -- DAILY METRICS FOR USER A (30 days)
  -- ============================================

  INSERT INTO daily_metrics (user_id, date, engagement, reach)
  SELECT
    user_a_id,
    (NOW() - (n || ' days')::INTERVAL)::DATE,
    -- Varying engagement with some growth trend
    500 + (random() * 800)::INT + (30 - n) * 15,
    -- Reach generally higher with similar pattern
    3000 + (random() * 4000)::INT + (30 - n) * 80
  FROM generate_series(1, 30) AS n
  ON CONFLICT (user_id, date) DO UPDATE SET
    engagement = EXCLUDED.engagement,
    reach = EXCLUDED.reach;

  -- ============================================
  -- DAILY METRICS FOR USER B (30 days)
  -- ============================================

  INSERT INTO daily_metrics (user_id, date, engagement, reach)
  SELECT
    user_b_id,
    (NOW() - (n || ' days')::INTERVAL)::DATE,
    -- Lower but steady engagement for small business
    150 + (random() * 300)::INT + (30 - n) * 5,
    -- Proportional reach
    800 + (random() * 1200)::INT + (30 - n) * 25
  FROM generate_series(1, 30) AS n
  ON CONFLICT (user_id, date) DO UPDATE SET
    engagement = EXCLUDED.engagement,
    reach = EXCLUDED.reach;

END $$;
