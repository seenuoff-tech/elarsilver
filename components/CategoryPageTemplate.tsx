'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LuxuryButton from './luxury/LuxuryButton';

interface CategoryPageTemplateProps {
  title: string;
  description: string;
  imagePath: string;
}

export default function CategoryPageTemplate({ title, description, imagePath }: CategoryPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={imagePath} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white mb-6 drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto drop-shadow-md"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-light tracking-widest uppercase mb-6 text-black">Curated Collection Coming Soon</h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            We are meticulously crafting the {title} collection to bring you unparalleled elegance and sophisticated design. Check back soon for exclusive pieces that redefine luxury.
          </p>
          
          <Link href="/shop">
            <LuxuryButton isCTA={true}>
              <span className="inline-block py-4 px-12 text-sm font-bold tracking-widest uppercase bg-[#0B5E64] text-white hover:opacity-90 transition-colors duration-500 cursor-pointer">
                Explore All Products
              </span>
            </LuxuryButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

