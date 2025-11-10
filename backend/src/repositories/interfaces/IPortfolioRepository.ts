import { PortfolioData, StockData } from '../../types/Stock.types';

export interface IPortfolioRepository {
  getAllStocks(): Promise<StockData[]>;
  getPortfolioData(): Promise<PortfolioData>;
  getStockBySymbol(symbol: string): Promise<StockData | null>;
}

