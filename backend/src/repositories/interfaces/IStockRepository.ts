import { YahooFinanceResponse, GoogleFinanceResponse } from '../../types/Stock.types';

export interface IStockRepository {
  getCurrentMarketPrice(symbol: string, exchange: string): Promise<YahooFinanceResponse>;
  getPERatioAndEarnings(symbol: string, exchange: string): Promise<GoogleFinanceResponse>;
  getBatchMarketPrices(symbols: Array<{ symbol: string; exchange: string }>): Promise<YahooFinanceResponse[]>;
}

