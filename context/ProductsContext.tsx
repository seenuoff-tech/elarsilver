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

import { shopProducts } from '../data/shopProducts';
import { mensProducts } from '../data/mensProducts';

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<AppProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Convert shopProducts to AppProduct format
    const shopProductsConverted = shopProducts.map(sp => ({
      id: sp.id,
      name: sp.name,
      image: `/images/${sp.id}.png`, // dummy image fallback
      gallery: [],
      rating: 4.8,
      reviewsCount: 100,
      oldPrice: parseInt(sp.price.replace(/[^0-9]/g, '')) + 1000,
      newPrice: parseInt(sp.price.replace(/[^0-9]/g, '')),
      isBestSeller: false,
      material: '925 Sterling Silver',
      finishes: [],
      description: { inspiration: sp.description, design: '' },
      tagline: sp.tagline,
      weightInGrams: 5,
      stock: 20,
      status: 'Active',
      category: sp.category
    }));

    const baseProducts = [
      ...newArrivalsData, 
      ...mensProducts
    ].map(p => ({
      ...p,
      weightInGrams: Math.floor(Math.random() * 10) + 5,
      stock: Math.floor(Math.random() * 50) + 5,
      status: 'Active',
      category: 'Jewellery'
    } as AppProduct));

    const allStaticProducts = [...baseProducts, ...shopProductsConverted];

    const saved = localStorage.getItem('elara_products');
    let loadedProducts: AppProduct[] = [];
    if (saved) {
      try {
        loadedProducts = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products');
      }
    }

    // Merge static products with loaded products to ensure no product is missing
    const mergedProducts = [...loadedProducts];
    allStaticProducts.forEach(sp => {
      if (!mergedProducts.find(p => String(p.id) === String(sp.id))) {
        mergedProducts.push(sp);
      }
    });

    setProducts(mergedProducts);
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
