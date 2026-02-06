# Social Media Analytics Dashboard

A production-ready social media analytics dashboard built with Next.js 15, Supabase, and modern React patterns. Track engagement metrics, analyze post performance, and visualize trends across Instagram and TikTok.

## Live Demo

[[Deploy to Vercel to see live demo]](https://ota-exam-social-media.vercel.app/)

Test Access:

- Email: test.user.a@example.com
- Password: Password123!
 
- Email: test.user.b@example.com
- Password: Password123!

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Global State**: Zustand
- **Server State**: TanStack Query v5
- **Table**: TanStack Table v8
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Features

- User authentication (email/password)
- Row Level Security (RLS) for data isolation
- Interactive posts table with sorting and filtering
- Engagement trend charts (line/area toggle)
- Summary metric cards with trend indicators
- Post detail modal with animations
- Responsive design
- Loading skeletons and empty states
- API routes with authentication validation
- Edge Function for low-latency metrics

---

## Design Decisions

### 1. Where should engagement metrics be aggregated?

**Decision: API Route (Server-side aggregation)**

I chose to aggregate metrics in the `/api/analytics/summary` API route rather than client-side or database-level.

**Trade-offs:**

| Approach | Pros | Cons |
|----------|------|------|
| **API Route (chosen)** | Secure (runs server-side), flexible computation, easy to extend, cacheable via TanStack Query | Extra network request, slight latency |
| Client-side | No extra API call, immediate updates | Exposes raw data to client, heavy computation on user devices, harder to cache |
| Database (Postgres function) | Most performant for large datasets, single query | Less flexible, harder to maintain, requires DB migrations for logic changes |
| Hybrid | Best of both worlds | Most complex to implement |

**Reasoning:**
- With typical user data (10-100 posts), the computation overhead is negligible
- Server-side aggregation keeps sensitive metrics processing secure
- TanStack Query provides built-in caching (5 minute staleTime)
- Easy to extend with additional metrics without client changes
- If scaling to 10,000+ posts, I would move to a Postgres function or pre-computed materialized view

### 2. What data should live in Zustand vs. TanStack Query vs. URL state?

**State Management Map:**

| State | Location | Reasoning |
|-------|----------|-----------|
| Platform filter (All/Instagram/TikTok) | **Zustand** | UI state, doesn't need URL persistence, affects query but doesn't need to survive refresh |
| Sort column and direction | **Zustand** | UI preference, quick toggling without URL pollution |
| Selected post (for modal) | **Zustand** | Ephemeral UI state, modal shouldn't be shareable via URL |
| Chart view type (line/area) | **Zustand** | Visual preference, no need for URL persistence |
| Posts data | **TanStack Query** | Server state, needs caching, loading states, automatic refetching |
| Daily metrics data | **TanStack Query** | Server state, fetched from Edge Function |
| Analytics summary | **TanStack Query** | Computed server state from API route |

**Reasoning:**
- **Zustand** for ephemeral UI state that doesn't need to persist or be shareable
- **TanStack Query** for all server state - provides automatic caching, deduplication, background refetching
- **URL state** would be used for shareable filters (not implemented here as it wasn't a requirement, but could easily add `useSearchParams` for the platform filter if needed)
- Clear separation prevents prop drilling and makes state management predictable

### 3. How do you handle the case where a user has no data?

**Empty State Strategy:**

| Component | Behavior |
|-----------|----------|
| Posts Table | Shows "No posts yet" with icon and helpful message |
| Engagement Chart | Shows "No data yet" with chart icon and description |
| Summary Cards | Shows zeros and "N/A" with appropriate messaging |
| API Routes | Return empty arrays `[]` and zero values (never errors) |
| Engagement Rate | Shows "N/A" when null (not 0%, as 0% implies actual zero engagement) |

**Implementation Details:**
- All components handle empty arrays gracefully without crashing
- API routes return valid JSON with zero/null values instead of errors
- Engagement rate distinction: `0%` means calculated zero engagement, `N/A` means no data available
- Trend percentage shows "0%" with neutral indicator when no comparison data
- Chart renders empty state UI instead of an empty/broken chart

### 4. How should the "trend" percentage be calculated?

**Decision: Last 7 days vs. prior 7 days**

**Options considered:**
- Last 7 days vs. prior 7 days ✓ (chosen)
- Last 30 days vs. prior 30 days
- This month vs. last month

**Reasoning:**
- **7 days provides meaningful short-term insights** - social media engagement changes quickly, monthly comparisons can mask important trends
- **Sufficient data points** - even with moderate posting (2-3 posts/week), 7 days provides enough signal
- **User expectation** - most social media dashboards use weekly comparisons
- **Data availability** - works even with limited historical data

**Edge cases handled:**
- If no prior period data but has recent data: shows +100% (positive trend)
- If no data in either period: shows 0% with neutral indicator
- If engagement dropped to zero: shows -100%

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analytics/summary/    # Aggregated metrics API
│   │   │   └── metrics/daily/        # Edge Function for daily metrics
│   │   ├── auth/callback/            # OAuth callback handler
│   │   ├── dashboard/                # Protected dashboard
│   │   ├── login/                    # Login page
│   │   ├── signup/                   # Signup page
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── charts/
│   │   │   └── engagement-chart.tsx
│   │   ├── posts/
│   │   │   ├── post-detail-modal.tsx
│   │   │   ├── posts-table.tsx
│   │   │   └── summary-cards.tsx
│   │   ├── providers/
│   │   │   └── query-provider.tsx
│   │   └── ui/                       # shadcn/ui components
│   ├── lib/
│   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   ├── query-keys.ts         # Query key factory
│   │   │   ├── use-analytics-summary.ts
│   │   │   ├── use-daily-metrics.ts
│   │   │   └── use-posts.ts
│   │   ├── stores/
│   │   │   └── dashboard-store.ts    # Zustand store
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── middleware.ts         # Auth middleware
│   │   │   └── server.ts             # Server client
│   │   ├── database.types.ts         # Supabase types
│   │   └── utils.ts
│   └── middleware.ts                 # Next.js middleware for auth
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql    # Schema + RLS policies
│   └── seed.sql                      # Sample data for 2 users
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

### 1. Clone the repository

```bash
git clone <repository-url>
cd social-media-analytics-dashboard
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** and copy:
   - Project URL
   - Anon (public) key

3. Create `.env.local`:
```bash
cp .env.example .env.local
```

4. Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

1. Go to **SQL Editor** in Supabase Dashboard
2. Run the migration script:
   ```bash
   # Copy contents of supabase/migrations/001_initial_schema.sql
   ```
3. This creates:
   - `posts` table with RLS policies
   - `daily_metrics` table with RLS policies
   - Performance indexes

### 4. Create test users

1. Go to **Authentication > Users** in Supabase Dashboard
2. Create two test users:
   - `test.user.a@example.com` / `Password123!`
   - `test.user.b@example.com` / `Password123!`

### 5. Seed sample data

1. Go to **SQL Editor** in Supabase Dashboard
2. Run the seed script:
   ```bash
   # Copy contents of supabase/seed.sql
   ```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Row Level Security (RLS)

### How it works

RLS ensures complete data isolation between users at the database level.

**Posts table policies:**
```sql
-- Users can only SELECT their own posts
CREATE POLICY "Users can view own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only INSERT posts with their own user_id
CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Similar policies for UPDATE and DELETE
```

### Testing RLS

1. Log in as User A → Only see User A's posts
2. Log in as User B → Only see User B's posts
3. Try to access User B's data via API as User A → Returns empty/fails

### Security implications

- Even if someone guesses another user's post ID, they cannot access it
- The database rejects unauthorized operations before any code runs
- This is defense-in-depth: auth + RLS together

---

## API Routes

### GET /api/analytics/summary

Returns aggregated analytics for the authenticated user.

**Response:**
```json
{
  "totalEngagement": 45000,
  "averageEngagementRate": 9.5,
  "topPerformingPost": { ... },
  "trendPercentage": 15.2,
  "trendDirection": "up",
  "totalPosts": 18,
  "totalReach": 250000,
  "periodDays": 7
}
```

### GET /api/metrics/daily (Edge Function)

Returns daily metrics for the chart. Runs at the edge for low latency.

**Query params:**
- `days` (optional): Number of days to fetch (default: 30, max: 90)

**Response:**
```json
{
  "data": [
    { "date": "2024-01-01", "engagement": 450, "reach": 5200 },
    ...
  ]
}
```

---

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

**Security note:** Never add `SUPABASE_SERVICE_ROLE_KEY` to environment variables unless absolutely necessary. The anon key with RLS is sufficient for this application.

---

## What I'd Improve with More Time

1. **URL state for filters** - Make platform filter shareable via URL params
2. **Pagination** - Add pagination for large post lists
3. **Real-time updates** - Use Supabase Realtime for live data
4. **Unit tests** - Add Vitest tests for hooks and API routes
5. **E2E tests** - Add Cypress tests for critical flows
6. **Rate limiting** - Add rate limiting to API routes
7. **Error boundaries** - Add React error boundaries for graceful failures
8. **Visx charts** - Migrate from Recharts to Visx for more control
9. **Dark mode toggle** - Add user-controllable theme switching
10. **Data export** - CSV/JSON export functionality

---

## Time Spent

- Project setup & dependencies: 30 minutes
- Supabase schema & RLS: 45 minutes
- Authentication flow: 30 minutes
- State management setup: 20 minutes
- Posts table component: 45 minutes
- Engagement chart: 30 minutes
- Summary cards: 25 minutes
- Post detail modal: 30 minutes
- API routes: 30 minutes
- Dashboard layout: 20 minutes
- Testing & debugging: 30 minutes
- Documentation: 45 minutes

**Total: ~5 hours**

---

## License

MIT
