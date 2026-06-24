# KillShill — KOL Audit Board

A KOL (Key Opinion Leader) audit page for [KillShill](https://killshill.ai) — a financial influencer credibility platform that tracks and scores trading signals from crypto, stock, and forex influencers.

## Live Demo

[View Live →](YOUR_VERCEL_URL)

## Features

- Leaderboard of trading influencers with real accuracy and ROI stats
- Sortable by Accuracy, Total Signals, and Avg ROI
- Search by handle or name
- Filter by minimum accuracy
- Signal detail drawer showing last 10 trades per KOL
- Loading skeletons, empty state, and error state with retry
- Fully responsive — table on desktop, cards on mobile
- Dark mode only

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI
- TanStack Table
- Zustand
- Sonner (toasts)
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Data Source

Data is fetched from two mock endpoints:

- KOLs: `https://gist.githubusercontent.com/Sandeepsorout01/.../kols.json`
- Signals: `https://gist.githubusercontent.com/Sandeepsorout01/.../signals.json`

## AI Usage

- **Generated with AI:** Initial TypeScript type definitions for KOL and Signal based on the API response shape
- **Written manually:** Zustand store structure, TanStack Table column definitions, and all component layout/styling decisions
- **Why:** Used AI to speed up boilerplate type definitions. All product decisions, UI layout, and component logic were written and reviewed manually to ensure correctness and understanding.

## Folder Structure
src/

├── app/

│   ├── layout.tsx

│   └── page.tsx

├── components/

│   ├── Header.tsx

│   ├── KolTable.tsx

│   ├── KolTableColumns.tsx

│   ├── SignalDrawer.tsx

│   ├── SignalBadge.tsx

│   ├── StatusBadge.tsx

│   ├── TableSkeleton.tsx

│   ├── EmptyState.tsx

│   └── ErrorState.tsx

├── hooks/

│   └── useKolData.ts

├── store/

│   └── useKolStore.ts

└── types/

└── index.ts

## What I'd Improve With More Time

- Add URL-synced filters so search/sort state persists on refresh
- Add sparkline charts showing each KOL's last 10 ROI values
- Add keyboard navigation (arrow keys, Enter to open drawer, Escape to close)
- Fetch live Binance prices for OPEN signals to calculate real-time ROI
