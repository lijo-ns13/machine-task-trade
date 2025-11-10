'use client';

import { usePortfolio } from '@/hooks/usePortfolio';
import PortfolioSummary from '@/components/PortfolioSummary';
import SectorSummary from '@/components/SectorSummary';
import PortfolioTable from '@/components/PortfolioTable';

export default function Home() {
  const { portfolioData, isLoading, error, refetch } = usePortfolio(15000); // 15 seconds

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading portfolio data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={refetch}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Real-time portfolio tracking with automatic updates every 15 seconds
          </p>
        </div>

        {portfolioData && (
          <>
            <div className="mb-8">
              <PortfolioSummary portfolioData={portfolioData} isLoading={isLoading} />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sector Overview</h2>
              <SectorSummary sectors={portfolioData.sectors} isLoading={isLoading} />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Portfolio Holdings</h2>
              <PortfolioTable stocks={portfolioData.stocks} isLoading={isLoading} />
            </div>
          </>
        )}

        {isLoading && !portfolioData && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}
