'use client';

import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    collector: "AURELIA V.",
    loc: "GENEVA, SWITZERLAND",
    tag: "Signature Solitaire"
  },
  {
    url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop",
    collector: "MARCUS T.",
    loc: "LONDON, UK",
    tag: "Classic Band"
  },
  {
    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
    collector: "ELENA S.",
    loc: "MILAN, ITALY",
    tag: "Halo Ring Set"
  },
  {
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    collector: "SIDDHARTH M.",
    loc: "MUMBAI, INDIA",
    tag: "Pavé Star Band"
  },
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
    collector: "CHLOE L.",
    loc: "PARIS, FRANCE",
    tag: "Eternal Loop"
  },
  {
    url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    collector: "YUKI K.",
    loc: "TOKYO, JAPAN",
    tag: "Bespoke Matte Ring"
  }
];

export default function MomentsGallery() {
  return (
    <section className="relative bg-[#ffffff] py-28 px-6 md:px-12 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
            Collector Chronicles
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase">
            Customer Moments
          </h2>
          <p className="text-black/45 font-light text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Real reflections of ELARA pieces captured in everyday life by our community of global patrons.
          </p>
        </div>

        {/* Masonry layout using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="break-inside-avoid relative overflow-hidden border border-black/5 bg-neutral-50/20 group cursor-pointer mb-6"
            >
              {/* Outer image wrap */}
              <div className="overflow-hidden aspect-auto max-h-[500px]">
                <img
                  src={item.url}
                  alt={`ELARA collector - ${item.collector}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-100"
                />
              </div>

              {/* Glassmorphic hover details reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 select-none">
                <div className="space-y-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-[8px] font-mono tracking-widest text-silver-chrome uppercase border border-silver-chrome/20 px-2 py-0.5 bg-[#ffffff]/60 block w-max">
                    {item.tag}
                  </span>
                  <h4 className="text-sm font-bold tracking-wider text-black uppercase">
                    {item.collector}
                  </h4>
                  <span className="text-[9px] text-black/50 tracking-wider block">
                    {item.loc}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
