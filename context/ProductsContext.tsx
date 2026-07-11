'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { newArrivalsData, DetailedProduct } from '../data/newArrivals';

// Extend DetailedProduct to include Admin fields
export interface AppProduct extends DetailedProduct {
  weightInGrams: number;
  stock: number;
  status: string;
  category: string;
  tagline?: string;
  hallmark?: string;
  sizes?: string[];
  specs?: any[];
  details?: string[];
  colorTheme?: string;
  ringGeometry?: any;
  price?: string;
}

interface ProductsContextType {
  products: AppProduct[];
  setProducts: React.Dispatch<React.SetStateAction<AppProduct[]>>;
  updateProduct: (id: string | number, updates: Partial<AppProduct>) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

import { mensProducts } from '../data/mensProducts';

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const allStaticProducts: AppProduct[] = [];

    const saved = localStorage.getItem('elara_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
        setIsLoaded(true);
        return;
      } catch (e) {
        console.error('Failed to parse saved products');
      }
    }

    setProducts(allStaticProducts);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('elara_products', JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const updateProduct = (id: string | number, updates: Partial<AppProduct>) => {
    setProducts(prev => prev.map(p => String(p.id) === String(id) ? { ...p, ...updates } : p));
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
