export interface StockData {
  symbol: string;
  name: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: string; // NSE or BSE
  sector: string;
  cmp?: number; // Current Market Price
  presentValue?: number;
  gainLoss?: number;
  peRatio?: number;
  latestEarnings?: string;
}

export interface SectorSummary {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
  stocks: StockData[];
}

export interface PortfolioData {
  stocks: StockData[];
  sectors: SectorSummary[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
}

export interface YahooFinanceResponse {
  price: number;
  symbol: string;
}

export interface GoogleFinanceResponse {
  peRatio?: number;
  latestEarnings?: string;
  symbol: string;
}

