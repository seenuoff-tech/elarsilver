'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import { ImageSequenceConfig } from '../data/products';

interface ProductRingScrollProps {
  sequenceConfig: ImageSequenceConfig;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  fadeSpeed: number;
  color: string;
  isSparkle: boolean;
  angle: number;
  spinSpeed: number;
}

export default function ProductRingScroll({ sequenceConfig }: ProductRingScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload Images
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    const totalFrames = sequenceConfig.frameCount;

    // Helper to format frame filename with padding
    const getFrameUrl = (index: number) => {
      let frameNum = String(index);
      if (sequenceConfig.zeroPadding > 0) {
        frameNum = frameNum.padStart(sequenceConfig.zeroPadding, '0');
      }
      return `${sequenceConfig.folder}/${sequenceConfig.prefix}${frameNum}.${sequenceConfig.extension}`;
    };

    // Preload all frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
        
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame: ${img.src}`);
        // Increment count even on error to bypass loading block
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      active = false;
    };
  }, [sequenceConfig]);

  // Handle Canvas Drawing based on Scroll Progress
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (progress: number) => {
      const totalFrames = images.length;
      // Convert progress (0-1) to frame index (0 to totalFrames - 1)
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(progress * totalFrames)
      );

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aspect Ratio calculation (Cover fit for full width/height bleed)
      const wRatio = canvas.width / img.width;
      const hRatio = canvas.height / img.height;
      const ratio = Math.max(wRatio, hRatio);

      // Cover scaling factor
      const scaleFactor = 1.0;
      const newWidth = img.width * ratio * scaleFactor;
      const newHeight = img.height * ratio * scaleFactor;
      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    // Listen to scroll progress changes
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      requestAnimationFrame(() => drawFrame(latest));
    });

    // Initial render of first frame
    drawFrame(scrollYProgress.get());

    return () => unsubscribe();
  }, [isLoaded, images, scrollYProgress]);

  // Handle Resize for both canvases
  useEffect(() => {
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      [canvasRef.current, particlesCanvasRef.current].forEach((canvas) => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      });
      
      // Force redraw of image frame on resize
      if (images.length > 0 && isLoaded) {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const progress = scrollYProgress.get();
          const frameIndex = Math.min(
            images.length - 1,
            Math.floor(progress * images.length)
          );
          const img = images[frameIndex];
          if (img && img.complete && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const wRatio = canvas.width / img.width;
            const hRatio = canvas.height / img.height;
            const ratio = Math.max(wRatio, hRatio);
            const scaleFactor = 1.0;
            const newWidth = img.width * ratio * scaleFactor;
            const newHeight = img.height * ratio * scaleFactor;
            const x = (canvas.width - newWidth) / (2 * dpr);
            const y = (canvas.height - newHeight) / (2 * dpr);
            ctx.drawImage(img, x, y, newWidth / dpr, newHeight / dpr);
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial trigger
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images, scrollYProgress]);

  // Particle Effects Engine
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const maxParticles = 60;

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.tx = e.clientX - rect.left;
      mouseRef.current.ty = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize Particles
    const createParticle = (initY = false): Particle => {
      const rect = canvas.getBoundingClientRect();
      const isSparkle = Math.random() > 0.75;
      return {
        x: Math.random() * rect.width,
        y: initY ? Math.random() * rect.height : rect.height + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.8 + 0.2),
        size: isSparkle ? Math.random() * 2 + 1.5 : Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        color: isSparkle ? '#FFFFFF' : '#C0C0C0',
        isSparkle,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
      };
    };

    // Populate initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // Render loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;

      // Get scroll velocity effect
      const currentScrollVelocity = Math.abs(scrollYProgress.getVelocity() || 0);
      const turbulence = Math.min(4, currentScrollVelocity * 10);

      particles.forEach((p, index) => {
        // Move particle
        p.y += p.vy - turbulence * 0.5;
        p.x += p.vx + Math.sin(p.angle) * 0.2 + (mouseRef.current.x - rect.width / 2) * 0.001;
        p.angle += p.spinSpeed;

        // Twinkle sparkle particles
        if (p.isSparkle) {
          p.alpha = 0.3 + Math.sin(p.angle * 4) * 0.4;
        }

        // Draw particle
        ctx.beginPath();
        if (p.isSparkle) {
          // Draw a small four-point diamond sparkle
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
          ctx.lineWidth = 1;
          
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 2);
          ctx.lineTo(p.size / 2, 0);
          ctx.lineTo(0, p.size * 2);
          ctx.lineTo(-p.size / 2, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          
          ctx.restore();
        } else {
          // Draw standard circular metallic dust particle
          ctx.fillStyle = `rgba(192, 192, 192, ${p.alpha})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Recycle particles that move off screen
        if (p.y < -20 || p.x < -20 || p.x > rect.width + 20) {
          particles[index] = createParticle(false);
        }
      });

      // Draw subtle ambient vignette glow
      const gradient = ctx.createRadialGradient(
        rect.width / 2,
        rect.height / 2,
        rect.width * 0.1,
        rect.width / 2,
        rect.height / 2,
        rect.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#ffffff]">
      {/* Preloading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#ffffff] z-[999] flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-12 h-12 text-silver-chrome animate-pulse"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 5L63 38L96 50L63 62L50 95L37 62L4 50L37 38L50 5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-sm font-semibold tracking-[0.4em] uppercase text-[#0B5E64] mt-4">
              ELARA SILVER
            </h3>
            <span className="text-[10px] tracking-[0.25em] text-black/40 uppercase">
              Forging Eternity
            </span>
          </div>

          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full mt-2">
            <div
              className="h-full bg-gradient-to-r from-silver-chrome to-white transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-[10px] tracking-widest text-silver-chrome font-mono">
            {loadProgress}%
          </span>
        </div>
      )}

      {/* Sticky Canvas Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10 flex items-center justify-center bg-radial from-neutral-900 via-black to-black">
        {/* Subtle cinematic glowing light backdrop behind the ring */}
        <div className="absolute inset-0 bg-silver-glow opacity-80 pointer-events-none" />

        {/* Ring Image Sequence Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute w-full h-full object-cover pointer-events-none select-none transition-opacity duration-1000"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Interactive Overlay Particles Canvas */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute w-full h-full pointer-events-none select-none z-15"
        />
      </div>
    </div>
  );
}
