'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Rings', href: '/shop?category=rings', image: '/images/cat_rings.png' },
  { name: 'Necklaces', href: '/shop?category=necklaces', image: '/images/cat_necklaces.png' },
  { name: 'Earrings', href: '/shop?category=earrings', image: '/images/cat_earrings.png' },
  { name: 'Bracelets', href: '/shop?category=bracelets', image: '/images/silver_bracelet.png' },
  { name: 'Pendants', href: '/shop?category=pendants', image: '/images/silver_necklace.png' },
  { name: 'Gifts', href: '/shop?category=gifts', image: '/images/silver_rings.png' },
  { name: 'New Arrivals', href: '/shop?category=new-arrivals', image: '/images/cat_earrings.png' },
];

export default function ShopByCategory() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Handle responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Track active slide on scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.clientWidth / itemsPerPage;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!isHovered && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const itemWidth = container.clientWidth / itemsPerPage;
          
          // Max scrollable width
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            // Reached the end, scroll back to start
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll to next item
            container.scrollBy({ left: itemWidth, behavior: 'smooth' });
          }
        }
      }, 3000);
    };

    startAutoScroll();

    return () => clearInterval(intervalId);
  }, [isHovered, itemsPerPage]);

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth / itemsPerPage;
      container.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Calculate how many pagination stars we need.
  // If we have 7 items and show 3 per page, the max index where the 3 items can show is 7 - 3 = 4.
  // So we need 5 dots (indices 0 to 4).
  const maxIndex = Math.max(0, categories.length - itemsPerPage);

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#ffffff] z-10 border-b border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
              Curated Collections
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-black">
              Shop by Category
            </h2>
            <div className="w-24 h-[1px] bg-black/10 mx-auto mt-6" />
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative -mx-6 px-6 md:mx-0 md:px-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsHovered(false), 2000);
          }}
        >
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <div 
                key={index}
                className="min-w-[85vw] md:min-w-[calc(33.3333%-16px)] snap-start shrink-0"
              >
                <Link
                  href={category.href}
                  className="group block relative overflow-hidden rounded-2xl aspect-[4/5] bg-black/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 z-10" />
                  
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 px-6">
                    <h3 className="text-xl md:text-2xl font-bold tracking-wider uppercase text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {category.name}
                    </h3>
                    <span className="text-xs font-medium tracking-widest text-white/70 uppercase border-b border-white/30 pb-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      Explore →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Stars */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="p-1 transition-all duration-300 focus:outline-none"
            >
              <svg 
                className={`w-4 h-4 transition-colors duration-500 ${activeIndex === index ? 'text-black' : 'text-black/20'}`} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                {/* Curved Sparkle / Diamond shape */}
                <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
