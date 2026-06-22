'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ShopProduct } from '../data/shopProducts';
import { useCart } from '../context/CartContext';
import ThreeRing from './ThreeRing';
import LuxuryButton from './luxury/LuxuryButton';

interface ProductCard3DProps {
  product: ShopProduct;
  onQuickView: (product: ShopProduct) => void;
}

export default function ProductCard3D({ product, onQuickView }: ProductCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { triggerPackagingAnimation } = useCart();
  const [selectedSize, setSelectedSize] = useState('US 7');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card quick view
    triggerPackagingAnimation(product, selectedSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      className="relative flex flex-col justify-between w-full max-w-sm aspect-[3/4.5] border border-black/10 bg-neutral-50/45 backdrop-blur-md hover:border-black/30 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden p-6"
    >
      {/* Decorative metal shine overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transition-transform duration-1000 transform ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}
      />

      {/* Hallmark Certification Tag */}
      <div className="flex justify-between items-start z-10">
        <span className="text-[9px] tracking-widest text-silver-chrome/60 uppercase font-mono bg-white/5 px-2.5 py-1 border border-black/5">
          {product.hallmark.split(' ')[0]} 925
        </span>
        <span className="text-[9px] tracking-[0.2em] text-black/45 uppercase font-light">
          {product.collection}
        </span>
      </div>

      {/* 3D Interactive WebGL Showroom Canvas */}
      <div className="w-full h-1/2 relative flex items-center justify-center select-none">
        {isMounted ? (
          <Suspense fallback={
            <div className="w-10 h-10 border border-black/20 border-t-white animate-spin rounded-full" />
          }>
            <Canvas
              camera={{ position: [0, 0, 4.2], fov: 50 }}
              gl={{ antialias: true }}
              className="absolute w-full h-full pointer-events-none"
            >
              <ThreeRing
                geometryConfig={product.ringGeometry}
                isHovered={isHovered}
                colorTheme={product.colorTheme}
              />
            </Canvas>
          </Suspense>
        ) : (
          /* SSR Fallback Logo */
          <svg className="w-16 h-16 text-black/10 animate-pulse" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}

        {/* Ambient Ring Glow behind WebGL Canvas */}
        <div
          className={`absolute w-36 h-36 rounded-full blur-3xl -z-10 transition-colors duration-500 pointer-events-none ${
            isHovered ? 'bg-white/10' : 'bg-transparent'
          }`}
        />
      </div>

      {/* Product Content Details */}
      <div className="space-y-4 z-10 pt-4 border-t border-black/5">
        <div className="space-y-1">
          <h4 className="text-lg font-bold tracking-wide uppercase text-black group-hover:text-silver-chrome truncate">
            {product.name}
          </h4>
          <p className="text-xs text-black/50 font-light truncate">{product.tagline}</p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-extrabold tracking-wide text-black">{product.price}</span>
          
          {/* Sizing selection */}
          <div onClick={(e) => e.stopPropagation()} className="relative text-[10px]">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-[#ffffff]/60 border border-black/10 text-black/80 py-1 px-2 focus:outline-none focus:border-black text-[10px] tracking-widest uppercase cursor-pointer"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size} className="bg-[#ffffff] text-black">
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] tracking-[0.2em] font-semibold uppercase">
          <LuxuryButton isCTA={false}>
            <button
              onClick={() => onQuickView(product)}
              className="w-full py-2.5 text-center border border-black/10 hover:border-black text-black/70 hover:text-black transition-all duration-300 bg-neutral-50/20 rounded-none cursor-pointer"
            >
              Quick View
            </button>
          </LuxuryButton>
          <LuxuryButton isCTA={true}>
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 text-center bg-[#0B5E64] text-white border border-[#0B5E64] hover:bg-transparent hover:text-[#0B5E64] transition-all duration-500 hover:shadow-[0_0_10px_rgba(11,94,100,0.3)] rounded-none cursor-pointer"
            >
              Add To Bag
            </button>
          </LuxuryButton>
        </div>
      </div>
    </motion.div>
  );
}

