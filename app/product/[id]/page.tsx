import React from 'react';
import ProductClient from './ProductClient';
import { newArrivalsData } from '../../../data/newArrivals';
import { shopProducts } from '../../../data/shopProducts';
import { mensProducts } from '../../../data/mensProducts';

export function generateStaticParams() {
  const newArrivalsIds = newArrivalsData.map(p => ({ id: p.id.toString() }));
  const mensIds = mensProducts.map(p => ({ id: p.id.toString() }));
  const shopIds = shopProducts.map(p => ({ id: p.id.toString() }));
  
  return [...newArrivalsIds, ...mensIds, ...shopIds];
}

export default function Page() {
  return <ProductClient />;
}
