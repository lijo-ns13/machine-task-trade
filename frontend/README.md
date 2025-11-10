# Portfolio Dashboard Frontend

Next.js frontend application for the Portfolio Dashboard with TypeScript and Tailwind CSS.

## Features

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe codebase
- **Tailwind CSS**: Utility-first CSS framework
- **React Table**: Powerful table component with sorting and filtering
- **Real-time Updates**: Auto-refresh every 15 seconds
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error handling with retry functionality

## Project Structure

```
frontend/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── PortfolioTable.tsx
│   ├── PortfolioSummary.tsx
│   └── SectorSummary.tsx
├── hooks/               # Custom React hooks
│   └── usePortfolio.ts
├── lib/                 # Utility functions
│   └── api.ts
├── types/               # TypeScript types
│   └── portfolio.types.ts
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Features

### Portfolio Table
- Displays all portfolio holdings
- Sortable columns
- Real-time price updates
- Color-coded gains/losses

### Sector Summary
- Grouped by sector
- Sector-level totals
- Visual indicators

### Portfolio Summary
- Total investment
- Present value
- Total gain/loss
- Percentage change

## Components

### PortfolioTable
Displays portfolio holdings in a sortable table with all required columns.

### PortfolioSummary
Shows overall portfolio statistics.

### SectorSummary
Displays sector-wise summaries with totals.

## Hooks

### usePortfolio
Custom hook for fetching and managing portfolio data with auto-refresh.

## API Integration

The frontend communicates with the backend API through the `portfolioApi` service in `lib/api.ts`.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:3000)

