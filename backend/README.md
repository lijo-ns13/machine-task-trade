# Portfolio Dashboard Backend

Express.js backend API for the Portfolio Dashboard application with TypeScript, Repository Pattern, and SOLID principles.

## Features

- **Repository Pattern**: Clean separation of data access logic
- **SOLID Principles**: Well-structured, maintainable code
- **TypeScript**: Type-safe codebase
- **RESTful API**: Clean API endpoints
- **Error Handling**: Comprehensive error handling middleware
- **Caching**: In-memory caching for API responses to reduce rate limiting

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── repositories/      # Data access layer
│   │   └── interfaces/    # Repository interfaces
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── types/            # TypeScript type definitions
│   └── index.ts          # Application entry point
├── package.json
└── tsconfig.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (use `.env.example` as reference):
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
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

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Portfolio
- `GET /api/portfolio` - Get full portfolio data with market prices
- `GET /api/portfolio/stocks` - Get all stocks
- `GET /api/portfolio/stocks/:symbol` - Get stock by symbol

## Architecture

### Repository Pattern
The application follows the repository pattern for data access:
- `IStockRepository`: Interface for stock data fetching
- `StockRepository`: Implementation for Yahoo Finance and Google Finance
- `IPortfolioRepository`: Interface for portfolio data
- `PortfolioRepository`: Implementation for portfolio management

### SOLID Principles
- **Single Responsibility**: Each class has a single responsibility
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Interfaces can be substituted with implementations
- **Interface Segregation**: Focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

## Data Sources

### Yahoo Finance
- Used for fetching Current Market Price (CMP)
- Uses Yahoo Finance API endpoint

### Google Finance
- Used for fetching P/E Ratio and Latest Earnings
- Uses web scraping with Cheerio

## Notes

- The application uses mock data when API calls fail (for development/demo)
- Caching is implemented to reduce API calls and rate limiting
- Error handling is comprehensive with proper error responses

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGIN`: Allowed CORS origin (default: http://localhost:3000)

