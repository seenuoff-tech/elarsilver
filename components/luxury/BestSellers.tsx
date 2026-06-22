'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeRing from '../ThreeRing';
import { shopProducts, ShopProduct } from '../../data/shopProducts';
import Magnetic from './Magnetic';

interface FloatingCardProps {
  product: ShopProduct;
  isActive: boolean;
}

function FloatingCard({ product, isActive }: FloatingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={isActive ? {
        y: -10,
        borderColor: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.8)"
      } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex flex-col border p-8 relative overflow-hidden group select-none min-h-[480px] rounded-none shadow-[0_15px_30px_rgba(0,0,0,0.6)] transition-all duration-500 ${
        isActive 
          ? 'bg-neutral-50/45 border-black/10' 
          : 'bg-neutral-50/20 border-black/5 opacity-55'
      }`}
    >
      {/* Sparkles on hover */}
      {isHovered && isActive && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[0, 90, 180, 270].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const xTarget = Math.cos(rad) * 90;
            const yTarget = Math.sin(rad) * 90 - 40;
            return (
              <motion.div
                key={idx}
                initial={{ x: 0, y: -40, opacity: 1, scale: 0.1 }}
                animate={{ x: xTarget, y: yTarget, opacity: 0, scale: 1.0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute left-[47%] top-[35%]"
              >
                <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 5L63 38L96 50L63 62L50 95L37 62L4 50L37 38L50 5Z" />
                </svg>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Decorative Pedestal Stand Base */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-44 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" />
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-900/40 border border-black/5 border-b-0 group-hover:border-black/20 transition-all duration-500 rounded-t-sm" />

      {/* Product Image Preview */}
      <div className="h-[220px] w-full relative z-10 flex items-center justify-center">
        <div className={`w-full h-full flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}`}>
          {/* Defaulting to the new blue ring image provided by the user */}
          <img 
            src="/images/blue-ring.png" 
            alt={product.name} 
            className="max-h-[180px] w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 flex-grow flex flex-col justify-between relative z-10">
        <div className="space-y-2 text-center">
          <span className="text-[8px] font-mono tracking-widest text-silver-chrome uppercase block">
            {product.collection}
          </span>
          <h3 className="text-lg font-bold tracking-widest uppercase text-black group-hover:text-silver-chrome transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-black/40 text-[11px] font-light leading-relaxed max-w-[240px] mx-auto">
            {product.tagline}
          </p>
        </div>

        <div className="pt-6 border-t border-black/5 flex items-center justify-between mt-6">
          <span className="text-lg font-black tracking-wide text-black">{product.price}</span>
          <Magnetic isCTA={true}>
            <button
              onClick={() => alert(`Redirecting to secure shop page for: ${product.name}`)}
              disabled={!isActive}
              className={`text-[9px] font-bold tracking-widest uppercase px-4 py-2 border transition-all duration-500 cursor-pointer ${
                isActive 
                  ? 'text-black bg-white border-black hover:bg-transparent hover:text-black' 
                  : 'text-black/20 bg-transparent border-black/5 cursor-not-allowed'
              }`}
            >
              Inspect Piece
            </button>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestSellers() {
  const sellers = [shopProducts[0], shopProducts[1], shopProducts[5]]; // Signature, Eternal Loop, Halo Solitaire
  const [activeIndex, setActiveIndex] = useState(1); // Start on middle card (Eternal Loop)
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sellers.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [autoplay]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sellers.length) % sellers.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sellers.length);
  };

  const getCardStyle = (idx: number) => {
    const diff = idx - activeIndex;
    
    // Adjust wrap-around indices for 3 elements
    let offset = diff;
    if (diff === 2) offset = -1;
    if (diff === -2) offset = 1;

    if (offset === 0) {
      return {
        x: 0,
        scale: 1.0,
        opacity: 1.0,
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    }

    if (isMobile) {
      // Hide side cards on mobile screen to prevent layout breaking
      return {
        x: offset * 140,
        scale: 0.8,
        opacity: 0.0,
        zIndex: 10,
        pointerEvents: 'none' as const,
      };
    }

    // Desktop placement
    return {
      x: offset * 340,
      scale: 0.82,
      opacity: 0.35,
      zIndex: 20,
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section className="relative bg-[#ffffff] py-28 px-6 md:px-12 border-t border-black/5 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-radial from-white/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
            Atelier Curations
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase">
            Best Sellers Showcase
          </h2>
          <p className="text-black/45 font-light text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            The collection of pieces chosen most frequently by our global collectors. Hover to activate diamond sparkle sweeps.
          </p>
        </div>

        {/* 3D Animated Coverflow Carousel Track */}
        <div className="relative w-full max-w-5xl mx-auto h-[530px] flex items-center justify-center overflow-hidden py-4">
          {sellers.map((product, idx) => (
            <motion.div
              key={product.id}
              animate={getCardStyle(idx)}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="absolute w-[290px] md:w-[325px]"
            >
              <FloatingCard product={product} isActive={idx === activeIndex} />
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex justify-center items-center gap-8 pt-4">
          <Magnetic>
            <button
              onClick={() => {
                setAutoplay(false);
                handlePrev();
              }}
              className="w-12 h-12 rounded-full border border-black/10 bg-neutral-900/40 hover:border-black hover:bg-white hover:text-black text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </Magnetic>
          
          {/* Indicators */}
          <div className="flex gap-2.5">
            {sellers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoplay(false);
                  setActiveIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  activeIndex === idx ? 'bg-white w-6 shadow-[0_0_6px_#FFF]' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <Magnetic>
            <button
              onClick={() => {
                setAutoplay(false);
                handleNext();
              }}
              className="w-12 h-12 rounded-full border border-black/10 bg-neutral-900/40 hover:border-black hover:bg-white hover:text-black text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Magnetic>
        </div>

      </div>
    </section>
  );
}
