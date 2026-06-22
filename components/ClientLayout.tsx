'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AddToCartAnimation from './AddToCartAnimation';
import CartDrawer from './CartDrawer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
      <AddToCartAnimation />
      <CartDrawer />
    </div>
  );
}
