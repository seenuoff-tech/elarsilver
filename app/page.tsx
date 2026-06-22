'use client';

import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ShopByCategory from '../components/ShopByCategory';
import CuratedForYou from '../components/CuratedForYou';

// Import newly integrated premium luxury experience modules
import AtmosphereBackground from '../components/luxury/AtmosphereBackground';
import NewArrivals from '../components/NewArrivals';
import Testimonials from '../components/Testimonials';
import PackagingShowcase from '../components/luxury/PackagingShowcase';
import CraftsmanshipTimeline from '../components/luxury/CraftsmanshipTimeline';
import StoreFront from '../components/luxury/StoreFront';
import ConciergeAssistant from '../components/luxury/ConciergeAssistant';

export default function Home() {
  return (
    <div className="bg-[#ffffff] text-black selection:bg-black/10 selection:text-black relative min-h-screen">
      {/* Immersive Background Atmosphere (Subtle floating silver dust and sparkles) */}
      <AtmosphereBackground />

      {/* Hero Section */}
      <HeroSlider />

      {/* Shop by Category Section */}
      <ShopByCategory />

      {/* New Arrivals Section */}
      <div className="relative z-10">
        <NewArrivals />
      </div>

      {/* Curated For You Section */}
      <CuratedForYou />


      {/* New Luxury Section 4: Luxury Packaging Reveal */}
      <div className="relative z-10">
        <PackagingShowcase />
      </div>

      {/* New Luxury Section 5: Craftsmanship Timeline */}
      <div className="relative z-10">
        <CraftsmanshipTimeline />
      </div>





      {/* New Store Front Section */}
      <div className="relative z-10">
        <StoreFront />
      </div>

      {/* 3. Immersive Parallax Quote Section */}
      <section className="relative bg-[#ffffff] py-40 px-6 overflow-hidden z-10">
        {/* Volumetric background lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-silver-chrome/5 blur-[120px] pointer-events-none" />
        
        <div className="relative w-full max-w-6xl mx-auto text-center space-y-4 z-10 bg-[#0B5E64] py-8 px-8 md:py-12 md:px-16 rounded-[2rem] shadow-2xl">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white/40 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L63 38L96 50L63 62L50 95L37 62L4 50L37 38L50 5Z" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
          </svg>
          <blockquote className="text-2xl md:text-4xl font-extralight tracking-wide italic text-white leading-relaxed max-w-5xl mx-auto drop-shadow-sm">
            "Silver is the mirror of the moon. It catches the fluid essence of shadows, forging them into permanent light."
          </blockquote>
          <cite className="text-[10px] tracking-[0.4em] uppercase text-white/70 block font-semibold not-italic pt-2">
            — ELARA Atelier
          </cite>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Floating Concierge Assistant Widget */}
      <ConciergeAssistant />
    </div>
  );
}
