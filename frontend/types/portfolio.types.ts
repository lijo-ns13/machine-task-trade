export interface StockData {
  symbol: string;
  name: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  exchange: string;
  sector: string;
  cmp?: number;
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

