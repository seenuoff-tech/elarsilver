'use client';

import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { StorySection } from '../data/products';

interface ProductTextOverlaysProps {
  storySections: StorySection[];
}

export default function ProductTextOverlays({ storySections }: ProductTextOverlaysProps) {
  const { scrollYProgress } = useScroll();

  // Define scroll ranges for each of the 4 sections
  // Section 1: Active around 0.1
  const opacity1 = useTransform(scrollYProgress, [0.03, 0.1, 0.17, 0.24], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.03, 0.1, 0.17, 0.24], [100, 0, 0, -100]);

  // Section 2: Active around 0.3
  const opacity2 = useTransform(scrollYProgress, [0.24, 0.32, 0.4, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.24, 0.32, 0.4, 0.48], [100, 0, 0, -100]);

  // Section 3: Active around 0.6
  const opacity3 = useTransform(scrollYProgress, [0.48, 0.58, 0.66, 0.74], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.58, 0.66, 0.74], [100, 0, 0, -100]);

  // Section 4: Active around 0.85
  const opacity4 = useTransform(scrollYProgress, [0.74, 0.82, 0.89, 0.95], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.74, 0.82, 0.89, 0.95], [100, 0, 0, -100]);

  const transforms = [
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
    { opacity: opacity4, y: y4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {storySections.map((section, idx) => {
        const { opacity, y } = transforms[idx] || { opacity: 0, y: 0 };
        return (
          <div
            key={idx}
            className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12"
          >
            <motion.div
              style={{ opacity, y }}
              className="max-w-4xl w-full text-center flex flex-col items-center justify-center gap-6"
            >
              <span className="text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-silver-chrome">
                {section.subtitle}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-none bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
                {section.title}
              </h2>
              <div className="w-12 h-[1px] bg-silver-chrome/50 my-2" />
              <p className="text-black/60 text-sm md:text-base lg:text-lg max-w-2xl font-light leading-relaxed">
                {section.description}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
