'use client';

import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { StockData } from '@/types/portfolio.types';

interface PortfolioTableProps {
  stocks: StockData[];
  isLoading?: boolean;
}

export default function PortfolioTable({ stocks, isLoading }: PortfolioTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<StockData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Particulars',
        cell: (info) => (
          <div className="font-medium">
            <div>{info.getValue() as string}</div>
            <div className="text-sm text-gray-500">{info.row.original.symbol}</div>
          </div>
        ),
      },
      {
        accessorKey: 'purchasePrice',
        header: 'Purchase Price',
        cell: (info) => `₹${(info.getValue() as number).toFixed(2)}`,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: (info) => (info.getValue() as number).toLocaleString(),
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        cell: (info) => `₹${(info.getValue() as number).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      {
        accessorKey: 'portfolioPercentage',
        header: 'Portfolio (%)',
        cell: (info) => `${(info.getValue() as number).toFixed(2)}%`,
      },
      {
        accessorKey: 'exchange',
        header: 'NSE/BSE',
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: 'cmp',
        header: 'CMP',
        cell: (info) => {
          const value = info.getValue() as number | undefined;
          return value ? `₹${value.toFixed(2)}` : 'Loading...';
        },
      },
      {
        accessorKey: 'presentValue',
        header: 'Present Value',
        cell: (info) => {
          const value = info.getValue() as number | undefined;
          return value ? `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Calculating...';
        },
      },
      {
        accessorKey: 'gainLoss',
        header: 'Gain/Loss',
        cell: (info) => {
          const value = info.getValue() as number | undefined;
          if (value === undefined) return 'Calculating...';
          const isGain = value >= 0;
          return (
            <span className={`font-semibold ${isGain ? 'text-gain' : 'text-loss'}`}>
              {isGain ? '+' : ''}₹{value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          );
        },
      },
      {
        accessorKey: 'peRatio',
        header: 'P/E Ratio',
        cell: (info) => {
          const value = info.getValue() as number | undefined;
          return value ? value.toFixed(2) : 'N/A';
        },
      },
      {
        accessorKey: 'latestEarnings',
        header: 'Latest Earnings',
        cell: (info) => info.getValue() as string || 'N/A',
      },
    ],
    []
  );

  const table = useReactTable({
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center space-x-1">
                    <span>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

