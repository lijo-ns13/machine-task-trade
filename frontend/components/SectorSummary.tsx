'use client';

import { SectorSummary as SectorSummaryType } from '@/types/portfolio.types';

interface SectorSummaryProps {
  sectors: SectorSummaryType[];
  isLoading?: boolean;
}

export default function SectorSummary({ sectors, isLoading }: SectorSummaryProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sectors.map((sector) => {
        const isGain = sector.gainLoss >= 0;
        return (
          <div
            key={sector.sector}
            className="bg-white rounded-lg shadow-md p-6 border-l-4"
            style={{ borderLeftColor: isGain ? '#10b981' : '#ef4444' }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{sector.sector}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Investment:</span>
                <span className="font-medium">
                  ₹{sector.totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Present Value:</span>
                <span className="font-medium">
                  ₹{sector.totalPresentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Gain/Loss:</span>
                <span className={`font-semibold ${isGain ? 'text-gain' : 'text-loss'}`}>
                  {isGain ? '+' : ''}₹{sector.gainLoss.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="pt-2 text-sm text-gray-500">
                {sector.stocks.length} stock{sector.stocks.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

