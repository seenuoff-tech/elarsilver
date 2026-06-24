'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PricingContextType {
  silverRate: number;
  setSilverRate: (rate: number) => void;
  gstPercentage: number;
  setGstPercentage: (gst: number) => void;
  calculatePrice: (weightInGrams: number) => string;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: ReactNode }) {
  const [silverRate, setSilverRate] = useState<number>(85); // Default to ₹85/g
  const [gstPercentage, setGstPercentage] = useState<number>(3); // Default to 3% GST

  // Helper to instantly calculate price based on weight
  const calculatePrice = (weightInGrams: number) => {
    const basePrice = weightInGrams * silverRate;
    const finalPrice = basePrice + (basePrice * (gstPercentage / 100));
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(finalPrice);
  };

  return (
    <PricingContext.Provider value={{ silverRate, setSilverRate, gstPercentage, setGstPercentage, calculatePrice }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
}
