'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { products } from '../../data/products';
import LuxuryButton from '../../components/luxury/LuxuryButton';

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  useLocale?: boolean;
}

function AnimatedCounter({
  to,
  from = 0,
  duration = 2,
  suffix = "",
  decimals = 0,
  useLocale = false,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-20px" });
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isInView && !animatedRef.current) {
      animatedRef.current = true;
      const node = nodeRef.current;
      if (!node) return;

      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          let formatted = value.toFixed(decimals);
          if (useLocale) {
            formatted = Math.floor(value).toLocaleString();
          }
          node.textContent = formatted + suffix;
        },
      });

      return () => controls.stop();
    }
  }, [isInView, from, to, duration, decimals, suffix, useLocale]);

  let initialFormatted = from.toFixed(decimals);
  if (useLocale) {
    initialFormatted = Math.floor(from).toLocaleString();
  }
  return (
    <span ref={nodeRef} className="text-silver-metallic">
      {initialFormatted + suffix}
    </span>
  );
}

export default function AboutPage() {
  const product = products[0]; // Fetch specs and story items
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="bg-[#ffffff] text-black selection:bg-[#ffffff]/20 min-h-screen pt-24">
      {/* Editorial Header */}
      <section className="relative py-20 px-6 md:px-12 max-w-5xl mx-auto text-center space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block"
        >
          Our Heritage
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase"
        >
          Crafted for Eternity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-black/60 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          ELARA SILVER represents a relentless search for absolute structural harmony, bringing together age-old silversmithing arts and digital geometric precision.
        </motion.p>
      </section>

      {/* 2. Craftsmanship Section */}
      <section className="relative bg-neutral-100 py-28 px-6 md:px-12 overflow-hidden border-y border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase">
                The Touch of Masters
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-tight">
                {product.craftsmanshipSection.title}
              </h2>
            </div>
            
            <p className="text-black/60 font-light text-sm md:text-base leading-relaxed">
              {product.craftsmanshipSection.description}
            </p>

            <div className="w-16 h-[1px] bg-[#ffffff]/20" />

            <div className="grid grid-cols-2 gap-6 pt-4">
              {product.stats.map((stat, idx) => (
                <div key={idx} className="border-l border-black/10 pl-4 space-y-1">
                  <span className="text-[10px] tracking-widest text-black/40 uppercase block">
                    {stat.label}
                  </span>
                  <span className="text-sm font-semibold tracking-wider text-black">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Staggered Craft Points */}
          <div className="w-full lg:w-1/2 space-y-12">
            {product.craftsmanshipSection.features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-none border border-black/20 flex items-center justify-center text-xs font-mono text-black/50 group-hover:border-black group-hover:text-black transition-colors duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="w-[1px] h-full bg-[#ffffff]/10 mt-4 group-hover:bg-[#ffffff]/30 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold tracking-widest uppercase text-black group-hover:text-silver-chrome transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Sustainable & Ethical Journey */}
      <section className="relative bg-[#ffffff] py-28 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
          {/* Left Side: Certified Hallmark Seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center justify-center"
          >
            <div className="w-full max-w-md aspect-square border border-black/10 p-8 flex flex-col justify-between relative bg-neutral-100/40 backdrop-blur-sm shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0 border border-black/5 m-2 pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <svg className="w-10 h-10 text-black/20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
                  <polygon points="50,20 60,45 85,50 60,55 50,80 40,55 15,50 40,45" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-[10px] font-mono tracking-widest text-black/30 uppercase">
                  ASSAY OFFICE CERTIFIED
                </span>
              </div>

              <div className="text-center space-y-4 my-10">
                <span className="text-stroke-silver text-6xl md:text-8xl font-black tracking-widest block select-none">
                  925
                </span>
                <span className="text-xs font-semibold tracking-[0.4em] uppercase text-silver-chrome block">
                  Sterling Silver
                </span>
              </div>

              <div className="flex justify-between items-end border-t border-black/10 pt-4 text-[9px] font-mono tracking-wider text-black/40">
                <span>REGISTRY ID: #EL-925-SLV</span>
                <span>ORIGIN: ATELIER INDIA</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Purity Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-3">
              <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase">
                Guaranteed Quality
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-tight">
                {product.puritySection.title}
              </h2>
            </div>

            <p className="text-black/60 font-light text-sm md:text-base leading-relaxed">
              {product.puritySection.description}
            </p>

            <div className="space-y-6 pt-4">
              {product.puritySection.features.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <svg className="w-5 h-5 text-silver-chrome shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h5 className="text-sm font-medium text-black tracking-wide uppercase">
                      {item.title}
                    </h5>
                    <p className="text-xs text-black/45 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Statistics Metrics Section */}
      <section className="relative bg-neutral-100 py-24 px-6 md:px-12 border-t border-black/5 overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-black/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
              Editorial Validation
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
              Uncompromising Metrics
            </h2>
            <p className="text-black/45 font-light text-xs md:text-sm leading-relaxed">
              The precision of our digital artistry and physical craftsmanship, measured in silver and absolute satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { 
                to: 50000, 
                suffix: "+", 
                label: "Luxury Collectors", 
                useLocale: true,
                icon: (
                  <svg className="w-8 h-8 text-silver-chrome mb-4 group-hover:text-black transition-all duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 9l10 13 10-13-10-7z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 9h20M12 2v20M12 2L7 9M12 2l5 9M7 9l5 13 5-13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              { 
                to: 925, 
                suffix: "", 
                label: "Pure Sterling Assay", 
                useLocale: false,
                icon: (
                  <svg className="w-8 h-8 text-silver-chrome mb-4 group-hover:text-black transition-all duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3L12 8z" fill="currentColor" />
                  </svg>
                )
              },
              { 
                to: 100, 
                suffix: "%", 
                label: "Hallmark Guaranteed", 
                useLocale: false,
                icon: (
                  <svg className="w-8 h-8 text-silver-chrome mb-4 group-hover:text-black transition-all duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="10" r="7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              },
              { 
                to: 4.9, 
                suffix: "★", 
                label: "Excellence Rating", 
                useLocale: false, 
                decimals: 1,
                icon: (
                  <svg className="w-8 h-8 text-silver-chrome mb-4 group-hover:text-black transition-all duration-300 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M2 12h20M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(0, 0, 0, 0.25)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.05)"
                }}
                className="flex flex-col items-center justify-center p-6 border border-black/5 bg-white/40 backdrop-blur-sm relative group overflow-hidden"
              >
                {/* Silver ambient hover glow backdrop */}
                <div className="absolute inset-0 bg-radial from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Accent thin line on top hover */}
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#ffffff] group-hover:w-full transition-all duration-500 ease-out" />
                
                <div className="relative z-10 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1">
                  {stat.icon}
                  
                  <span className="text-4xl md:text-5xl font-black tracking-tight font-mono mb-2">
                    <AnimatedCounter
                      to={stat.to}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      useLocale={stat.useLocale}
                    />
                  </span>
                  <span className="text-[10px] md:text-xs tracking-widest text-black/50 uppercase font-medium text-center">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonial Experience Slider/Grid */}
      <section className="relative bg-[#ffffff] py-24 px-6 md:px-12 border-t border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
              Collector Testimonies
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
              The Patron Experience
            </h2>
            <p className="text-black/45 font-light text-xs md:text-sm leading-relaxed">
              Real reflections of pure elegance from our global community of discerning collectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "“The interactive scroll sequence on the website is pure digital art. But when the physical piece arrived, the silver sheen and heavy weight exceeded all expectations. A genuine masterpiece.”",
                author: "Aurelia V.",
                location: "Geneva, Switzerland",
                rating: 5,
                tag: "Signature Ring Owner"
              },
              {
                text: "“Elara has redefined luxury e-commerce. The 3D packaging wrap animation felt exactly like receiving a physical parcel from a Bond Street boutique. Spotless execution.”",
                author: "Marcus T.",
                location: "London, UK",
                rating: 5,
                tag: "Verified Collector"
              },
              {
                text: "“Incredible attention to detail. The mirror finish on the curves captures reflections beautifully under sunlight. Highly recommend the bespoke sizing process.”",
                author: "Siddharth M.",
                location: "Mumbai, India",
                rating: 5,
                tag: "Sterling Collector"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                whileHover={{
                  y: -8,
                  rotateX: 2,
                  rotateY: -2,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
                }}
                className="backdrop-blur-lg border border-black/10 bg-neutral-50/40 p-8 flex flex-col justify-between relative transition-all duration-300 group min-h-[320px] rounded-none"
              >
                {/* Elegant subtle top decoration */}
                <div className="absolute top-4 right-6 text-black/10 font-serif text-6xl select-none leading-none pointer-events-none group-hover:text-black/20 transition-colors">
                  ”
                </div>

                <div className="space-y-6">
                  {/* Diamonds/Stars indicators */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-silver-chrome fill-current" viewBox="0 0 100 100">
                        <polygon points="50,15 62,38 88,42 68,58 75,85 50,70 25,85 32,58 12,42 38,38" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-black/70 font-light text-xs md:text-sm leading-relaxed italic">
                    {testimonial.text}
                  </p>
                </div>

                <div className="border-t border-black/5 pt-6 mt-8 flex justify-between items-end">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-black">
                      {testimonial.author}
                    </h4>
                    <span className="text-[10px] text-black/40 block">
                      {testimonial.location}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-silver-chrome uppercase border border-silver-chrome/20 px-2 py-0.5 rounded-none bg-white/5">
                    {testimonial.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Newsletter / Patron Concierge Block */}
      <section className="relative bg-neutral-50 py-28 px-6 md:px-12 border-t border-black/5 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial from-white/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-10">
          <div className="space-y-4">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-silver-chrome uppercase block">
              Join the Elite
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-none">
              Become a Patron
            </h2>
            <p className="text-black/55 font-light text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              Subscribe to receive private showroom previews, atelier journals, and invitations to private concierge exhibitions.
            </p>
          </div>

          {/* Luxury Subscription Form */}
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-6 border border-silver-chrome/20 bg-[#ffffff]/60 backdrop-blur-sm space-y-2"
            >
              <h4 className="text-sm font-bold tracking-widest text-silver-chrome uppercase">
                Registry Completed
              </h4>
              <p className="text-xs text-black/60 font-light leading-relaxed uppercase tracking-wider">
                Thank you. You have been added to the ELARA Private Concierge registry. An invitation will be sent to your inbox.
              </p>
            </motion.div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="max-w-md mx-auto space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="flex-grow bg-[#ffffff]/60 border border-black/10 text-black placeholder-white/20 text-xs md:text-sm px-4 py-3.5 focus:outline-none focus:border-black tracking-widest uppercase transition-colors rounded-none"
                />
                <LuxuryButton isCTA={true}>
                  <button
                    type="submit"
                    className="bg-white text-black font-semibold text-xs md:text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-silver-chrome hover:text-black transition-colors duration-300 rounded-none cursor-pointer border border-black"
                  >
                    Request Access
                  </button>
                </LuxuryButton>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-[10px] text-black/40 tracking-wider">
                <input
                  type="checkbox"
                  required
                  id="newsletter-consent"
                  className="accent-white border-black/10 rounded-none w-3.5 h-3.5"
                />
                <label htmlFor="newsletter-consent" className="cursor-pointer select-none">
                  I accept the privacy policy & agree to receive concierge updates.
                </label>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
