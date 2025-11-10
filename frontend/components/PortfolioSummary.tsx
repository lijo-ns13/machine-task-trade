'use client';

import { PortfolioData } from '@/types/portfolio.types';

interface PortfolioSummaryProps {
  portfolioData: PortfolioData;
  isLoading?: boolean;
}

export default function PortfolioSummary({ portfolioData, isLoading }: PortfolioSummaryProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isGain = portfolioData.totalGainLoss >= 0;
  const gainLossPercentage = portfolioData.totalInvestment > 0
    ? (portfolioData.totalGainLoss / portfolioData.totalInvestment) * 100
    : 0;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-sm opacity-90 mb-1">Total Investment</div>
          <div className="text-2xl font-bold">
            ₹{portfolioData.totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div>
          <div className="text-sm opacity-90 mb-1">Present Value</div>
          <div className="text-2xl font-bold">
            ₹{portfolioData.totalPresentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div>
          <div className="text-sm opacity-90 mb-1">Total Gain/Loss</div>
          <div className={`text-2xl font-bold ${isGain ? 'text-green-300' : 'text-red-300'}`}>
            {isGain ? '+' : ''}₹{portfolioData.totalGainLoss.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`text-sm mt-1 ${isGain ? 'text-green-300' : 'text-red-300'}`}>
            ({isGain ? '+' : ''}{gainLossPercentage.toFixed(2)}%)
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-blue-400">
        <div className="text-sm opacity-90">
          Total Stocks: {portfolioData.stocks.length} | Sectors: {portfolioData.sectors.length}
        </div>
      </div>
    </div>
  );
}

