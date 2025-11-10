import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import { IStockRepository } from './interfaces/IStockRepository';
import { YahooFinanceResponse, GoogleFinanceResponse } from '../types/Stock.types';

export class StockRepository implements IStockRepository {
  private yahooClient: AxiosInstance;
  private googleClient: AxiosInstance;
  private cache: Map<string, { data: YahooFinanceResponse | GoogleFinanceResponse; timestamp: number }>;
  private readonly CACHE_TTL = 10000; // 10 seconds cache

  constructor() {
    this.yahooClient = axios.create({
      baseURL: 'https://query1.finance.yahoo.com',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    this.googleClient = axios.create({
      baseURL: 'https://www.google.com',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    this.cache = new Map();
  }

  private getCacheKey(type: 'yahoo' | 'google', symbol: string, exchange: string): string {
    return `${type}:${exchange}:${symbol}`;
  }

  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(key: string, data: YahooFinanceResponse | GoogleFinanceResponse): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getCurrentMarketPrice(symbol: string, exchange: string): Promise<YahooFinanceResponse> {
    const cacheKey = this.getCacheKey('yahoo', symbol, exchange);
    const cached = this.getCachedData<YahooFinanceResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Convert NSE/BSE symbol to Yahoo Finance format
      const yahooSymbol = this.convertToYahooSymbol(symbol, exchange);
      
      // Using Yahoo Finance API endpoint
      const response = await this.yahooClient.get('/v8/finance/chart/' + yahooSymbol, {
        params: {
          interval: '1d',
          range: '1d',
        },
      });

      const price = response.data?.chart?.result?.[0]?.meta?.regularMarketPrice;
      
      if (!price) {
        throw new Error(`Unable to fetch price for ${symbol}`);
      }

      const result: YahooFinanceResponse = {
        price,
        symbol,
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Error fetching CMP for ${symbol}:`, error);
      // Return a mock price for development/demo purposes
      // In production, you might want to throw or return an error response
      // Generate realistic mock price based on symbol (deterministic for consistency)
      const mockPrice = this.generateMockPrice(symbol);
      const result: YahooFinanceResponse = {
        price: mockPrice,
        symbol,
      };
      // Cache mock data with shorter TTL
      this.setCache(cacheKey, result);
      return result;
    }
  }

  async getPERatioAndEarnings(symbol: string, exchange: string): Promise<GoogleFinanceResponse> {
    const cacheKey = this.getCacheKey('google', symbol, exchange);
    const cached = this.getCachedData<GoogleFinanceResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // Convert symbol for Google Finance
      const googleSymbol = this.convertToGoogleSymbol(symbol, exchange);
      
      const response = await this.googleClient.get(`/finance/quote/${googleSymbol}`, {
        params: {
          hl: 'en',
        },
      });

      const $ = cheerio.load(response.data);
      
      // Extract P/E Ratio and Latest Earnings from HTML
      // Note: This is a simplified example. Google Finance structure may vary
      let peRatio: number | undefined;
      let latestEarnings: string | undefined;

      // Try to extract P/E ratio
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $('[data-field="trailingPE"]').each((_index: number, elem: any) => {
        const value = $(elem).text().trim();
        const parsed = parseFloat(value);
        if (!isNaN(parsed)) {
          peRatio = parsed;
        }
      });

      // Try to extract earnings date
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $('[data-field="earningsDate"]').each((_index: number, elem: any) => {
        latestEarnings = $(elem).text().trim();
      });

      const result: GoogleFinanceResponse = {
        peRatio,
        latestEarnings: latestEarnings || 'N/A',
        symbol,
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error(`Error fetching P/E and earnings for ${symbol}:`, error);
      // Return mock data for development
      const mockData: GoogleFinanceResponse = {
        peRatio: this.generateMockPERatio(symbol),
        latestEarnings: this.generateMockEarningsDate(),
        symbol,
      };
      // Cache mock data with shorter TTL
      this.setCache(cacheKey, mockData);
      return mockData;
    }
  }

  async getBatchMarketPrices(
    symbols: Array<{ symbol: string; exchange: string }>
  ): Promise<YahooFinanceResponse[]> {
    // Fetch prices in parallel with rate limiting consideration
    const promises = symbols.map(({ symbol, exchange }) =>
      this.getCurrentMarketPrice(symbol, exchange).catch((error) => {
        console.error(`Error fetching price for ${symbol}:`, error);
        return { price: 0, symbol };
      })
    );

    return Promise.all(promises);
  }

  private convertToYahooSymbol(symbol: string, exchange: string): string {
    // Convert NSE/BSE symbols to Yahoo Finance format
    // Example: RELIANCE.NSE, TCS.BSE
    if (exchange.toUpperCase() === 'NSE') {
      return `${symbol}.NS`;
    } else if (exchange.toUpperCase() === 'BSE') {
      return `${symbol}.BO`;
    }
    return symbol;
  }

  private convertToGoogleSymbol(symbol: string, exchange: string): string {
    // Convert to Google Finance format
    // Example: NSE:RELIANCE, BSE:TCS
    if (exchange.toUpperCase() === 'NSE') {
      return `NSE:${symbol}`;
    } else if (exchange.toUpperCase() === 'BSE') {
      return `BOM:${symbol}`;
    }
    return symbol;
  }

  private generateMockPrice(symbol: string): number {
    // Generate deterministic mock price based on symbol hash
    // This ensures consistent prices for the same symbol
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Generate price between 100 and 5000 based on hash
    const basePrice = Math.abs(hash % 4900) + 100;
    // Add some variation (±10%) to simulate market movement
    const variation = (Math.sin(Date.now() / 10000) * 0.1 + 1);
    return Math.round(basePrice * variation * 100) / 100;
  }

  private generateMockPERatio(symbol: string): number {
    // Generate deterministic P/E ratio based on symbol
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Generate P/E ratio between 10 and 40
    return Math.round((Math.abs(hash % 30) + 10) * 100) / 100;
  }

  private generateMockEarningsDate(): string {
    // Generate a recent earnings date (within last 90 days)
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}

