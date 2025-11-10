import { IPortfolioRepository } from '../repositories/interfaces/IPortfolioRepository';
import { PortfolioData, StockData } from '../types/Stock.types';

export class PortfolioService {
  private portfolioRepository: IPortfolioRepository;

  constructor(portfolioRepository: IPortfolioRepository) {
    this.portfolioRepository = portfolioRepository;
  }

  async getPortfolioData(): Promise<PortfolioData> {
    try {
      return await this.portfolioRepository.getPortfolioData();
    } catch (error) {
      console.error('Error in PortfolioService.getPortfolioData:', error);
      throw new Error('Failed to fetch portfolio data');
    }
  }

  async getAllStocks(): Promise<StockData[]> {
    try {
      return await this.portfolioRepository.getAllStocks();
    } catch (error) {
      console.error('Error in PortfolioService.getAllStocks:', error);
      throw new Error('Failed to fetch stocks');
    }
  }

  async getStockBySymbol(symbol: string): Promise<StockData | null> {
    try {
      return await this.portfolioRepository.getStockBySymbol(symbol);
    } catch (error) {
      console.error('Error in PortfolioService.getStockBySymbol:', error);
      throw new Error('Failed to fetch stock');
    }
  }
}

