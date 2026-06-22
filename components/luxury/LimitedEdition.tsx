'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeRing from '../ThreeRing';
import { shopProducts } from '../../data/shopProducts';
import Magnetic from './Magnetic';

export default function LimitedEdition() {
  const product = shopProducts[9]; // Nebula Eclipse (Black Ruthenium)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 8, minutes: 42, seconds: 15 });
  const [reserved, setReserved] = useState(false);

  // Set target date to 3 days from now on initial mount so countdown is always ticking
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 8);

    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-neutral-50 py-32 px-6 md:px-12 border-t border-black/5 overflow-hidden">
      {/* Absolute glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-white/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Glassmorphic Panel Container */}
        <div className="backdrop-blur-xl border border-black/10 bg-[#ffffff]/40 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative overflow-hidden group">
          {/* Silver diagonal reflection sweep */}
          <div className="absolute inset-0 border border-black/5 m-3 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          {/* Left Side: 3D Black Ring Canvas */}
          <div className="relative h-[320px] md:h-[450px] border border-black/5 bg-[#ffffff]/60 flex items-center justify-center">
            <div className="absolute inset-0 border border-black/5 m-1 pointer-events-none" />
            <div className="absolute top-4 left-6 border border-red-500/20 bg-red-500/5 text-red-400 text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 z-20">
              Rare drop: 100 Pieces only
            </div>

            <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
              <ambientLight intensity={0.3} />
              <ThreeRing
                geometryConfig={product.ringGeometry}
                isHovered={true}
                colorTheme={product.colorTheme}
              />
            </Canvas>

            <div className="absolute bottom-6 left-6 flex items-center gap-1.5 text-[8px] tracking-widest uppercase text-black/30 font-mono pointer-events-none">
              <span>Ruthenium Plating & Black Diamond Solitaire</span>
            </div>
          </div>

          {/* Right Side: Information & Timer */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
                  Limited Edition
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-none">
                  {product.name}
                </h2>
                <p className="text-black/40 font-light text-xs md:text-sm leading-relaxed">
                  Forged in black ruthenium-plated silver, centered with a single 0.5-carat black diamond solitaire. Every unit features a custom laser-engraved edition serial number (01 to 100).
                </p>
              </div>

              {/* Luxury Countdown Timer */}
              <div className="grid grid-cols-4 gap-4 max-w-sm">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HRS", val: timeLeft.hours },
                  { label: "MINS", val: timeLeft.minutes },
                  { label: "SECS", val: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="border border-black/5 bg-[#ffffff]/40 p-4 text-center">
                    <span className="text-xl md:text-3xl font-black font-mono tracking-tight text-black block">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[7px] md:text-[8px] tracking-widest text-black/40 uppercase font-mono">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* VIP Registry Form */}
            <div className="border-t border-black/5 pt-8">
              {reserved ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 border border-silver-chrome/20 bg-neutral-900/40 text-center space-y-2"
                >
                  <h4 className="text-xs font-bold tracking-widest uppercase text-silver-chrome">
                    Private Allocation Secured
                  </h4>
                  <p className="text-[10px] text-black/50 leading-relaxed uppercase">
                    Your registry spot is confirmed. A concierge manager will contact you within 2 hours.
                  </p>
                </motion.div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReserved(true);
                  }}
                  className="space-y-4"
                >
                  <span className="text-[10px] tracking-widest uppercase text-black/40 block">
                    Bespoke VIP Registry Allocation
                  </span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="ENTER PRIVATE EMAIL"
                      className="flex-grow bg-[#ffffff]/80 border border-black/10 text-black placeholder-white/20 text-xs px-4 py-3.5 focus:outline-none focus:border-black tracking-widest uppercase transition-colors rounded-none"
                    />
                    <Magnetic isCTA={true}>
                      <button
                        type="submit"
                        className="bg-white text-black font-bold text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-silver-chrome hover:text-black transition-all duration-300 rounded-none cursor-pointer border border-black"
                      >
                        Reserve Spot
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
