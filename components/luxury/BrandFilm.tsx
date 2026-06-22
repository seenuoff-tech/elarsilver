'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LuxuryButton from './LuxuryButton';

const filmSteps = [
  { subtitle: "01 / ORIGIN", title: "RAW SILVER", desc: "Sourced from high-grade geological veins, pure silver waits to be forged." },
  { subtitle: "02 / ATELIER HEAT", title: "MOLTEN LIQUID", desc: "Subjected to 961.8°C to break boundaries, transforming metal into kinetic energy." },
  { subtitle: "03 / THE CRAFT", title: "MASTER ASSEMBLY", desc: "Generations of silversmithing wisdom wire-drawing curves and structural halos." },
  { subtitle: "04 / FIRE & REFRACTION", title: "STONE SETTING", desc: "Hand-embedding micro-pave and solitaire diamonds for absolute light return." },
  { subtitle: "05 / PERMANENCE", title: "THE ELARA PIECE", desc: "A symphony of mirror chrome luster and starlight spark. Forged to endure." }
];

export default function BrandFilm() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % filmSteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#ffffff] overflow-hidden flex items-center justify-center border-t border-black/5">
      {/* Cinematic Looping Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 filter grayscale pointer-events-none"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-liquifying-yellow-gold-in-a-pot-41662-large.mp4" type="video/mp4" />
      </video>

      {/* Volumetric Dark Shadow Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black pointer-events-none z-10" />

      {/* Editorial Content Slide */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-8 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <span className="text-[10px] md:text-xs font-mono tracking-[0.5em] text-silver-chrome uppercase block">
              {filmSteps[activeStep].subtitle}
            </span>
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-black uppercase text-stroke-silver">
              {filmSteps[activeStep].title}
            </h2>
            <p className="text-black/60 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              {filmSteps[activeStep].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Film Progress Indicators */}
        <div className="flex justify-center gap-6 pt-12">
          {filmSteps.map((_, idx) => (
            <LuxuryButton key={idx} isCTA={false} magneticRange={40} magneticStrength={0.25}>
              <button
                onClick={() => setActiveStep(idx)}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className={`w-12 h-[2px] transition-all duration-700 ${
                  activeStep === idx ? 'bg-white shadow-[0_0_8px_#FFF]' : 'bg-white/10 group-hover:bg-white/40'
                }`} />
                <span className={`text-[8px] font-mono tracking-widest transition-colors ${
                  activeStep === idx ? 'text-black' : 'text-black/20'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            </LuxuryButton>
          ))}
        </div>
      </div>
    </section>
  );
}
