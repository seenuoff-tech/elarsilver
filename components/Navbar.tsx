'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LuxuryButton from './luxury/LuxuryButton';
import SearchOverlay from './luxury/SearchOverlay';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLinks, setShowLinks] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen, isCartOpen } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling up or at the very top, show the links
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setShowLinks(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // If scrolling down, hide the links
        setShowLinks(false);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-md'
          : 'bg-white border-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col">
        {/* Top Row: Hamburger, Logo, Icons */}
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left: Hamburger (Always Visible based on image) */}
          <div className="flex items-center w-1/3">
            <button 
              className="flex flex-col gap-1.5 p-2 group cursor-pointer" 
              aria-label="Menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="w-8 h-1 bg-black group-hover:bg-gray-700 transition-colors block rounded-full" />
              <span className="w-8 h-1 bg-black group-hover:bg-gray-700 transition-colors block rounded-full" />
              <span className="w-8 h-1 bg-black group-hover:bg-gray-700 transition-colors block rounded-full" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center items-center w-1/3">
            <Link href="/" className="hover:scale-105 transition-transform duration-500">
              <img 
                src="/images/elaralogo.png" 
                alt="Elara Silver Logo" 
                className="h-16 object-contain" 
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end gap-6 w-1/3">
            {/* Search Icon */}
            <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-60 transition-opacity" title="Search">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist (Solid Red Heart) */}
            <Link href="/wishlist" className="hover:opacity-80 transition-opacity" title="Wishlist">
              <svg className="w-6 h-6 text-[#8B1A24]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </Link>

            {/* Cart (Solid Cart) */}
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative hover:opacity-60 transition-opacity" title="Cart">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#8B1A24] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account (Solid User) */}
            <div className="relative">
              <button 
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} 
                className="hover:opacity-60 transition-opacity flex items-center" 
                title="Account"
              >
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>
              
              {/* Account Dropdown */}
              <div 
                className={`absolute right-0 mt-4 w-48 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden transition-all duration-300 origin-top-right ${
                  isAccountMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-2 flex flex-col">
                  {user ? (
                    <>
                      <Link href="/account" className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors" onClick={() => setIsAccountMenuOpen(false)}>
                        My Account
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsAccountMenuOpen(false);
                        }}
                        className="text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors w-full"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors" onClick={() => setIsAccountMenuOpen(false)}>
                        Login
                      </Link>
                      <Link href="/register" className="px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors" onClick={() => setIsAccountMenuOpen(false)}>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Links */}
        <div 
          className={`flex justify-center items-center overflow-hidden transition-all duration-500 ease-in-out ${
            showLinks ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'
          }`}
        >
          <div className="flex items-center gap-8 md:gap-12 text-[13px] font-medium text-gray-800 tracking-widest uppercase">
            {['Jewellery', 'Women', 'Men', 'Gifts', 'Service'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-[#067964] transition-colors hover:underline underline-offset-8 decoration-1">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-700 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 h-[100dvh] w-[400px] max-w-[85vw] bg-white/95 backdrop-blur-3xl shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 border-b border-black/5 flex justify-between items-center">
            <span className="text-xs font-semibold tracking-[0.4em] text-black">CATEGORY</span>
            <button onClick={() => setIsSidebarOpen(false)} className="hover:rotate-90 transition-transform duration-500 text-black/50 hover:text-black">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-10 px-10 flex flex-col gap-6">
            {['Jewellery', 'Women', 'Men', 'Gifts', 'Service'].map((item, i) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className={`text-xl font-light tracking-widest uppercase text-black/80 hover:text-[#067964] transition-colors duration-500 flex items-center group`}
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isSidebarOpen ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`
                }}
              >
                <span className="w-0 group-hover:w-4 h-[1px] bg-[#0B5E64] transition-all duration-300 ease-out mr-0 group-hover:mr-4 opacity-0 group-hover:opacity-100"></span>
                {item}
              </Link>
            ))}
          </div>

          <div className="p-8 border-t border-black/5 flex flex-col gap-4 bg-gray-50/50">
            {user ? (
              <>
                <Link 
                  href="/account"
                  className="px-6 py-4 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors text-center shadow-lg"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  My Account
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsSidebarOpen(false);
                  }}
                  className="px-6 py-4 border border-black/20 text-black text-xs font-bold tracking-[0.2em] uppercase hover:border-black transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                className="px-6 py-4 bg-[#0B5E64] text-white text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity text-center shadow-lg"
                onClick={() => setIsSidebarOpen(false)}
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

