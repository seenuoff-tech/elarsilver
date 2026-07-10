'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { shopProducts, ShopProduct } from '../../data/shopProducts';
import { useCart } from '../../context/CartContext';
import ProductCard3D from '../../components/ProductCard3D';
import ThreeRing from '../../components/ThreeRing';
import LuxuryButton from '../../components/luxury/LuxuryButton';

export default function ShopPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<ShopProduct | null>(null);
  const { triggerPackagingAnimation } = useCart();
  const [modalSize, setModalSize] = useState('US 7');

  // Group products by collection
  const collections: string[] = [];
  const flagshipProducts: ShopProduct[] = [];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleModalAddToCart = () => {
    if (!quickViewProduct) return;
    const prod = quickViewProduct;
    setQuickViewProduct(null); // Close modal
    triggerPackagingAnimation(prod, modalSize);
  };

  return (
    <div className="bg-[#ffffff] text-black selection:bg-[#ffffff]/20 min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-silver-chrome/5 blur-[150px] pointer-events-none" />

      {/* Showroom Header */}
      <section className="relative py-12 px-6 md:px-12 max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
          Digital Showroom
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">
          The 3D Gallery
        </h1>
        <p className="text-black/50 font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Hover over cards to activate high-fidelity lighting reflections. Select items for an interactive 360-degree rotation view.
        </p>
      </section>

      {/* 3D Showcase Horizontal Scroll Section */}
      <section className="relative py-12 border-y border-black/5 bg-neutral-50/20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px)] bg-[size:60px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6 flex justify-between items-end">
          <div>
            <span className="text-[10px] tracking-widest text-silver-chrome font-mono uppercase block mb-1">
              Curated Masterpieces
            </span>
            <h2 className="text-2xl font-bold tracking-wider uppercase text-black">
              Flagship Collection
            </h2>
          </div>
          <span className="text-[10px] tracking-widest text-black/40 uppercase hidden md:block">
            Swipe or Scroll Horizontally →
          </span>
        </div>

        {/* Horizontal Card Track */}
        <div className="flex gap-8 overflow-x-auto pb-10 pt-4 scrollbar-none snap-x snap-mandatory px-6 md:px-12 max-w-full">
          {flagshipProducts.map((product) => (
            <div key={product.id} className="snap-center shrink-0 w-[290px] md:w-[320px]">
              <ProductCard3D
                product={product}
                onQuickView={(p) => {
                  setQuickViewProduct(p);
                  setModalSize(p.sizes[0] || 'US 7');
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Grid Collections */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-28">
        {collections.map((colName) => {
          const colProducts = shopProducts.filter((p) => p.collection === colName);
          return (
            <div key={colName} className="space-y-10">
              <div className="border-b border-black/10 pb-4">
                <span className="text-[9px] tracking-widest text-silver-chrome font-mono uppercase block mb-1">
                  Collection Range
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-black">
                  {colName}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {colProducts.map((product) => (
                  <ProductCard3D
                    key={product.id}
                    product={product}
                    onQuickView={(p) => {
                      setQuickViewProduct(p);
                      setModalSize(p.sizes[0] || 'US 7');
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#ffffff]/95 backdrop-blur-xl p-4 md:p-8"
          >
            {/* Close Button */}
            <LuxuryButton isCTA={false}>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 md:top-8 md:right-12 text-black/50 hover:text-black text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer z-55"
              >
                <span>Close</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </LuxuryButton>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-6xl h-[85vh] lg:h-[75vh] border border-black/10 bg-neutral-50/40 backdrop-blur-md grid grid-cols-1 lg:grid-cols-2 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-y-auto lg:overflow-hidden relative"
            >
              <div className="absolute inset-0 border border-black/5 m-2 pointer-events-none" />

              {/* Left Side: Orbit 360 Viewer */}
              <div className="relative h-[40vh] lg:h-full border-b lg:border-b-0 lg:border-r border-black/10 flex items-center justify-center bg-[#ffffff]/60">
                {mounted ? (
                  <Suspense fallback={
                    <div className="w-12 h-12 border border-black/20 border-t-white animate-spin rounded-full" />
                  }>
                    <Canvas
                      camera={{ position: [0, 0, 3.8], fov: 45 }}
                      gl={{ antialias: true }}
                      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                    >
                      <OrbitControls
                        enableZoom={false}
                        autoRotate={!selectedProduct}
                        autoRotateSpeed={1.8}
                      />
                      <ThreeRing
                        geometryConfig={quickViewProduct.ringGeometry}
                        isHovered={true}
                        colorTheme={quickViewProduct.colorTheme}
                      />
                    </Canvas>
                  </Suspense>
                ) : null}

                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[9px] tracking-widest uppercase text-black/35 font-mono pointer-events-none">
                  <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1" />
                  </svg>
                  <span>Drag to rotate 360°</span>
                </div>
              </div>

              {/* Right Side: Details & Size Form */}
              <div className="p-8 md:p-12 flex flex-col justify-between h-[45vh] lg:h-full overflow-y-auto space-y-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] tracking-widest font-mono uppercase text-silver-chrome">
                    <span>{quickViewProduct.collection}</span>
                    <span className="bg-white/5 border border-black/10 px-2 py-0.5">
                      {quickViewProduct.hallmark}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">
                      {quickViewProduct.name}
                    </h2>
                    <p className="text-black/50 text-sm font-light leading-relaxed">
                      {quickViewProduct.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-3xl font-extrabold tracking-wide text-black">
                      {quickViewProduct.price}
                    </span>
                    <span className="text-xs text-black/40 line-through">₹7,999</span>
                    <span className="text-[9px] tracking-wider text-green-400 font-semibold uppercase px-2 py-0.5 border border-green-500/20 bg-green-500/5">
                      Complimentary Gift Packaging Included
                    </span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] tracking-widest uppercase text-black/40 block">
                      Select Boutique Size
                    </span>
                    <div className="flex gap-2.5 flex-wrap">
                      {quickViewProduct.sizes.map((size) => (
                        <LuxuryButton key={size} isCTA={false}>
                          <button
                            onClick={() => setModalSize(size)}
                            className={`px-4 py-2.5 text-xs font-semibold uppercase border rounded-none transition-all duration-300 cursor-pointer ${
                              modalSize === size
                                ? 'bg-white text-black border-black shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                                : 'bg-transparent text-black border-black/20 hover:border-black/50'
                            }`}
                          >
                            {size}
                          </button>
                        </LuxuryButton>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-[10px] text-black/45 tracking-widest uppercase border-t border-black/10 pt-4">
                    {quickViewProduct.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-black/5 pb-2">
                        <span>{spec.label}</span>
                        <span className="text-black font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <LuxuryButton isCTA={true}>
                      <button
                        onClick={handleModalAddToCart}
                        className="w-full py-4 text-xs font-bold tracking-[0.25em] uppercase bg-white text-black border border-black hover:bg-transparent hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] cursor-pointer"
                      >
                        Secure Checkout — Add To Bag
                      </button>
                    </LuxuryButton>
                    <p className="text-[9px] text-black/40 text-center uppercase tracking-widest font-light">
                      Safe checkout. Rhodium polished tarnish-resistant sterling silver.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
