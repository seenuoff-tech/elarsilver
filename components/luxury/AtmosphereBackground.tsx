'use client';

import React, { useEffect, useRef } from 'react';

export default function AtmosphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      twinkle: boolean;
      speed: number;
    }[] = [];

    // Initialize 70 ambient luxury silver dust particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.4 + 0.1,
        twinkle: Math.random() > 0.6,
        speed: Math.random() * 0.015 + 0.005,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // Subtle light ray overlay
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.004)');
      gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
      gradient.addColorStop(0.75, 'rgba(255,255,255,0.003)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw and update silver dust and sparkles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (p.twinkle) {
          p.alpha += Math.sin(t * p.speed) * 0.05;
          if (p.alpha < 0.05) p.alpha = 0.05;
          if (p.alpha > 0.5) p.alpha = 0.5;
        }

        ctx.beginPath();
        if (p.radius > 1.3 && p.twinkle) {
          // 4-point Diamond Sparkle shape
          ctx.moveTo(p.x, p.y - p.radius * 2.5);
          ctx.lineTo(p.x + p.radius, p.y);
          ctx.lineTo(p.x, p.y + p.radius * 2.5);
          ctx.lineTo(p.x - p.radius, p.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#ffffff';
        } else {
          // Circular silver dust spec
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(192, 192, 192, ${p.alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame((timestamp) => draw(timestamp));
    };

    animationFrameId = requestAnimationFrame((timestamp) => draw(timestamp));

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
