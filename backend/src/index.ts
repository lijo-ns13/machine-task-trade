import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { StockRepository } from './repositories/StockRepository';
import { PortfolioRepository } from './repositories/PortfolioRepository';
import { PortfolioService } from './services/PortfolioService';
import { PortfolioController } from './controllers/PortfolioController';
import { createPortfolioRoutes } from './routes/portfolio.routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import { requestLogger } from './middleware/requestLogger.middleware';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Initialize repositories (Dependency Injection)
const stockRepository = new StockRepository();
const portfolioRepository = new PortfolioRepository(stockRepository);

// Initialize services
const portfolioService = new PortfolioService(portfolioRepository);

// Initialize controllers
const portfolioController = new PortfolioController(portfolioService);

// Routes
app.use('/api/portfolio', createPortfolioRoutes(portfolioController));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: http://localhost:${PORT}/api/portfolio`);
});

