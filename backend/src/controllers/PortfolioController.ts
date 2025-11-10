import { Request, Response } from 'express';
import { PortfolioService } from '../services/PortfolioService';
import { SuccessResponse, ErrorResponse } from '../types/Api.types';

export class PortfolioController {
  private portfolioService: PortfolioService;

  constructor(portfolioService: PortfolioService) {
    this.portfolioService = portfolioService;
  }

  getPortfolio = async (_req: Request, res: Response): Promise<void> => {
    try {
      const portfolioData = await this.portfolioService.getPortfolioData();
      const response: SuccessResponse<typeof portfolioData> = {
        success: true,
        data: portfolioData,
        message: 'Portfolio data fetched successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        message: 'Failed to fetch portfolio data',
      };
      res.status(500).json(response);
    }
  };

  getAllStocks = async (_req: Request, res: Response): Promise<void> => {
    try {
      const stocks = await this.portfolioService.getAllStocks();
      const response: SuccessResponse<typeof stocks> = {
        success: true,
        data: stocks,
        message: 'Stocks fetched successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        message: 'Failed to fetch stocks',
      };
      res.status(500).json(response);
    }
  };

  getStockBySymbol = async (req: Request, res: Response): Promise<void> => {
    try {
      const { symbol } = req.params;
      if (!symbol) {
        const response: ErrorResponse = {
          success: false,
          error: 'Symbol parameter is required',
          message: 'Invalid request',
        };
        res.status(400).json(response);
        return;
      }

      const stock = await this.portfolioService.getStockBySymbol(symbol);
      if (!stock) {
        const response: ErrorResponse = {
          success: false,
          error: 'Stock not found',
          message: `No stock found with symbol: ${symbol}`,
        };
        res.status(404).json(response);
        return;
      }

      const response: SuccessResponse<typeof stock> = {
        success: true,
        data: stock,
        message: 'Stock fetched successfully',
      };
      res.status(200).json(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const response: ErrorResponse = {
        success: false,
        error: errorMessage,
        message: 'Failed to fetch stock',
      };
      res.status(500).json(response);
    }
  };
}

