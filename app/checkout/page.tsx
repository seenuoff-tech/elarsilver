'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import LuxuryButton from '../../components/luxury/LuxuryButton';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Calculate Totals
  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = parseFloat(String(item.price).replace(/[^\d]/g, ''));
    return acc + numericPrice * item.quantity;
  }, 0);
  
  const grandTotal = subtotal > 0 ? subtotal + 70 : 0;
  const formattedGrandTotal = `₹${grandTotal.toLocaleString('en-IN')}`;

  useEffect(() => {
    // If cart is empty and not on success step, redirect home
    if (cartItems.length === 0 && step !== 3) {
      router.push('/');
    }
  }, [cartItems.length, router, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      const generatedOrderId = `ELARA-${Math.floor(Math.random() * 900000) + 100000}`;
      setOrderId(generatedOrderId);
      setIsProcessing(false);
      clearCart();
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  if (cartItems.length === 0 && step !== 3) {
    return <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black pt-28 pb-20 selection:bg-[#0B5E64] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Area */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Progress Indicator */}
          {step !== 3 && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-[#0B5E64] text-white' : 'bg-black/10 text-black/40'}`}>
                  1
                </div>
                <span className={`text-xs tracking-widest uppercase font-semibold ${step >= 1 ? 'text-black' : 'text-black/40'}`}>Details</span>
              </div>
              <div className="w-12 h-[1px] bg-black/10" />
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-[#0B5E64] text-white' : 'bg-black/10 text-black/40'}`}>
                  2
                </div>
                <span className={`text-xs tracking-widest uppercase font-semibold ${step >= 2 ? 'text-black' : 'text-black/40'}`}>Payment</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5"
              >
                <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-black mb-8">Shipping Information</h2>
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Full Name *</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Phone Number *</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors" placeholder="Order updates will be sent here" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Shipping Address *</label>
                    <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors resize-none" placeholder="House/Flat No., Building Name, Street" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">City *</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors" placeholder="e.g. Mumbai" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Pincode *</label>
                      <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors" placeholder="e.g. 400001" />
                    </div>
                  </div>

                  <div className="pt-6">
                    <LuxuryButton isCTA={true} className="w-full md:w-auto">
                      <button type="submit" className="w-full md:w-auto px-10 py-4 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors duration-500 shadow-xl shadow-black/10">
                        Continue to Payment
                      </button>
                    </LuxuryButton>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-black">Secure Payment</h2>
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    <span className="text-[9px] font-bold tracking-widest uppercase">SSL Secured</span>
                  </div>
                </div>

                <div className="mb-8 p-4 bg-[#F5F5F7] border border-black/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-black/50 mb-1">Amount to Pay</p>
                    <p className="text-xl font-bold text-[#0B5E64]">{formattedGrandTotal}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs font-semibold underline text-black/50 hover:text-black">Edit Details</button>
                </div>

                <form onSubmit={handleProcessPayment} className="space-y-6 relative">
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                      <div className="w-10 h-10 border-4 border-[#0B5E64]/20 border-t-[#0B5E64] rounded-full animate-spin" />
                      <p className="text-[10px] tracking-widest uppercase font-bold text-[#0B5E64]">Processing Secure Payment...</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-black/10">
                      <input type="radio" checked readOnly className="w-4 h-4 accent-[#0B5E64]" />
                      <span className="text-sm font-semibold tracking-wide">Credit / Debit Card</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Card Number</label>
                      <input required type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentChange} maxLength={19} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors font-mono tracking-widest" placeholder="XXXX XXXX XXXX XXXX" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">Valid Thru</label>
                        <input required type="text" name="expiry" value={paymentData.expiry} onChange={handlePaymentChange} maxLength={5} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors font-mono tracking-widest" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase text-black/60 font-semibold">CVV</label>
                        <input required type="password" name="cvv" value={paymentData.cvv} onChange={handlePaymentChange} maxLength={4} className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0B5E64] p-4 text-sm outline-none transition-colors font-mono tracking-widest" placeholder="***" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <LuxuryButton isCTA={true} className="w-full">
                      <button type="submit" disabled={isProcessing} className="w-full px-10 py-5 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors duration-500 shadow-xl shadow-black/10 disabled:opacity-50">
                        {isProcessing ? 'Authorizing...' : `Pay ${formattedGrandTotal}`}
                      </button>
                    </LuxuryButton>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="bg-white p-12 md:p-16 shadow-2xl shadow-[#0B5E64]/10 border border-black/5 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-[#0B5E64] rounded-full flex items-center justify-center mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-medium tracking-wide text-black mb-4">Order Confirmed</h1>
                <p className="text-black/60 text-sm max-w-md mx-auto mb-8">
                  Thank you for shopping with ELARA. Your luxury handcrafted pieces are being meticulously packaged and will be shipped shortly.
                </p>

                <div className="bg-[#F5F5F7] py-4 px-8 w-full max-w-sm border border-black/5 mb-10">
                  <p className="text-[10px] tracking-widest uppercase text-black/50 mb-1">Order Reference ID</p>
                  <p className="text-lg font-mono font-bold tracking-widest text-[#0B5E64]">{orderId}</p>
                </div>

                <LuxuryButton isCTA={false}>
                  <button onClick={() => router.push('/')} className="px-10 py-4 bg-transparent border border-black text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-500">
                    Return to Collection
                  </button>
                </LuxuryButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        {step !== 3 && (
          <div className="lg:col-span-5 h-fit bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-8">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black mb-8 pb-4 border-b border-black/10">Order Summary</h3>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto scrollbar-none">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="w-20 h-20 bg-[#F5F5F7] border border-black/5 p-2 shrink-0">
                    <img 
                      src={item.image || `/images/${item.id}.png`} 
                      alt={item.name} 
                      className="w-full h-full object-contain" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero1.png';
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow space-y-1">
                    <h4 className="text-xs font-semibold tracking-wide uppercase text-black truncate max-w-[180px]">{item.name}</h4>
                    <p className="text-[10px] tracking-widest text-black/50 font-mono">Size: {item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] text-black/50">Qty: {item.quantity}</p>
                      <p className="text-xs font-bold tracking-wider">{`₹${(parseFloat(String(item.price).replace(/[^\d]/g, '')) * item.quantity).toLocaleString('en-IN')}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-black/10 text-xs tracking-widest uppercase text-black/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-black font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Packaging</span>
                <span className="text-black font-semibold">₹70</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-black/10">
                <span>Shipping & Taxes</span>
                <span className="text-[#0B5E64] font-bold">Included</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2">
                <span>Grand Total</span>
                <span className="text-[#0B5E64]">{formattedGrandTotal}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10">
              <div className="flex items-center gap-3 text-black/50 justify-center">
                <svg className="w-5 h-5 text-silver-chrome" viewBox="0 0 100 100" fill="none">
                  <path d="M50 5L63 38L96 50L63 62L50 95L37 62L4 50L37 38L50 5Z" stroke="currentColor" strokeWidth="2.5"/>
                </svg>
                <span className="text-[8px] font-bold tracking-[0.3em] uppercase">ELARA Authenticity Guarantee</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
