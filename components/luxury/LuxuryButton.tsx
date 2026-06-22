'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LuxuryButtonProps {
  children: React.ReactElement;
  isCTA?: boolean;
  magneticRange?: number;
  magneticStrength?: number;
  shimmerColor?: 'gold' | 'silver';
  className?: string;
}

export default function LuxuryButton({
  children,
  isCTA = false,
  magneticRange = 85,
  magneticStrength = 0.38,
  shimmerColor = 'gold',
  className = '',
}: LuxuryButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the 4 border lines
  const borderTopRef = useRef<HTMLDivElement>(null);
  const borderRightRef = useRef<HTMLDivElement>(null);
  const borderBottomRef = useRef<HTMLDivElement>(null);
  const borderLeftRef = useRef<HTMLDivElement>(null);

  // Sparkle generator interval id
  const sparkleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    // Detect touch device to disable heavy mouse tracking animations
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Set colors
    const primaryColor = shimmerColor === 'gold' ? '#D4AF37' : '#E5E4E2';
    const glowColor = shimmerColor === 'gold' ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.2)';

    // Set transform perspective for 3D tilt
    gsap.set(button, { transformPerspective: 1000 });

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < magneticRange) {
        // Magnetic pull
        const pullX = dx * magneticStrength;
        const pullY = dy * magneticStrength;

        // 3D Tilt calculation
        // Limit tilt to max 12 degrees
        const tiltX = -dy * 0.12; 
        const tiltY = dx * 0.12;

        gsap.to(button, {
          x: pullX,
          y: pullY,
          rotateX: tiltX,
          rotateY: tiltY,
          scale: 1.05,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });

        // Glow intensity slightly shifts with mouse
        gsap.to(glowRef.current, {
          opacity: 1,
          scale: 1.08,
          x: pullX * 0.5,
          y: pullY * 0.5,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      } else {
        resetButton();
      }
    };

    const resetButton = () => {
      if (isTouch) return;
      gsap.to(button, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power4.out',
        overwrite: 'auto',
      });
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1.0,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    };

    const handleMouseEnter = () => {
      // Shimmer sweep animation
      if (shimmerRef.current) {
        gsap.fromTo(
          shimmerRef.current,
          { xPercent: -150 },
          { xPercent: 150, duration: 1.1, ease: 'power2.inOut', overwrite: 'auto' }
        );
      }

      // Border reveal draw-in animation
      const borders = [
        borderTopRef.current,
        borderRightRef.current,
        borderBottomRef.current,
        borderLeftRef.current,
      ];
      gsap.to(borders, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        overwrite: 'auto',
      });

      // Expand glow shadow
      gsap.to(glowRef.current, {
        opacity: 1,
        boxShadow: `0 0 25px ${glowColor}`,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // If it's a CTA button, start spawning sparkles
      if (isCTA) {
        startSparkling();
      }
    };

    const handleMouseLeave = () => {
      resetButton();

      // Border fade out/retract
      const borders = [
        borderTopRef.current,
        borderRightRef.current,
        borderBottomRef.current,
        borderLeftRef.current,
      ];
      gsap.to(borders, {
        scaleX: 0,
        scaleY: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      // Fade out glow shadow
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Stop spawning sparkles
      stopSparkling();
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Radial Click Particle Burst
      const rect = button.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      createClickBurst(clickX, clickY);
    };

    // Sparkles generator
    const startSparkling = () => {
      if (sparkleIntervalRef.current) return;
      
      const spawnSparkle = () => {
        const pContainer = particleContainerRef.current;
        if (!pContainer || !button) return;
        const { width, height } = button.getBoundingClientRect();

        // Spawn on the perimeter
        let x = 0;
        let y = 0;
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

        if (side === 0) {
          x = Math.random() * width;
          y = 0;
        } else if (side === 1) {
          x = width;
          y = Math.random() * height;
        } else if (side === 2) {
          x = Math.random() * width;
          y = height;
        } else {
          x = 0;
          y = Math.random() * height;
        }

        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.pointerEvents = 'none';
        sparkle.style.transform = 'translate(-50%, -50%) scale(0)';
        sparkle.innerHTML = `
          <svg viewBox="0 0 100 100" class="w-3.5 h-3.5" style="color: ${primaryColor}; fill: currentColor;">
            <polygon points="50,10 60,40 90,50 60,60 50,90 40,60 10,50 40,40" />
          </svg>
        `;
        pContainer.appendChild(sparkle);

        // Twinkle float animation
        const floatY = -15 - Math.random() * 20;
        const floatX = (Math.random() - 0.5) * 20;

        gsap.set(sparkle, { opacity: 0 });
        gsap.to(sparkle, {
          y: floatY,
          x: floatX,
          scale: 0.5 + Math.random() * 0.8,
          rotation: Math.random() * 180,
          duration: 1.2 + Math.random() * 0.8,
          ease: 'power1.out',
          onComplete: () => sparkle.remove(),
        });

        gsap.to(sparkle, {
          opacity: 1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.5 + Math.random() * 0.4,
        });
      };

      // Spawn initial sparkles
      for (let i = 0; i < 3; i++) {
        setTimeout(spawnSparkle, i * 150);
      }
      
      sparkleIntervalRef.current = setInterval(spawnSparkle, 350);
    };

    const stopSparkling = () => {
      if (sparkleIntervalRef.current) {
        clearInterval(sparkleIntervalRef.current);
        sparkleIntervalRef.current = null;
      }
    };

    const createClickBurst = (x: number, y: number) => {
      const pContainer = particleContainerRef.current;
      if (!pContainer) return;

      const numParticles = 14;

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.pointerEvents = 'none';
        particle.style.transform = 'translate(-50%, -50%) scale(1)';

        const isStar = Math.random() > 0.4;
        if (isStar) {
          // Diamond star shape
          particle.innerHTML = `
            <svg viewBox="0 0 100 100" class="w-2 h-2" style="color: ${primaryColor}; fill: currentColor;">
              <polygon points="50,15 62,38 88,42 68,58 75,85 50,70 25,85 32,58 12,42 38,38" />
            </svg>
          `;
        } else {
          // Small circular gold dust dot
          particle.className = shimmerColor === 'gold' ? 'w-1 h-1 bg-[#D4AF37] rounded-full' : 'w-1 h-1 bg-white/80 rounded-full';
        }

        pContainer.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 55;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        gsap.to(particle, {
          x: targetX,
          y: targetY,
          scale: 0,
          opacity: 0,
          rotation: (Math.random() - 0.5) * 360,
          duration: 0.6 + Math.random() * 0.6,
          ease: 'power2.out',
          onComplete: () => particle.remove(),
        });
      }
    };

    // Attach events
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseup', handleMouseUp);
      stopSparkling();
    };
  }, [magneticRange, magneticStrength, isCTA, shimmerColor]);

  return (
    <div
      ref={containerRef}
      className={`inline-block relative z-20 ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Luxury glow shadow backing */}
      <div
        ref={glowRef}
        className="absolute inset-0 -z-10 opacity-0 pointer-events-none"
        style={{
          transition: 'box-shadow 0.3s ease',
        }}
      />

      <div
        ref={buttonRef}
        className="relative select-none transition-shadow duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer sweep overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 rounded-inherit">
          <div
            ref={shimmerRef}
            className="absolute top-0 -left-[150%] w-[60%] h-full pointer-events-none skew-x-12 opacity-80"
            style={{
              background: shimmerColor === 'gold' 
                ? 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0) 25%, rgba(212, 175, 55, 0.45) 50%, rgba(212, 175, 55, 0) 75%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 75%, transparent 100%)'
            }}
          />
        </div>

        {/* Elegant corner-drawing border lines */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Top Line */}
          <div
            ref={borderTopRef}
            className="absolute top-0 left-0 w-full h-[1px] origin-left scale-x-0"
            style={{
              background: shimmerColor === 'gold' 
                ? 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
                : 'linear-gradient(90deg, transparent, #E5E4E2, transparent)',
            }}
          />
          {/* Right Line */}
          <div
            ref={borderRightRef}
            className="absolute top-0 right-0 w-[1px] h-full origin-top scale-y-0"
            style={{
              background: shimmerColor === 'gold'
                ? 'linear-gradient(180deg, transparent, #D4AF37, transparent)'
                : 'linear-gradient(180deg, transparent, #E5E4E2, transparent)',
            }}
          />
          {/* Bottom Line */}
          <div
            ref={borderBottomRef}
            className="absolute bottom-0 right-0 w-full h-[1px] origin-right scale-x-0"
            style={{
              background: shimmerColor === 'gold'
                ? 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
                : 'linear-gradient(90deg, transparent, #E5E4E2, transparent)',
            }}
          />
          {/* Left Line */}
          <div
            ref={borderLeftRef}
            className="absolute top-0 left-0 w-[1px] h-full origin-bottom scale-y-0"
            style={{
              background: shimmerColor === 'gold'
                ? 'linear-gradient(180deg, transparent, #D4AF37, transparent)'
                : 'linear-gradient(180deg, transparent, #E5E4E2, transparent)',
            }}
          />
        </div>

        {/* Particles overlay (for sparkles and bursts) */}
        <div
          ref={particleContainerRef}
          className="absolute inset-0 pointer-events-none z-30 overflow-visible"
        />

        {/* The original button or clickable element */}
        {children}
      </div>
    </div>
  );
}
