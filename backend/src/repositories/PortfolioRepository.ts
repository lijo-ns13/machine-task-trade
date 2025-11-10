import { IPortfolioRepository } from './interfaces/IPortfolioRepository';
import { IStockRepository } from './interfaces/IStockRepository';
import { PortfolioData, StockData, SectorSummary } from '../types/Stock.types';

export class PortfolioRepository implements IPortfolioRepository {
  private stockRepository: IStockRepository;
  private portfolioStocks: StockData[];

  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository;
    // Initialize with sample portfolio data
    // In a real application, this would come from a database
    this.portfolioStocks = this.initializePortfolioData();
  }

  async getAllStocks(): Promise<StockData[]> {
    return [...this.portfolioStocks];
  }

  async getStockBySymbol(symbol: string): Promise<StockData | null> {
    const stock = this.portfolioStocks.find((s) => s.symbol === symbol);
    return stock || null;
  }

  async getPortfolioData(): Promise<PortfolioData> {
    // Fetch latest market data for all stocks
    const stocksWithMarketData = await this.enrichStocksWithMarketData(this.portfolioStocks);

    // Calculate portfolio percentages
    const totalInvestment = stocksWithMarketData.reduce((sum, stock) => sum + stock.investment, 0);
    const stocksWithPercentages = stocksWithMarketData.map((stock) => ({
      ...stock,
      portfolioPercentage: totalInvestment > 0 ? (stock.investment / totalInvestment) * 100 : 0,
    }));

    // Calculate present values and gain/loss
    const enrichedStocks = stocksWithPercentages.map((stock) => ({
      ...stock,
      presentValue: stock.cmp ? stock.cmp * stock.quantity : 0,
      gainLoss: stock.cmp ? stock.cmp * stock.quantity - stock.investment : 0,
    }));

    // Group by sector
    const sectors = this.groupBySector(enrichedStocks);

    // Calculate totals
    const totalPresentValue = enrichedStocks.reduce((sum, stock) => sum + (stock.presentValue || 0), 0);
    const totalGainLoss = totalPresentValue - totalInvestment;

    return {
      stocks: enrichedStocks,
      sectors,
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
    };
  }

  private async enrichStocksWithMarketData(stocks: StockData[]): Promise<StockData[]> {
    // Fetch CMP and P/E data in parallel
    const marketDataPromises = stocks.map(async (stock) => {
      try {
        const [yahooData, googleData] = await Promise.all([
          this.stockRepository.getCurrentMarketPrice(stock.symbol, stock.exchange),
          this.stockRepository.getPERatioAndEarnings(stock.symbol, stock.exchange),
        ]);

        return {
          ...stock,
          cmp: yahooData.price,
          peRatio: googleData.peRatio,
          latestEarnings: googleData.latestEarnings,
        };
      } catch (error) {
        console.error(`Error enriching data for ${stock.symbol}:`, error);
        return stock;
      }
    });

    return Promise.all(marketDataPromises);
  }

  private groupBySector(stocks: StockData[]): SectorSummary[] {
    const sectorMap = new Map<string, StockData[]>();

    stocks.forEach((stock) => {
      const sector = stock.sector || 'Others';
      if (!sectorMap.has(sector)) {
        sectorMap.set(sector, []);
      }
      sectorMap.get(sector)!.push(stock);
    });

    const sectors: SectorSummary[] = [];

    sectorMap.forEach((sectorStocks, sector) => {
      const totalInvestment = sectorStocks.reduce((sum, stock) => sum + stock.investment, 0);
      const totalPresentValue = sectorStocks.reduce((sum, stock) => sum + (stock.presentValue || 0), 0);
      const gainLoss = totalPresentValue - totalInvestment;

      sectors.push({
        sector,
        totalInvestment,
        totalPresentValue,
        gainLoss,
        stocks: sectorStocks,
      });
    });

    return sectors.sort((a, b) => b.totalInvestment - a.totalInvestment);
  }

  private initializePortfolioData(): StockData[] {
    // Sample portfolio data
    // In a real application, this would come from a database
    return [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries Ltd',
        purchasePrice: 2450.50,
        quantity: 100,
        investment: 245050,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Energy',
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        purchasePrice: 3850.75,
        quantity: 50,
        investment: 192537.5,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Technology',
      },
      {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank Ltd',
        purchasePrice: 1650.25,
        quantity: 150,
        investment: 247537.5,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Financials',
      },
      {
        symbol: 'INFY',
        name: 'Infosys Ltd',
        purchasePrice: 1450.00,
        quantity: 100,
        investment: 145000,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Technology',
      },
      {
        symbol: 'ICICIBANK',
        name: 'ICICI Bank Ltd',
        purchasePrice: 950.50,
        quantity: 200,
        investment: 190100,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Financials',
      },
      {
        symbol: 'HINDUNILVR',
        name: 'Hindustan Unilever Ltd',
        purchasePrice: 2650.00,
        quantity: 50,
        investment: 132500,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Consumer Goods',
      },
      {
        symbol: 'BHARTIARTL',
        name: 'Bharti Airtel Ltd',
        purchasePrice: 850.25,
        quantity: 150,
        investment: 127537.5,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Telecommunications',
      },
      {
        symbol: 'ITC',
        name: 'ITC Ltd',
        purchasePrice: 450.75,
        quantity: 300,
        investment: 135225,
        portfolioPercentage: 0,
        exchange: 'NSE',
        sector: 'Consumer Goods',
      },
    ];
  }
}

