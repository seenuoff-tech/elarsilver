'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LuxuryButton from './LuxuryButton';

interface Message {
  sender: 'user' | 'concierge';
  text: string;
}

export default function ConciergeAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'concierge',
      text: "Welcome to ELARA. I am your Atelier Advisor. How may I guide your jewelry search today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOptionClick = (optionText: string, replyKey: string) => {
    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: optionText }]);
    setIsTyping(true);

    const replies: Record<string, string> = {
      size: "Our bands conform to standard US sizing. To discover your fit, measure the inner circumference of a current ring in millimeters, or wrap a thread around the base of your finger. We can also dispatch a complimentary physical ring sizer casing.",
      finish: "We provide Glossy Chrome (mirror reflection), Satin Matte (velvety luster), and Vintage Oxidized (antique shadow grooves) variants. You can preview these in real time on our Bespoke Customizer page segment.",
      care: "Sterling silver requires simple care to avoid tarnish. Store pieces in dry velvet enclosures, avoid contact with chemical spray, and clean using our micro-fiber polishing cloths. Our rhodium plating acts as a highly durable tarnish barrier.",
      consult: "Certainly. Please submit your email in our Patron Concierge block at the bottom of the page, and a private client advisor will coordinate a personal showroom scheduling consultation."
    };

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: replies[replyKey] || "Understood. Please let me know how else I may assist your showroom search."
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99] select-none">
      {/* Concierge Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[450px] border border-black/10 bg-neutral-50/90 backdrop-blur-2xl flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
          >
            {/* Header */}
            <div className="p-5 border-b border-black/10 flex justify-between items-center bg-[#ffffff]/40">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-silver-chrome" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
                </svg>
                <div>
                  <h4 className="text-xs font-bold tracking-widest text-black uppercase">
                    Atelier Advisor
                  </h4>
                  <span className="text-[8px] text-black/40 tracking-wider uppercase font-mono block">
                    Online Concierge
                  </span>
                </div>
              </div>
              <LuxuryButton isCTA={false}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black/40 hover:text-black text-[9px] tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
              </LuxuryButton>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-5 overflow-y-auto space-y-4 scrollbar-none bg-neutral-50/20">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 text-xs font-light leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-white text-black border-black'
                        : 'bg-[#ffffff]/60 text-black/85 border-black/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#ffffff]/60 border border-black/5 p-3.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-200" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Interactive Options */}
            <div className="p-5 border-t border-black/10 space-y-2.5 bg-[#ffffff]/40">
              <span className="text-[8px] tracking-widest uppercase text-black/35 font-mono block">
                Suggested Inquiries
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Find Ring Size", key: "size" },
                  { label: "Bespoke Finishes", key: "finish" },
                  { label: "Silver Care Guide", key: "care" },
                  { label: "Book Consultation", key: "consult" }
                ].map((opt, i) => (
                  <LuxuryButton key={i} isCTA={false}>
                    <button
                      onClick={() => handleOptionClick(opt.label, opt.key)}
                      className="text-[9px] font-semibold text-black/60 tracking-wider text-left border border-black/5 px-3 py-2 hover:bg-white hover:text-black hover:border-black transition-all duration-300 uppercase cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  </LuxuryButton>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Badge */}
      <LuxuryButton isCTA={true}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#0B5E64] border border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer relative group"
        >
          {/* Pulsing halo */}
          <div className="absolute inset-0 rounded-full border border-silver-chrome opacity-20 group-hover:scale-115 transition-transform duration-700 animate-ping pointer-events-none" />

          <svg className="w-6 h-6 text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
          </svg>
        </motion.button>
      </LuxuryButton>
    </div>
  );
}
