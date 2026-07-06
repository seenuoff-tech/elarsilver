import React from 'react';
import Link from 'next/link';

const LuxuryWithinReach = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto my-16 px-4 z-10">
      {/* Banner */}
      <div className="bg-[#0B5E64] rounded-xl py-12 md:py-16 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-wide drop-shadow-sm">
          Everyday Luxury
        </h2>
      </div>

      {/* Floating Buttons */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 w-full px-4 z-20">
        <Link href="/gifts?price=under-999" className="group">
          <div className="bg-gradient-to-br from-[#fdfdfd] to-[#e6e6e6] border-[1.5px] border-[#d1d1d1] text-[#333333] px-8 py-3 rounded-full shadow-md font-semibold tracking-wide group-hover:-translate-y-1 transition-transform duration-300 whitespace-nowrap">
            Under ₹999
          </div>
        </Link>
        
        <Link href="/gifts?price=under-1999" className="group">
          <div className="bg-gradient-to-br from-[#fdfdfd] to-[#e6e6e6] border-[1.5px] border-[#d1d1d1] text-[#333333] px-8 py-3 rounded-full shadow-md font-semibold tracking-wide group-hover:-translate-y-1 transition-transform duration-300 whitespace-nowrap">
            Under ₹1999
          </div>
        </Link>

        <Link href="/gifts?price=under-2999" className="group">
          <div className="bg-gradient-to-br from-[#fdfdfd] to-[#e6e6e6] border-[1.5px] border-[#d1d1d1] text-[#333333] px-8 py-3 rounded-full shadow-md font-semibold tracking-wide group-hover:-translate-y-1 transition-transform duration-300 whitespace-nowrap">
            Under ₹2999
          </div>
        </Link>

        <Link href="/gifts?price=under-4999" className="group">
          <div className="bg-gradient-to-br from-[#fdfdfd] to-[#e6e6e6] border-[1.5px] border-[#d1d1d1] text-[#333333] px-8 py-3 rounded-full shadow-md font-semibold tracking-wide group-hover:-translate-y-1 transition-transform duration-300 whitespace-nowrap">
            Under ₹4999
          </div>
        </Link>
      </div>
    </section>
  );
};

export default LuxuryWithinReach;
