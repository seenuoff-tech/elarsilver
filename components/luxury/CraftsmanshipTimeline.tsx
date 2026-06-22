'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timelineStages = [
  {
    num: "01",
    title: "CAD Design",
    desc: "Fluid curves are hand-drafted in digital high-fidelity CAD spaces, mapping absolute mathematical reflection curves."
  },
  {
    num: "02",
    title: "Precision Casting",
    desc: "Molten 925 sterling alloy is poured at high temperatures into vacuum-drawn plaster casts to form the core chassis."
  },
  {
    num: "03",
    title: "Hand Crafting",
    desc: "Atelier smiths hand-assemble features, micro-soldering wire claws, pave halos, and solid crowns under microscopes."
  },
  {
    num: "04",
    title: "Mirror Polish",
    desc: "The band is polished in a multi-stage process using wool felt buffs and fine compounds, yielding our signature liquid gloss."
  },
  {
    num: "05",
    title: "Hallmarking",
    desc: "Subjected to rigorous chemical assay testing, then laser-marked with the certified '925' and BIS stamps."
  },
  {
    num: "06",
    title: "VIP Dispatch",
    desc: "Sealed inside velvet cushion cases, tied with silver ribbon bows, and sent via insured express private transit."
  }
];

export default function CraftsmanshipTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-neutral-50 py-28 px-6 md:px-12 border-t border-black/5 overflow-hidden">
      {/* Decorative ambient rays */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-radial from-white/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
            Atelier Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase">
            Craftsmanship Timeline
          </h2>
          <p className="text-black/45 font-light text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            The narrative of a single piece of silver, forged from digital layouts to premium unboxing delivery.
          </p>
        </div>

        {/* Horizontal Progress Path */}
        <div ref={lineRef} className="relative w-full py-8 overflow-x-auto scrollbar-none">
          <div className="min-w-[900px] relative px-4">
            
            {/* Background Line */}
            <div className="absolute top-[28px] left-8 right-8 h-[1px] bg-white/10" />

            {/* Glowing Silver Active Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 2.0, ease: 'easeInOut' }}
              className="absolute top-[28px] left-8 right-8 h-[1px] bg-gradient-to-r from-silver-chrome via-white to-silver-chrome origin-left z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />

            {/* Nodes Grid */}
            <div className="grid grid-cols-6 gap-6 relative z-30">
              {timelineStages.map((stage, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Node Circle */}
                  <div className="w-10 h-10 rounded-full border border-black/20 bg-[#ffffff] flex items-center justify-center text-[10px] font-mono text-black/50 group-hover:border-black group-hover:text-black transition-all duration-300 relative">
                    {/* Glowing outer halo on hover */}
                    <div className="absolute inset-0 rounded-full border border-black opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                    {stage.num}
                  </div>

                  <div className="mt-8 space-y-2 px-2">
                    <h4 className="text-xs font-bold tracking-widest uppercase text-black group-hover:text-silver-chrome transition-colors duration-300">
                      {stage.title}
                    </h4>
                    <p className="text-[10px] text-black/45 font-light leading-relaxed group-hover:text-black/60 transition-colors duration-300">
                      {stage.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
