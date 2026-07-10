'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { usePricing } from './PricingProvider';

export default function NewArrivals() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { products } = useProducts();
  const { triggerPackagingAnimation } = useCart();
  const { calculatePrice } = usePricing();

  const handleToggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(id);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    const finalPriceStr = product.newPrice ? `₹ ${product.newPrice}` : calculatePrice(product.weightInGrams || 0);
    const numericPrice = parseFloat(finalPriceStr.replace(/[^\d.]/g, ''));
    triggerPackagingAnimation(
      {
        id: product.id.toString(),
        name: product.name,
        price: finalPriceStr,
        image: product.image,
      } as any,
      'Standard'
    );
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-white max-w-7xl mx-auto z-10 relative border-t border-black/5">
      <h2 className="text-2xl md:text-3xl font-medium mb-12 text-left text-black">New arrivals</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative flex flex-col group">
            {/* Best Seller Ribbon */}
            {product.isBestSeller && (
              <div className="absolute top-0 left-0 z-10 overflow-hidden w-[80px] h-[80px]">
                <div className="absolute top-3 -left-7 w-[100px] -rotate-45 bg-[#d4af37] text-black text-[8px] font-bold py-1 text-center shadow-md uppercase tracking-wider">
                  Best Seller
                </div>
              </div>
            )}
            
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="aspect-square w-full relative bg-white flex items-center justify-center p-4 mb-4 rounded-xl border border-transparent hover:border-black/5 transition-colors block">
              <Image 
                src={product.image || '/images/Logoorg.png'} 
                alt={product.name || 'Product'} 
                fill 
                className="object-contain p-4 hover:scale-105 transition-transform duration-500" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              
              {/* Wishlist Button */}
              <button 
                onClick={(e) => handleToggleWishlist(product.id, e)}
                className="absolute top-3 right-3 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                aria-label="Add to wishlist"
              >
                {wishlist.includes(product.id) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                )}
              </button>
            </Link>
            
            {/* Details */}
            <div className="flex flex-col flex-grow px-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                <span className="text-amber-400 text-sm">★</span>
              </div>
              
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-gray-400 line-through font-light">
                  {product.oldPrice ? `₹ ${product.oldPrice}` : ''}
                </span>
                <span className="text-sm font-bold text-black">
                  {product.newPrice ? `₹ ${product.newPrice}` : calculatePrice(product.weightInGrams || 0)}
                </span>
              </div>
              
              <button 
                onClick={(e) => handleAddToCart(product, e)}
                className="w-full mt-auto py-2.5 bg-[#0B5E64] text-white text-xs font-semibold tracking-wide uppercase rounded-md hover:bg-black transition-colors duration-300 shadow-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
