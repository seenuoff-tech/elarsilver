'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePricing } from '@/components/PricingProvider';
import { useProducts, AppProduct } from '@/context/ProductsContext';

export default function ProductsManagement() {
  const { calculatePrice } = usePricing();
  const { products, setProducts, updateProduct } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Edit State
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => String(p.id)));
    }
  };

  const toggleSelect = (id: string | number) => {
    const stringId = String(id);
    if (selectedProducts.includes(stringId)) {
      setSelectedProducts(selectedProducts.filter(pId => pId !== stringId));
    } else {
      setSelectedProducts([...selectedProducts, stringId]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to move ${selectedProducts.length} products to trash?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(String(p.id))));
      setSelectedProducts([]);
      alert('Products moved to trash successfully.');
    }
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Are you sure you want to move this product to trash?')) {
      setProducts(products.filter(p => String(p.id) !== String(id)));
    }
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      if (editingProduct.id === '') {
        // Add new
        const newProduct = { ...editingProduct, id: Math.floor(Math.random() * 1000).toString() };
        setProducts([...products, newProduct]);
      } else {
        // Update existing
        updateProduct(editingProduct.id, editingProduct);
      }
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your jewelry inventory, categories, and pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsBulkUploadOpen(true)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Bulk Upload
          </button>
          <button 
            onClick={() => setEditingProduct({ id: '', name: '', category: 'Rings', weightInGrams: 0, stock: 0, status: 'Active', isBestSeller: false, description: { inspiration: '', design: '' } })}
            className="px-4 py-2 bg-[#0B5E64] text-white text-sm font-medium rounded-lg hover:bg-[#084A4F] transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Toolbar / Actions */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none hidden sm:block">
            <option>All Categories</option>
            <option>Rings</option>
            <option>Necklace</option>
            <option>Bracelet</option>
            <option>Earrings</option>
          </select>
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="text-sm font-medium text-gray-700">{selectedProducts.length} selected</span>
            <button 
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium rounded-lg transition-colors border border-red-200"
            >
              Bulk Delete
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 w-4">
                  <input 
                    type="checkbox" 
                    checked={selectedProducts.length === products.length && products.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#0B5E64] bg-gray-100 border-gray-300 rounded focus:ring-[#0B5E64]"
                  />
                </th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Weight (g)</th>
                <th className="px-6 py-4">Final Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${selectedProducts.includes(String(product.id)) ? 'bg-gray-50/50' : ''}`}>
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(String(product.id))}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 text-[#0B5E64] bg-gray-100 border-gray-300 rounded focus:ring-[#0B5E64]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded object-cover flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-gray-500 text-xs">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-gray-600">{product.weightInGrams}g</td>
                  <td className="px-6 py-4 font-medium text-[#0B5E64]">{calculatePrice(product.weightInGrams)}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>{product.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="text-[#0B5E64] hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-gray-400 hover:text-red-600 font-medium transition-colors"
                    >
                      Trash
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No products found. Add a new product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Upload Modal */}
      {isBulkUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Bulk Upload Products</h3>
              <button onClick={() => setIsBulkUploadOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 className="font-semibold text-gray-900">Upload CSV or Excel</h4>
              <p className="text-sm text-gray-500">Drag and drop your file here, or click to browse.</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-[#0B5E64]/30 rounded-lg flex flex-col items-center justify-center text-[#0B5E64] bg-[#0B5E64]/5 cursor-pointer hover:bg-[#0B5E64]/10 transition-colors mt-4"
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-[#0B5E64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-sm text-gray-900">{selectedFile.name}</span>
                  </div>
                ) : (
                  <span className="font-medium">Browse Files</span>
                )}
              </div>
              <div className="text-xs text-left text-gray-500 pt-4">
                <a 
                  href="data:text/csv;charset=utf-8,id,name,category,weightInGrams,stock,status%0APRD-NEW,Sample%20Silver%20Ring,Rings,5.5,10,Active" 
                  download="elara_products_template.csv" 
                  className="text-[#0B5E64] hover:underline"
                >
                  Download Sample CSV template
                </a>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setIsBulkUploadOpen(false);
                  setSelectedFile(null);
                }} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (selectedFile) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      try {
                        const text = e.target?.result as string;
                        const lines = text.split('\n').filter(line => line.trim() !== '');
                        
                        // Skip header row (index 0)
                        const newProducts = lines.slice(1).map(line => {
                          const [id, name, category, weightInGrams, stock, status] = line.split(',');
                          return {
                            id: `PRD-${Math.random().toString(36).substr(2, 5)}`.toUpperCase(),
                            name: name?.trim() || 'Unknown Product',
                            category: category?.trim() || 'Uncategorized',
                            weightInGrams: parseFloat(weightInGrams) || 0,
                            stock: parseInt(stock) || 0,
                            status: status?.trim() || 'Draft'
                          };
                        });
                        
                        if (newProducts.length > 0) {
                          setProducts([...products, ...newProducts]);
                          alert(`Successfully imported ${newProducts.length} products!`);
                        } else {
                          alert('No valid products found in the file.');
                        }
                      } catch (err) {
                        alert('Error parsing file. Please check the format.');
                      }
                      
                      setIsBulkUploadOpen(false);
                      setSelectedFile(null);
                    };
                    reader.readAsText(selectedFile);
                  } else {
                    alert('Please select a file first.');
                  }
                }} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#0B5E64] rounded-lg hover:bg-[#084A4F] transition-colors"
              >
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
              <h3 className="text-lg font-bold text-gray-900">{editingProduct.id === '' ? 'Add New Product' : 'Edit Product'}</h3>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    value={editingProduct ? editingProduct.name : ''}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none" 
                    placeholder="e.g. Signature Silver Ring" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={editingProduct ? editingProduct.category : 'Rings'}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
                  >
                    <option>Rings</option>
                    <option>Necklace</option>
                    <option>Bracelet</option>
                    <option>Earrings</option>
                    <option>Chains</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (in Grams)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.1"
                      value={editingProduct ? editingProduct.weightInGrams : ''}
                      onChange={(e) => editingProduct && setEditingProduct({...editingProduct, weightInGrams: parseFloat(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none" 
                      placeholder="e.g. 5.5" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">g</span>
                  </div>
                  {editingProduct && (
                    <p className="text-xs text-[#0B5E64] mt-1 font-medium">
                      Calculated Price: {calculatePrice(editingProduct.weightInGrams)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={editingProduct ? editingProduct.stock : ''}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none" 
                    placeholder="0" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={editingProduct ? editingProduct.status : 'Active'}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
                  >
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={editingProduct?.image || ''}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, image: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none" 
                    placeholder="e.g. /images/hero1.png or https://..." 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={editingProduct ? editingProduct.isBestSeller : false}
                      onChange={(e) => editingProduct && setEditingProduct({...editingProduct, isBestSeller: e.target.checked})}
                      className="w-4 h-4 text-[#0B5E64] rounded border-gray-300 focus:ring-[#0B5E64]"
                    />
                    <span className="text-sm font-medium text-gray-700">Mark as Best Seller</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inspiration (Description Preview)</label>
                  <textarea 
                    value={editingProduct?.description?.inspiration || ''}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, description: { ...editingProduct.description, inspiration: e.target.value }})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
                    placeholder="Brief preview of the inspiration..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">The Design (Full Description)</label>
                  <textarea 
                    value={editingProduct?.description?.design || ''}
                    onChange={(e) => editingProduct && setEditingProduct({...editingProduct, description: { ...editingProduct.description, design: e.target.value }})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
                    placeholder="Detailed description of the design..."
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0">
              <button 
                onClick={() => {
                  setEditingProduct(null);
                }} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProduct} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#0B5E64] rounded-lg hover:bg-[#084A4F] transition-colors"
              >
                {editingProduct.id === '' ? 'Save Product' : 'Update Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
