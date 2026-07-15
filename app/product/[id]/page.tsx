import React from 'react';
import ProductClient from './ProductClient';
import { newArrivalsData } from '../../../data/newArrivals';
import { mensProducts } from '../../../data/mensProducts';


export function generateStaticParams() {
  const allProducts = [...newArrivalsData, ...mensProducts];
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function Page() {
  return <ProductClient />;
}
