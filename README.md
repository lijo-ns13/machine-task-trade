# Portfolio Dashboard

A dynamic portfolio dashboard application built with Next.js (frontend) and Express.js (backend) that displays real-time stock portfolio information.

## Project Overview

This project demonstrates a full-stack web application for tracking investment portfolios with real-time stock data from Yahoo Finance and Google Finance.

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Table** for data tables
- **Axios** for API calls

### Backend
- **Express.js** with TypeScript
- **Repository Pattern** for data access
- **SOLID Principles** for clean architecture
- **Cheerio** for web scraping
- **Axios** for HTTP requests

## Features

- ✅ Real-time portfolio tracking
- ✅ Automatic updates every 15 seconds
- ✅ Sector-wise grouping
- ✅ Color-coded gains/losses
- ✅ Sortable portfolio table
- ✅ Responsive design
- ✅ Error handling with retry
- ✅ Type-safe codebase

## Project Structure

```
octabyte/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Portfolio
- `GET /api/portfolio` - Get full portfolio data
- `GET /api/portfolio/stocks` - Get all stocks
- `GET /api/portfolio/stocks/:symbol` - Get stock by symbol

### Health Check
- `GET /health` - Server health check

## Portfolio Table Columns

- Particulars (Stock Name)
- Purchase Price
- Quantity (Qty)
- Investment (Purchase Price × Qty)
- Portfolio (%) (Proportional weight)
- NSE/BSE (Stock Exchange Code)
- CMP (Current Market Price from Yahoo Finance)
- Present Value (CMP × Qty)
- Gain/Loss (Present Value – Investment)
- P/E Ratio (from Google Finance)
- Latest Earnings (from Google Finance)

## Data Sources

### Yahoo Finance
- Used for fetching Current Market Price (CMP)
- Note: Uses unofficial API endpoint

### Google Finance
- Used for fetching P/E Ratio and Latest Earnings
- Note: Uses web scraping (may require updates if site structure changes)

## Technical Challenges and Solutions

### API Limitations
- **Challenge**: Yahoo Finance and Google Finance don't have official public APIs
- **Solution**: Used unofficial endpoints and web scraping with proper error handling and fallback to mock data

### Rate Limiting
- **Challenge**: Public APIs may have rate limits
- **Solution**: Implemented caching mechanism (10-second TTL) to reduce API calls

### Data Accuracy
- **Challenge**: Scraped data may vary in accuracy
- **Solution**: Added error handling and fallback mechanisms

### Real-time Updates
- **Challenge**: Updating data every 15 seconds
- **Solution**: Used `setInterval` in React hook with proper cleanup

## Architecture

### Backend Architecture
- **Repository Pattern**: Clean separation of data access
- **Service Layer**: Business logic separation
- **Controller Layer**: Request handling
- **Middleware**: Error handling and logging

### Frontend Architecture
- **Component-based**: Reusable React components
- **Custom Hooks**: Data fetching logic
- **Type Safety**: TypeScript throughout
- **Responsive Design**: Mobile-first approach

## Development

### Backend
```bash
cd backend
npm run dev      # Development server
npm run build    # Build for production
npm start        # Production server
```

### Frontend
```bash
cd frontend
npm run dev      # Development server
npm run build    # Build for production
npm start        # Production server
```

## Deployment

### Backend
1. Build the project: `npm run build`
2. Set environment variables
3. Start the server: `npm start`

### Frontend
1. Build the project: `npm run build`
2. Set environment variables
3. Start the server: `npm start`

Or deploy to Vercel (recommended for Next.js):
```bash
vercel deploy
```

## Notes

- The application uses mock data when API calls fail (for development/demo purposes)
- In production, you may want to use official financial APIs or paid services
- The current implementation includes error handling and fallback mechanisms
- Caching is implemented to reduce API calls and prevent rate limiting

## License

This project is created for assessment purposes.

## Author

Octa Byte AI Pvt Ltd

