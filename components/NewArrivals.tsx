'use client';

import React from 'react';
import Image from 'next/image';

const newArrivalsData = [
  { id: 1, image: '/images/blue-ring.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: false },
  { id: 2, image: '/images/cat_necklaces.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: true },
  { id: 3, image: '/images/silver_bracelet.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: false },
  { id: 4, image: '/images/cat_rings.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: false },
  { id: 5, image: '/images/category_necklace.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: false },
  { id: 6, image: '/images/hero2.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: false },
  { id: 7, image: '/images/silver_necklace.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: false },
  { id: 8, image: '/images/cat_earrings.png', rating: 4.9, oldPrice: 3999, newPrice: 1999, isBestSeller: true },
];

export default function NewArrivals() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white max-w-7xl mx-auto z-10 relative border-t border-black/5">
      <h2 className="text-2xl md:text-3xl font-medium mb-12 text-left text-black">New arrivals</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {newArrivalsData.map((product) => (
          <div key={product.id} className="relative flex flex-col group">
            {/* Best Seller Ribbon */}
            {product.isBestSeller && (
              <div className="absolute top-0 left-0 z-10 overflow-hidden w-[80px] h-[80px]">
                <div className="absolute top-3 -left-7 w-[100px] -rotate-45 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black/80 text-[8px] font-bold py-1 text-center shadow-md uppercase tracking-wider">
                  Best Seller
                </div>
              </div>
            )}
            
            {/* Image Container */}
            <div className="aspect-square w-full relative bg-white flex items-center justify-center p-4 mb-4 rounded-xl border border-transparent hover:border-black/5 transition-colors">
              <Image 
                src={product.image} 
                alt="Product image" 
                fill 
                className="object-contain p-4 hover:scale-105 transition-transform duration-500" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            
            {/* Details */}
            <div className="flex flex-col flex-grow px-1">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                <span className="text-amber-400 text-sm">★</span>
              </div>
              
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-gray-400 line-through font-light">₹ {product.oldPrice}</span>
                <span className="text-sm font-bold text-black">₹ {product.newPrice}</span>
              </div>
              
              <button className="w-full mt-auto py-2.5 bg-[#0B5E64] text-white text-xs font-semibold tracking-wide uppercase rounded-md hover:bg-black transition-colors duration-300 shadow-sm">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
