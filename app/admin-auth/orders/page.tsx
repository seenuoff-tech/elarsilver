'use client';

import React, { useState } from 'react';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([
    { id: 'ORD-1023', customer: 'Rahul Sharma', email: 'rahul@example.com', date: 'Oct 24, 2026', total: '₹4,500', status: 'Processing' },
    { id: 'ORD-1022', customer: 'Priya Patel', email: 'priya@example.com', date: 'Oct 23, 2026', total: '₹12,000', status: 'Delivered' },
    { id: 'ORD-1021', customer: 'Arun Kumar', email: 'arun@example.com', date: 'Oct 22, 2026', total: '₹3,200', status: 'Shipped' },
    { id: 'ORD-1020', customer: 'Sneha Reddy', email: 'sneha@example.com', date: 'Oct 21, 2026', total: '₹8,900', status: 'Cancelled' },
    { id: 'ORD-1019', customer: 'Vikram Singh', email: 'vikram@example.com', date: 'Oct 20, 2026', total: '₹5,500', status: 'Pending' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    // In a real app, you would make an API call here to update the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and update customer order statuses.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                    <div className="text-gray-500 text-xs">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-xs font-medium rounded-full px-2.5 py-1 outline-none border cursor-pointer ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-800 border-green-200' : 
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
                        order.status === 'Shipped' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        order.status === 'Cancelled' ? 'bg-red-50 text-red-800 border-red-200' :
                        'bg-yellow-50 text-yellow-800 border-yellow-200'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-[#0B5E64] hover:underline font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1 to {orders.length} of {orders.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
                <p className="text-sm text-gray-500">{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6 text-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">Customer</p>
                  <p className="font-medium text-gray-900">{selectedOrder.customer}</p>
                  <p className="text-gray-500">{selectedOrder.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{selectedOrder.date}</p>
                  <p className="mt-2 text-gray-500">Status</p>
                  <p className="font-medium text-[#0B5E64]">{selectedOrder.status}</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sample Ring (US 7) x 1</span>
                  <span className="font-medium">{selectedOrder.total}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-50 mt-4 text-base font-bold">
                  <span>Total</span>
                  <span className="text-[#0B5E64]">{selectedOrder.total}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
