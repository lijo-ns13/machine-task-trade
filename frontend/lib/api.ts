import axios from 'axios';
import { PortfolioData, ApiResponse } from '@/types/portfolio.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioApi = {
  getPortfolio: async (): Promise<PortfolioData> => {
    try {
      const response = await apiClient.get<ApiResponse<PortfolioData>>('/portfolio');
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data.error || 'Failed to fetch portfolio data');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || error.message || 'Network error');
      }
      throw error;
    }
  },
};

