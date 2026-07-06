import React from 'react';
import Link from 'next/link';

export default function HotRightNowBanner() {
  return (
    <section className="relative w-full my-12 z-10">
      <div 
        className="relative w-full overflow-hidden bg-[#0B5E64] shadow-2xl flex flex-col md:flex-row items-center min-h-[350px] md:min-h-[450px]"
      >
        {/* Left Side: The Image */}
        <div 
          className="absolute inset-0 w-full h-full md:w-3/5 bg-no-repeat bg-cover bg-left md:bg-center"
          style={{ backgroundImage: `url('/images/hot_right_now_banner.png')` }}
        />
        
        {/* Gradient Overlay for smooth transition to the text side on mobile/desktop */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0B5E64]/80 to-[#0B5E64] pointer-events-none w-full md:w-full" />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center md:items-end justify-center w-full h-full p-8 md:pr-24 text-center md:text-right ml-auto mt-40 md:mt-0">
          <h2 className="text-white drop-shadow-md flex flex-col items-center md:items-end">
            <span className="font-serif italic text-6xl md:text-8xl tracking-tight mb-2 text-[#faedd6]">
              Trending
            </span>
            <span className="font-sans text-2xl md:text-4xl font-semibold tracking-[0.3em] uppercase text-white/90">
              Now
            </span>
          </h2>
          
          <Link href="/shop?collection=hot" className="mt-8 group">
            <div className="bg-[#fcebb0] border-2 border-[#faecd2] text-[#0B5E64] px-8 py-3 rounded-full shadow-lg font-bold tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Shop Now
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
