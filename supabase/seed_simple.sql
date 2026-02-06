-- Simple Seed Data for Social Media Analytics Dashboard
--
-- INSTRUCTIONS:
-- 1. Create two users in Supabase Auth (Authentication > Users > Add user)
--    - User A: test.user.a@example.com / Password123!
--    - User B: test.user.b@example.com / Password123!
-- 2. Copy their UUIDs from the Users table
-- 3. Replace 'f7969206-a815-4136-a91d-0ce4a5018126' and 'c42cbcdc-be46-4ba5-957f-8170b341a9b6' below with actual UUIDs
-- 4. Run this SQL in the SQL Editor

-- ============================================
-- REPLACE THESE WITH YOUR ACTUAL USER UUIDs
-- ============================================
-- Go to Authentication > Users, click on each user to see their UUID

-- Example: If User A's UUID is 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
-- Replace 'f7969206-a815-4136-a91d-0ce4a5018126' with that UUID (keep the quotes)

-- DELETE existing data first (optional - uncomment if needed)
-- DELETE FROM posts;
-- DELETE FROM daily_metrics;

-- ============================================
-- POSTS FOR USER A
-- ============================================
INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink)
VALUES
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Excited to share our latest product launch! #startup #launch', 'https://picsum.photos/seed/post1/400/400', 'image', NOW() - INTERVAL '1 day', 1243, 89, 45, 156, 15420, 18650, 8.20, 'https://instagram.com/p/example1'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'tiktok', 'Behind the scenes of our creative process #bts #creative', 'https://picsum.photos/seed/post2/400/400', 'video', NOW() - INTERVAL '2 days', 5621, 234, 189, 423, 45000, 52000, 12.50, 'https://tiktok.com/@example/video/123'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Monday motivation! How are you starting your week?', 'https://picsum.photos/seed/post3/400/400', 'carousel', NOW() - INTERVAL '3 days', 876, 56, 23, 89, 9800, 11200, 6.80, 'https://instagram.com/p/example3'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'New collection dropping soon! Stay tuned #fashion', 'https://picsum.photos/seed/post4/400/400', 'image', NOW() - INTERVAL '4 days', 2156, 178, 92, 345, 24500, 28900, 9.10, 'https://instagram.com/p/example4'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'tiktok', 'POV: When the code finally works #developer #tech', 'https://picsum.photos/seed/post5/400/400', 'video', NOW() - INTERVAL '5 days', 12450, 567, 823, 1234, 89000, 102000, 15.30, 'https://tiktok.com/@example/video/124'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Grateful for this amazing community! Thank you all!', 'https://picsum.photos/seed/post6/400/400', 'image', NOW() - INTERVAL '6 days', 3421, 289, 145, 567, 32100, 38900, 10.70, 'https://instagram.com/p/example6'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'tiktok', 'Tutorial: How to create viral content #tutorial', 'https://picsum.photos/seed/post7/400/400', 'video', NOW() - INTERVAL '7 days', 8934, 412, 534, 890, 67000, 78500, 13.20, 'https://tiktok.com/@example/video/125'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Weekend vibes! Where are you spending your Sunday?', 'https://picsum.photos/seed/post8/400/400', 'carousel', NOW() - INTERVAL '8 days', 1567, 98, 34, 178, 14200, 16800, 7.40, 'https://instagram.com/p/example8'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Big announcement coming tomorrow! Can you guess?', 'https://picsum.photos/seed/post9/400/400', 'image', NOW() - INTERVAL '9 days', 4523, 678, 234, 789, 41000, 48500, 11.80, 'https://instagram.com/p/example9'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'tiktok', 'Responding to comments! Thanks for all the questions', 'https://picsum.photos/seed/post10/400/400', 'video', NOW() - INTERVAL '10 days', 6789, 890, 345, 567, 52000, 61000, 14.10, 'https://tiktok.com/@example/video/126'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Throwback to last summer #tbt #memories', 'https://picsum.photos/seed/post11/400/400', 'image', NOW() - INTERVAL '12 days', 987, 45, 12, 67, 8900, 10200, 5.60, 'https://instagram.com/p/example11'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'tiktok', 'Day in my life as a content creator #dayinmylife', 'https://picsum.photos/seed/post12/400/400', 'video', NOW() - INTERVAL '14 days', 15678, 789, 923, 1456, 112000, 134000, 16.80, 'https://tiktok.com/@example/video/127'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Coffee and creativity! What fuels your work?', 'https://picsum.photos/seed/post13/400/400', 'image', NOW() - INTERVAL '16 days', 2345, 167, 78, 234, 21000, 25600, 8.90, 'https://instagram.com/p/example13'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'instagram', 'Collaboration with @brand! Link in bio!', 'https://picsum.photos/seed/post14/400/400', 'carousel', NOW() - INTERVAL '18 days', 3890, 234, 156, 456, 35600, 42100, 10.20, 'https://instagram.com/p/example14'),
  ('f7969206-a815-4136-a91d-0ce4a5018126', 'tiktok', 'This trend but make it educational #edutok', 'https://picsum.photos/seed/post15/400/400', 'video', NOW() - INTERVAL '20 days', 9876, 543, 678, 901, 78000, 92000, 13.90, 'https://tiktok.com/@example/video/128');

-- ============================================
-- POSTS FOR USER B
-- ============================================
INSERT INTO posts (user_id, platform, caption, thumbnail_url, media_type, posted_at, likes, comments, shares, saves, reach, impressions, engagement_rate, permalink)
VALUES
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'instagram', 'Fresh batch ready! Order now for the weekend', 'https://picsum.photos/seed/post19/400/400', 'image', NOW() - INTERVAL '1 day', 456, 34, 12, 67, 4200, 5100, 6.20, 'https://instagram.com/p/business1'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'tiktok', 'How we make our signature cookies #bakery #asmr', 'https://picsum.photos/seed/post20/400/400', 'video', NOW() - INTERVAL '3 days', 2345, 123, 89, 234, 18000, 21500, 11.80, 'https://tiktok.com/@business/video/201'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'instagram', 'Customer appreciation post! Thank you for your support', 'https://picsum.photos/seed/post21/400/400', 'carousel', NOW() - INTERVAL '5 days', 678, 89, 23, 45, 5600, 6800, 7.90, 'https://instagram.com/p/business2'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'instagram', 'New flavor alert! Strawberry dream now available', 'https://picsum.photos/seed/post22/400/400', 'image', NOW() - INTERVAL '7 days', 890, 67, 34, 89, 7800, 9200, 8.40, 'https://instagram.com/p/business3'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'tiktok', 'Packing orders for the weekend rush #smallbusiness', 'https://picsum.photos/seed/post23/400/400', 'video', NOW() - INTERVAL '9 days', 1567, 78, 56, 123, 12000, 14500, 9.60, 'https://tiktok.com/@business/video/202'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'instagram', 'Behind the counter - Meet our team!', 'https://picsum.photos/seed/post24/400/400', 'image', NOW() - INTERVAL '11 days', 345, 45, 12, 34, 3200, 3900, 5.80, 'https://instagram.com/p/business4'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'tiktok', 'From our kitchen to your table #homemade #fresh', 'https://picsum.photos/seed/post25/400/400', 'video', NOW() - INTERVAL '13 days', 3456, 234, 145, 345, 28000, 33500, 12.30, 'https://tiktok.com/@business/video/203'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'instagram', 'Special offer this weekend only! Use code SWEET20', 'https://picsum.photos/seed/post26/400/400', 'image', NOW() - INTERVAL '15 days', 1234, 156, 78, 167, 10500, 12800, 10.10, 'https://instagram.com/p/business5'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'instagram', 'Custom orders welcome! DM us for details', 'https://picsum.photos/seed/post27/400/400', 'carousel', NOW() - INTERVAL '17 days', 567, 89, 23, 56, 4800, 5700, 7.20, 'https://instagram.com/p/business6'),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', 'tiktok', 'The most requested recipe revealed! #recipe #viral', 'https://picsum.photos/seed/post28/400/400', 'video', NOW() - INTERVAL '19 days', 8765, 456, 678, 890, 67000, 79500, 14.50, 'https://tiktok.com/@business/video/204');

-- ============================================
-- DAILY METRICS FOR USER A (30 days)
-- ============================================
INSERT INTO daily_metrics (user_id, date, engagement, reach) VALUES
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 1, 1250, 7500),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 2, 1180, 7200),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 3, 1320, 7800),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 4, 1100, 6900),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 5, 1450, 8200),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 6, 1380, 8000),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 7, 1200, 7400),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 8, 1050, 6600),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 9, 1150, 7100),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 10, 1280, 7600),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 11, 1350, 7900),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 12, 1100, 6800),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 13, 1000, 6400),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 14, 1180, 7200),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 15, 1250, 7500),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 16, 1320, 7800),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 17, 1080, 6700),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 18, 1150, 7100),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 19, 1200, 7400),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 20, 1050, 6600),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 21, 980, 6200),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 22, 1100, 6800),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 23, 1180, 7200),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 24, 1250, 7500),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 25, 1000, 6400),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 26, 950, 6100),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 27, 1050, 6600),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 28, 1100, 6800),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 29, 980, 6200),
  ('f7969206-a815-4136-a91d-0ce4a5018126', CURRENT_DATE - 30, 900, 5800)
ON CONFLICT (user_id, date) DO UPDATE SET engagement = EXCLUDED.engagement, reach = EXCLUDED.reach;

-- ============================================
-- DAILY METRICS FOR USER B (30 days)
-- ============================================
INSERT INTO daily_metrics (user_id, date, engagement, reach) VALUES
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 1, 350, 2100),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 2, 320, 1950),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 3, 380, 2250),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 4, 300, 1850),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 5, 420, 2400),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 6, 390, 2300),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 7, 340, 2050),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 8, 280, 1750),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 9, 310, 1900),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 10, 360, 2150),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 11, 400, 2350),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 12, 290, 1800),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 13, 260, 1650),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 14, 320, 1950),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 15, 350, 2100),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 16, 380, 2250),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 17, 270, 1700),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 18, 310, 1900),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 19, 340, 2050),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 20, 280, 1750),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 21, 240, 1550),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 22, 290, 1800),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 23, 320, 1950),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 24, 350, 2100),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 25, 260, 1650),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 26, 230, 1500),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 27, 280, 1750),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 28, 290, 1800),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 29, 240, 1550),
  ('c42cbcdc-be46-4ba5-957f-8170b341a9b6', CURRENT_DATE - 30, 220, 1450)
ON CONFLICT (user_id, date) DO UPDATE SET engagement = EXCLUDED.engagement, reach = EXCLUDED.reach;
