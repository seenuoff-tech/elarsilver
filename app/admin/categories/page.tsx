'use client';

import React, { useState } from 'react';

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([
    { id: 'CAT-001', name: 'Rings', description: 'Handcrafted silver rings', status: 'Active', productsCount: 45 },
    { id: 'CAT-002', name: 'Necklaces', description: 'Elegant silver necklaces', status: 'Active', productsCount: 32 },
    { id: 'CAT-003', name: 'Bracelets', description: 'Minimalist cuffs and chains', status: 'Active', productsCount: 18 },
    { id: 'CAT-004', name: 'Earrings', description: 'Timeless drops and studs', status: 'Active', productsCount: 24 },
    { id: 'CAT-005', name: 'Men\'s Category', description: 'Silver accessories for men', status: 'Draft', productsCount: 0 },
  ]);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      if (editingCategory.id === '') {
        const newCategory = { ...editingCategory, id: `CAT-${Math.random().toString(36).substr(2, 5)}`.toUpperCase() };
        setCategories([...categories, newCategory]);
      } else {
        setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
      }
      setEditingCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Organize your products into categories and collections.</p>
        </div>
        <button 
          onClick={() => setEditingCategory({ id: '', name: '', description: '', status: 'Active', productsCount: 0 })}
          className="px-4 py-2 bg-[#0B5E64] text-white text-sm font-medium rounded-lg hover:bg-[#084A4F] transition-colors"
        >
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-gray-500">{category.description}</td>
                  <td className="px-6 py-4 text-gray-600">{category.productsCount} items</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => setEditingCategory(category)}
                      className="text-[#0B5E64] hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">{editingCategory.id === '' ? 'Add New Category' : 'Edit Category'}</h3>
              <button 
                onClick={() => {
                  setEditingCategory(null);
                }} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input 
                  type="text" 
                  value={editingCategory ? editingCategory.name : ''}
                  onChange={(e) => editingCategory && setEditingCategory({...editingCategory, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none" 
                  placeholder="e.g. Minimalist Chains" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea 
                  rows={3} 
                  value={editingCategory ? editingCategory.description : ''}
                  onChange={(e) => editingCategory && setEditingCategory({...editingCategory, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none" 
                  placeholder="Brief description of this category..."
                ></textarea>
              </div>
              {editingCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={editingCategory.status}
                    onChange={(e) => setEditingCategory({...editingCategory, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0B5E64] focus:outline-none"
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setEditingCategory(null);
                }} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveCategory} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#0B5E64] rounded-lg hover:bg-[#084A4F] transition-colors"
              >
                {editingCategory.id === '' ? 'Save Category' : 'Update Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
