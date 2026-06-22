'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeRing from '../ThreeRing';
import { shopProducts } from '../../data/shopProducts';
import Magnetic from './Magnetic';

const customizerFinishes = [
  {
    id: 'glossy' as const,
    name: 'Glossy Chrome',
    desc: 'High-polish mirror surface. Captures pin-sharp glares and glides with pristine light reflections. Perfect for formal collections.',
    spec: 'Roughness: 0.05 | Reflectivity: 1.0'
  },
  {
    id: 'matte' as const,
    name: 'Satin Matte',
    desc: 'Sandblasted micro-texture. Disperses reflections into a velvety, satiny sheen. Modern, understated, and tarnish-resisting.',
    spec: 'Roughness: 0.55 | Reflectivity: 0.15'
  },
  {
    id: 'vintage' as const,
    name: 'Vintage Oxidized',
    desc: 'Antique silver gunmetal tone. Recessed curves hold deep dark shadowing while edges reflect a heavy distressed pewter luster.',
    spec: 'Roughness: 0.28 | Reflectivity: 0.65'
  }
];

export default function RingCustomizer() {
  const [finish, setFinish] = useState<'glossy' | 'matte' | 'vintage'>('glossy');
  const product = shopProducts[0]; // Signature ring config

  const activeFinishInfo = customizerFinishes.find((f) => f.id === finish)!;

  return (
    <section className="relative bg-[#ffffff] py-28 px-6 md:px-12 border-t border-black/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-white/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side: 3D Viewport */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] border border-black/10 bg-neutral-50/40 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 border border-black/5 m-2 pointer-events-none" />
          
          <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
            <OrbitControls enableZoom={false} autoRotate={finish === 'glossy'} autoRotateSpeed={1.0} />
            <ThreeRing
              geometryConfig={product.ringGeometry}
              isHovered={true}
              colorTheme={product.colorTheme}
              finish={finish}
            />
          </Canvas>

          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[9px] tracking-widest uppercase text-black/35 font-mono pointer-events-none">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1" />
            </svg>
            <span>Drag to inspect finish 360°</span>
          </div>
        </div>

        {/* Right Side: Bespoke Controls */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
              Bespoke Customizer
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase">
              Select surface finish
            </h2>
            <p className="text-black/40 font-light text-xs md:text-sm">
              Alter the reflection indices of the sterling silver band. Every variant is hand-polished to order in our local atelier.
            </p>
          </div>

          <div className="w-16 h-[1px] bg-white/20" />

          {/* Finish Toggles */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] tracking-widest uppercase text-black/35 block">
              Finish selection
            </span>
            <div className="flex gap-3 flex-wrap">
              {customizerFinishes.map((f) => (
                <Magnetic key={f.id}>
                  <button
                    onClick={() => setFinish(f.id)}
                    className={`px-6 py-3 text-xs tracking-widest font-semibold uppercase transition-all duration-500 rounded-none cursor-pointer border ${
                      finish === f.id
                        ? 'bg-white text-black border-black shadow-[0_0_15px_rgba(255,255,255,0.35)]'
                        : 'bg-transparent text-black border-black/10 hover:border-black/40'
                    }`}
                  >
                    {f.name}
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Specifications Card */}
          <div className="border border-black/5 bg-neutral-50/20 p-6 min-h-[140px] flex flex-col justify-between relative">
            <div className="absolute inset-0 border border-black/5 m-1 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={finish}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-black/70 text-xs md:text-sm font-light leading-relaxed">
                  {activeFinishInfo.desc}
                </p>
                <div className="text-[9px] font-mono tracking-widest text-silver-chrome/60 uppercase">
                  {activeFinishInfo.spec}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-2">
            <Magnetic isCTA={true}>
              <button
                onClick={() => alert(`Bespoke finish request received. Ring variant: ${activeFinishInfo.name}.`)}
                className="bg-transparent text-black border border-black text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] rounded-none cursor-pointer"
              >
                Request Custom Finish
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
