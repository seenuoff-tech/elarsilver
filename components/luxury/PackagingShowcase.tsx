'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PackagingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [step, setStep] = useState(0); // 0: closed, 1: spotlight, 2: open, 3: rise, 4: sparkles

  useEffect(() => {
    if (isInView) {
      setStep(1); // Turn on spotlight & show box

      const timer2 = setTimeout(() => {
        setStep(2); // Prepare
      }, 900);

      const timer3 = setTimeout(() => {
        setStep(3); // Rise ring up
      }, 1800);

      const timer4 = setTimeout(() => {
        setStep(4); // Show sparkles
      }, 2600);

      return () => {
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-neutral-50 py-32 px-6 md:px-12 border-t border-black/5 overflow-hidden min-h-[650px] flex items-center"
    >
      {/* Background highlight spotlight */}
      <div className="absolute inset-0 bg-radial from-white/5 via-transparent to-transparent opacity-80 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-center">
        {/* Left Side: Unboxing Animation Stage */}
        <div className="w-full lg:w-1/2 flex items-center justify-center h-[450px] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/ringandringbox.jpg"
              alt="Elara Silver Luxury Packaging"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </div>

        {/* Right Side: Editorial Descriptions */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
              The Packaging
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-none">
              Unboxing Excellence
            </h2>
            <p className="text-black/40 font-light text-xs md:text-sm leading-relaxed">
              Every ELARA SILVER creation is shipped in our signature presentation case. Fabricated with matte-black shells, soft velvet cushions, and embossed sterling logos, it transforms purchase into keepsake heritage.
            </p>
          </div>

          <div className="w-16 h-[1px] bg-white/20" />

          {/* List Details */}
          <div className="space-y-4">
            {[
              { title: "Matte Black Enclosure", desc: "Rigid heavy-gauge board with soft-touch luxury texture sheets." },
              { title: "Silver Embossed Logo", desc: "Foil-pressed stamps that catch reflection lines dynamically." },
              { title: "Velvet Cushion Core", desc: "High-density hypoallergenic velvet lining to shield details." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex gap-4 items-start"
              >
                <div className="w-2.5 h-2.5 rounded-full border border-silver-chrome mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold uppercase text-black tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-black/50 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
