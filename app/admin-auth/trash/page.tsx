'use client';

import React, { useState } from 'react';

export default function TrashPage() {
  const [trashItems, setTrashItems] = useState([
    { id: 'DEL-001', type: 'Product', name: 'Vintage Silver Ring', deletedAt: 'Oct 24, 2026' },
    { id: 'DEL-002', type: 'Product', name: 'Golden Cuff', deletedAt: 'Oct 20, 2026' },
    { id: 'DEL-003', type: 'Hero Slide', name: 'Summer Sale Banner', deletedAt: 'Oct 15, 2026' },
    { id: 'DEL-004', type: 'Order', name: 'ORD-0995 (Cancelled)', deletedAt: 'Oct 12, 2026' },
  ]);

  const handleRestore = (id: string) => {
    if (confirm('Are you sure you want to restore this item?')) {
      setTrashItems(trashItems.filter(item => item.id !== id));
      alert('Item restored successfully.');
    }
  };

  const handlePermanentDelete = (id: string) => {
    if (confirm('Are you sure you want to PERMANENTLY delete this item? This action cannot be undone.')) {
      setTrashItems(trashItems.filter(item => item.id !== id));
      alert('Item permanently deleted.');
    }
  };

  const handleEmptyTrash = () => {
    if (trashItems.length === 0) return;
    if (confirm('Are you sure you want to empty the trash? All items will be permanently deleted.')) {
      setTrashItems([]);
      alert('Trash has been emptied.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trash</h1>
          <p className="text-sm text-gray-500 mt-1">Manage deleted products, orders, and banners.</p>
        </div>
        <button 
          onClick={handleEmptyTrash}
          disabled={trashItems.length === 0}
          className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Empty Trash
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Item Type</th>
                <th className="px-6 py-4">Name / ID</th>
                <th className="px-6 py-4">Deleted At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trashItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500">{item.deletedAt}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button 
                      onClick={() => handleRestore(item.id)}
                      className="text-[#0B5E64] hover:underline font-medium transition-colors"
                    >
                      Restore
                    </button>
                    <button 
                      onClick={() => handlePermanentDelete(item.id)}
                      className="text-red-600 hover:underline font-medium transition-colors"
                    >
                      Delete Forever
                    </button>
                  </td>
                </tr>
              ))}
              {trashItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <p>The trash is currently empty.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
