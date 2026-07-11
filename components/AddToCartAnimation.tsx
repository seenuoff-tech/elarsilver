'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useCart } from '../context/CartContext';
import ThreeRing from './ThreeRing';

export default function AddToCartAnimation() {
  const { activeAnimation, confirmAddToCart } = useCart();
  const [step, setStep] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Web Audio API procedural synthesizer for the boutique packaging chime sound
  const playChime = () => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playTone = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        // High-pitched crystal bell envelope
        gainNode.gain.setValueAtTime(0.08, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      // High-register luxury chime notes: C6 (1046.50 Hz) followed by G6 (1567.98 Hz)
      playTone(1046.50, now, 0.6);
      playTone(1567.98, now + 0.12, 1.0);
    } catch (e) {
      console.warn('Web Audio API chime playback ignored or blocked by browser user gesture policies:', e);
    }
  };

  useEffect(() => {
    if (!activeAnimation) {
      setStep(0);
      return;
    }

    setStep(1); // Step 1: Spotlight Ring lifts

    const timer2 = setTimeout(() => {
      setStep(2); // Step 2: Box slides in and opens
    }, 400);

    const timer3 = setTimeout(() => {
      setStep(3); // Step 3: Ring floats into box
    }, 800);

    const timer4 = setTimeout(() => {
      setStep(4); // Step 4: Box closes, ribbon wraps, tag appears
      playChime(); // Play the synthesized chime sound effect
    }, 1200);

    const timer5 = setTimeout(() => {
      setStep(5); // Step 5: Box shrinks and flies to navbar cart
    }, 1600);

    const timerEnd = setTimeout(() => {
      confirmAddToCart(); // Animation finished, add item
    }, 2000);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timerEnd);
    };
  }, [activeAnimation]);

  if (!activeAnimation) return null;

  const { product, size } = activeAnimation;

  const flyX = windowSize.width * 0.4;
  const flyY = -windowSize.height * 0.42;

  return (
    <div className="fixed inset-0 z-[999] bg-[#ffffff]/95 backdrop-blur-xl flex items-center justify-center overflow-hidden">
      {/* Volumetric luxury radial spotlight backdrop */}
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent opacity-80 pointer-events-none blur-3xl" />

      {/* Main Animation Group */}
      <motion.div
        animate={
          step === 5
            ? { x: flyX, y: flyY, scale: 0.05, opacity: 0 }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{
          duration: step === 5 ? 0.75 : 0.5,
          ease: step === 5 ? [0.4, 0, 0.2, 1] : 'easeInOut',
        }}
        className="relative flex flex-col items-center justify-center w-[500px] h-[500px]"
      >
        {/* STEP 1 & 2 & 3: Floating Interactive Ring */}
        <AnimatePresence>
          {step <= 5 && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.8, rotateX: 0 }}
              animate={
                step === 1
                  ? { y: -60, opacity: 1, scale: 1.5, rotateX: 0 }
                  : step === 2
                  ? { y: -70, opacity: 1, scale: 1.4, rotateX: 0 }
                  : step === 3
                  ? { y: 20, opacity: 1, scale: 0.85, rotateX: 90 }
                  : { y: 20, opacity: 0, scale: 0.85, rotateX: 90 }
              }
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-48 h-48 z-30 relative select-none pointer-events-none"
            >
              <div className="absolute inset-0 bg-radial from-white/15 to-transparent blur-xl rounded-full" />
              
              <img 
                src="/images/hero1.png" 
                alt="Ring" 
                className="w-full h-full object-contain p-2 drop-shadow-2xl" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3 Sparkles */}
        {step === 3 && (
          <div className="absolute inset-0 pointer-events-none z-35">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const xTarget = Math.cos(rad) * 120;
              const yTarget = Math.sin(rad) * 120 + 20;
              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 20, opacity: 1, scale: 0.2 }}
                  animate={{ x: xTarget, y: yTarget, opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                  className="absolute left-[242px] top-[242px]"
                >
                  <svg className="w-4 h-4 text-black" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 5L63 38L96 50L63 62L50 95L37 62L4 50L37 38L50 5Z" />
                  </svg>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* STEPS 2 to 5: Luxury Gift Box Container */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ y: 200, opacity: 0, scale: 0.9 }}
              animate={{ y: 20, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-56 h-56 relative flex items-center justify-center z-20"
            >
              {/* Box Base */}
              <div className="absolute bottom-6 w-44 h-24 bg-[#0B5E64] border border-black/10 shadow-2xl flex items-center justify-center flex-col overflow-hidden">
                <div className="absolute inset-0 border border-black/5 m-1 pointer-events-none" />
                
                {/* Velvet cushion base */}
                <div className="w-36 h-12 bg-neutral-50 border border-black/5 shadow-inner flex items-center justify-center relative mt-6">
                  {/* Cushion Slit */}
                  <div className="w-16 h-2 bg-neutral-900 border border-black rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                </div>
              </div>

              {/* Box Lid */}
              <motion.div
                animate={
                  step === 2 || step === 3
                    ? { y: -64, rotateX: 25, zIndex: 10 }
                    : { y: -8, rotateX: 0, zIndex: 40 }
                }
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute top-10 w-44 h-16 bg-[#0B5E64] border border-black/15 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center justify-center"
              >
                <div className="absolute inset-0 border border-black/5 m-1 pointer-events-none" />
                <div className="flex flex-col items-center gap-1 opacity-85">
                  <svg className="w-4 h-4 text-silver-chrome" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 5L63 38L96 50L63 62L50 95L37 62L4 50L37 38L50 5Z" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                  <span className="text-[7px] tracking-[0.25em] font-semibold text-silver-chrome">
                    ELARA
                  </span>
                </div>
              </motion.div>

              {/* STEP 4 Ribbon Wrap */}
              {step >= 4 && (
                <>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-10 w-4 h-32 bg-gradient-to-r from-silver-chrome/80 via-white to-silver-chrome/80 z-45 origin-top"
                  />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute bottom-16 w-44 h-4 bg-gradient-to-b from-silver-chrome/80 via-white to-silver-chrome/80 z-45 origin-left"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, type: 'spring', delay: 0.4 }}
                    className="absolute bottom-16 w-8 h-8 rounded-full bg-white border border-silver-chrome shadow-[0_0_10px_rgba(255,255,255,0.8)] z-50 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-silver-chrome" />
                  </motion.div>
                </>
              )}

              {/* STEP 4 Gifting Tag */}
              {step >= 4 && (
                <motion.div
                  initial={{ x: -30, opacity: 0, rotate: -5 }}
                  animate={{ x: 60, opacity: 1, rotate: 12 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
                  className="absolute bottom-6 bg-white border border-silver-chrome text-black px-3 py-1.5 shadow-[0_5px_15px_rgba(0,0,0,0.4)] z-50 flex flex-col items-center gap-0.5 origin-left"
                >
                  <span className="text-[6px] tracking-widest font-mono text-neutral-400 uppercase">
                    ELARA BOUTIQUE
                  </span>
                  <span className="text-[8px] tracking-wider font-semibold uppercase text-black">
                    Packed with Elegance
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subtitles */}
      <div className="absolute bottom-16 text-center space-y-2 pointer-events-none z-[1000]">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-silver-chrome"
        >
          {step === 1 && 'Lifting Signature Piece...'}
          {step === 2 && 'Opening Velvet Presentation Box...'}
          {step === 3 && 'Settling into Velvet Cushion...'}
          {step === 4 && 'Wrapping in Silver Ribbon & Bow...'}
          {step === 5 && 'Securing Package into Shopping Bag...'}
        </motion.p>
      </div>
    </div>
  );
}
