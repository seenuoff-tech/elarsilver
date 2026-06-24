'use client';

import React, { useState } from 'react';

export default function SalesReport() {
  const [dateRange, setDateRange] = useState('This Month');

  const salesData = [
    { date: 'Oct 20, 2026', orders: 12, revenue: '₹34,500' },
    { date: 'Oct 21, 2026', orders: 8, revenue: '₹22,100' },
    { date: 'Oct 22, 2026', orders: 15, revenue: '₹45,200' },
    { date: 'Oct 23, 2026', orders: 22, revenue: '₹68,900' },
    { date: 'Oct 24, 2026', orders: 18, revenue: '₹51,300' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Report</h1>
          <p className="text-sm text-gray-500 mt-1">View revenue, orders, and sales performance over time.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Year to Date</option>
            <option>Custom Range</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue ({dateRange})</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">₹2,22,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">75</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">₹2,960</p>
        </div>
      </div>

      {/* Chart Mockup */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h3>
        <div className="h-64 w-full flex items-end justify-between gap-2 pb-6 border-b border-gray-100 relative">
          {/* Y-axis labels mock */}
          <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400">
            <span>₹80k</span>
            <span>₹60k</span>
            <span>₹40k</span>
            <span>₹20k</span>
            <span>₹0</span>
          </div>
          <div className="w-full h-full flex items-end justify-around pl-10">
            {salesData.map((data, i) => {
              const height = (parseInt(data.revenue.replace(/[^0-9]/g, '')) / 80000) * 100;
              return (
                <div key={i} className="flex flex-col items-center gap-2 w-12 group cursor-pointer">
                  <div 
                    className="w-full bg-[#0B5E64]/20 hover:bg-[#0B5E64] rounded-t-sm transition-colors relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap transition-opacity">
                      {data.revenue}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{data.date.split(',')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Daily Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((data, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{data.date}</td>
                  <td className="px-6 py-4 text-gray-600">{data.orders}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{data.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
