import { useState, useEffect, useCallback } from 'react';
import { PortfolioData } from '@/types/portfolio.types';
import { portfolioApi } from '@/lib/api';

export function usePortfolio(updateInterval: number = 15000) {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await portfolioApi.getPortfolio();
      setPortfolioData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch portfolio data';
      setError(errorMessage);
      console.error('Error fetching portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch immediately
    fetchPortfolio();

    // Set up interval for auto-refresh
    const intervalId = setInterval(() => {
      fetchPortfolio();
    }, updateInterval);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchPortfolio, updateInterval]);

  return {
    portfolioData,
    isLoading,
    error,
    refetch: fetchPortfolio,
  };
}

