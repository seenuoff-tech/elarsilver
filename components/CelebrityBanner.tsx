import React from 'react';
import Link from 'next/link';

export default function CelebrityBanner() {
  return (
    <section className="w-full relative z-10 my-8">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        <div 
          className="relative w-full overflow-hidden rounded-[1rem] shadow-sm flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] bg-no-repeat bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/celebrity_banner_v4.png')`,
            backgroundColor: '#0B5E64' // Fallback color matching the teal
          }}
        >
          {/* Overlay to ensure text readability on mobile if image crops weirdly */}
          <div className="absolute inset-0 bg-[#0B5E64]/40 md:bg-transparent pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md mx-auto mt-40 md:mt-0">
            <h2 className="text-white font-black text-3xl md:text-[2.75rem] leading-[1.1] tracking-wide uppercase mb-3 drop-shadow-sm">
              ADITYA ROY<br/>KAPUR
            </h2>
            <p className="text-white/90 font-semibold text-xl md:text-2xl tracking-wide mb-6 drop-shadow-sm">
              Limited Picks
            </p>
            
            <Link href="/shop?collection=limited" className="group">
              <div className="bg-[#faecd2] text-[#0B5E64] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 shadow-md border border-[#f3ddb6]">
                Explore More
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
