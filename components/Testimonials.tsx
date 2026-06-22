'use client';

import React from 'react';

const testimonials = [
  {
    name: "Disha Kumbhar",
    date: "December 21, 2025",
    text: "On my birthday last year, he got me earrings from Mia, and this year he got me a locket to match the earrings. Mia, to me, represents the way Dad expresses his love to me...",
  },
  {
    name: "Yashila Gupta",
    date: "December 14, 2025",
    text: "Mia means reliable and resilient products to face every day and small celebrations after overcoming the daily obstacles. I am sorry if my English is a bit...",
  },
  {
    name: "Aina Thakur",
    date: "July 12, 2025",
    text: "For me, Mia by Tanishq is something that represents and celebrates modern femininity, which is subtle, strong, and yet stylish. It is a gentle expression of...",
  },
  {
    name: "Mashar T",
    date: "December 13, 2025",
    text: "I recently discovered Mia by Tanishq and loved how it offers beautiful designs at very budget-friendly prices. I chose to buy a bracelet as a gift for my loved one...",
  },
  {
    name: "Vivek",
    date: "December 21, 2025",
    text: "The name reflects a shift from jewellery being a family asset or an investment to being something deeply personal. It's about a woman saying, This is mine — it reflects...",
  },
  {
    name: "Sathiyapriya T",
    date: "December 13, 2025",
    text: "Mia by Tanishq, to me, represents celebrating modern women and their individuality. It's not just jewelry — it's about self-expression, confidence, and milestones in a...",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden relative z-10 border-t border-black/5">
      <div className="text-center mb-16">
        <span className="text-sm font-serif text-[#0B5E64] block mb-2">Our</span>
        <h2 className="text-4xl md:text-5xl font-medium text-[#0B5E64]">Testimonials</h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex items-center">
        {/* Edge Gradients for smooth fade out */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Track */}
        <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:animate-[marquee_40s_linear_infinite_paused] space-x-6 py-8 px-6">
          {/* We duplicate the array to create a seamless loop */}
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => {
            // Alternating rotations based on index to create the wavy/tilted look
            const rotateClass = idx % 3 === 0 ? '-rotate-3' : idx % 3 === 1 ? 'rotate-2' : '-rotate-1';
            const translateY = idx % 2 === 0 ? 'translate-y-4' : '-translate-y-2';

            return (
              <div 
                key={idx} 
                className={`w-[320px] flex-shrink-0 bg-white rounded-3xl p-8 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col ${rotateClass} ${translateY} transition-transform hover:scale-105 hover:z-20 duration-300`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{testimonial.name}</h3>
                    <p className="text-[10px] text-gray-400">{testimonial.date}</p>
                  </div>
                  <span className="text-4xl text-[#0B5E64] leading-none font-serif font-black mt-[-10px]">“</span>
                </div>
                <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                  {testimonial.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* We add Tailwind arbitrary variants via style if they aren't configured in tailwind.config */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.33% - 12px)); } /* Shift by exactly 1/3 of the items since we triplicated */
        }
      `}} />
    </section>
  );
}
