'use client';

import React, { useState } from 'react';
import LuxuryButton from './luxury/LuxuryButton';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#0B5E64] border-t border-white/10 text-white py-20 px-6 md:px-12 relative z-10 overflow-hidden">
      {/* Decorative subtle gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Column 1: Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo2.PNG" 
              alt="Elara Silver Logo" 
              className="w-auto h-24 object-contain brightness-0 invert" 
            />
          </div>
          <p className="text-white/80 text-sm leading-relaxed font-light">
            Forging timeless aesthetics in solid sterling silver. Experiencing luxury jewelry through high-end craftsmanship and conscious modern design.
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/60 hover:text-white text-xs tracking-wider uppercase transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="space-y-6">
          <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white">Collections</h4>
          <ul className="space-y-3 text-sm text-white/80 font-light">
            <li><a href="#collections" className="hover:text-white transition-colors duration-300">Signature Ring</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Liquid Silver Necklaces</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Sterling Cuffs</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Eternal Drop Earrings</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="space-y-6">
          <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white">Client Services</h4>
          <ul className="space-y-3 text-sm text-white/80 font-light">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Complimentary Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Secure Payments</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Jewellery Care Guide</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
            <li><a href="/track-order" className="hover:text-white transition-colors duration-300">Track Your Order</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white">Newsletter</h4>
          <p className="text-white/80 text-sm leading-relaxed font-light">
            Subscribe to receive private previews, product launches, and brand stories.
          </p>
          {subscribed ? (
            <p className="text-white text-xs tracking-wider uppercase">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative border-b border-white/40 focus-within:border-white transition-colors duration-300">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none text-white placeholder-white/50 text-sm py-2 w-full focus:outline-none"
                />
              </div>
              <LuxuryButton isCTA={true}>
                <button
                  type="submit"
                  className="mt-2 py-2 px-4 text-xs font-medium tracking-[0.2em] uppercase border border-white/40 text-white hover:bg-white hover:text-[#0B5E64] transition-all duration-300 text-center cursor-pointer"
                >
                  Subscribe
                </button>
              </LuxuryButton>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 font-light gap-4">
        <p>© {new Date().getFullYear()} ELARA SILVER. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="https://www.skeneticdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Developed by skenetic digital</a>
        </div>
      </div>
    </footer>
  );
}

