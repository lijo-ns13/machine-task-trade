import { Router } from 'express';
import { PortfolioController } from '../controllers/PortfolioController';

export const createPortfolioRoutes = (portfolioController: PortfolioController): Router => {
  const router = Router();

  router.get('/', portfolioController.getPortfolio);
  router.get('/stocks', portfolioController.getAllStocks);
  router.get('/stocks/:symbol', portfolioController.getStockBySymbol);

  return router;
};

