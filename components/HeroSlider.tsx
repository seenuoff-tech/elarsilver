'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: '/images/silver_necklace.png',
    title: 'The Elegance Collection',
    subtitle: 'Discover our new signature silver necklaces.',
    buttonText: 'Shop Necklaces',
    link: '/shop/necklaces'
  },
  {
    id: 2,
    image: '/images/silver_rings.png',
    title: 'Premium Silver Rings',
    subtitle: 'Handcrafted perfection for every occasion.',
    buttonText: 'Explore Rings',
    link: '/shop/rings'
  },
  {
    id: 3,
    image: '/images/silver_bracelet.png',
    title: 'Luxury Bracelets',
    subtitle: 'Timeless designs that make a statement.',
    buttonText: 'View Collection',
    link: '/shop/bracelets'
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getPosition = (index: number) => {
    if (index === current) return 'center';
    if (index === (current - 1 + slides.length) % slides.length) return 'left';
    if (index === (current + 1) % slides.length) return 'right';
    return 'hidden';
  };

  const variants = {
    center: {
      x: '0%',
      y: '-50%',
      top: '50%',
      scale: 1,
      zIndex: 10,
      opacity: 1,
    },
    left: {
      x: '-85%',
      y: '-50%',
      top: '50%',
      scale: 0.85,
      zIndex: 5,
      opacity: 0.6,
    },
    right: {
      x: '85%',
      y: '-50%',
      top: '50%',
      scale: 0.85,
      zIndex: 5,
      opacity: 0.6,
    },
    hidden: {
      x: '0%',
      y: '-50%',
      top: '50%',
      scale: 0.8,
      zIndex: 0,
      opacity: 0,
    },
  };

  return (
    <div 
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '80vh', backgroundColor: '#ffffff', marginTop: '120px', marginBottom: '40px' }}
    >
      {slides.map((slide, index) => {
        const position = getPosition(index);
        
        return (
          <motion.div
            key={slide.id}
            variants={variants}
            initial="hidden"
            animate={position}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="absolute rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/5"
            style={{ width: '75%', height: '85%', maxWidth: '1200px' }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: position === 'center' ? 0 : 20, opacity: position === 'center' ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-6xl font-light mb-4 tracking-wider drop-shadow-md"
              >
                {slide.title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: position === 'center' ? 0 : 20, opacity: position === 'center' ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg md:text-xl font-light mb-8 max-w-lg drop-shadow-md"
              >
                {slide.subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: position === 'center' ? 0 : 20, opacity: position === 'center' ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link 
                  href={slide.link}
                  className="px-8 py-3 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 text-sm tracking-widest uppercase shadow-lg"
                >
                  {slide.buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute z-30 w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 transition-all hover:scale-105 hover:bg-gray-50"
        style={{ left: '5%', top: '50%', transform: 'translateY(-50%)' }}
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute z-30 w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 transition-all hover:scale-105 hover:bg-gray-50"
        style={{ right: '5%', top: '50%', transform: 'translateY(-50%)' }}
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
}
