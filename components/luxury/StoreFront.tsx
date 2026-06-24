'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function StoreFront() {
  return (
    <section className="relative bg-gray-50 py-24 px-6 md:px-12 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Heading & Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
            The Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-none text-[#0B5E64]">
            Elara Silver Shop
          </h2>
          <div className="w-16 h-[2px] bg-[#0B5E64]/20" />
          <p className="text-neutral-600 font-light text-base md:text-lg leading-relaxed">
            Step into the world of ELARA SILVER. Our flagship boutique is designed to be an immersive gallery of luminous artistry. Experience the weight, the brilliance, and the unparalleled craftsmanship of our collections in person.
          </p>
          <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed">
            Discover exclusive in-store collections and enjoy personalized styling consultations with our dedicated artisans.
          </p>
          
          {/* Added Features/Content */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B5E64]/10 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#0B5E64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium text-neutral-700 uppercase tracking-wide">Custom Engraving</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B5E64]/10 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#0B5E64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium text-neutral-700 uppercase tracking-wide">Jewellery Spa</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B5E64]/10 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#0B5E64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium text-neutral-700 uppercase tracking-wide">Expert Styling</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0B5E64]/10 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#0B5E64]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium text-neutral-700 uppercase tracking-wide">In-store Exclusives</span>
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-6 flex items-center gap-4">
            <button className="px-8 py-3.5 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-black transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
              Get Directions
            </button>
            <button className="px-8 py-3.5 bg-transparent border border-[#0B5E64] text-[#0B5E64] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#0B5E64] hover:text-white transition-all duration-300">
              Book Visit
            </button>
          </div>
        </motion.div>

        {/* Right Side: Store Front Image */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/store-front.jpg"
            alt="Elara Silver Store Front"
            width={1200}
            height={800}
            className="w-full h-auto object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

      </div>
    </section>
  );
}
