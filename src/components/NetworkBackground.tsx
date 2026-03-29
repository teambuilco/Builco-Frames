import React, { useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useContext(AppContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let blobs: Blob[] = [];
    const mouse = { x: 0, y: 0, active: false };
    const scroll = { y: 0 };
    const particleCount = 60;
    const blobCount = 4;
    const connectionDistance = 200;
    const mouseConnectionDistance = 250;
    
    // Theme-dependent colors
    const themeColor = isDark ? '#E1B46D' : '#C59B5F';
    const lineColor = isDark ? '225, 180, 109' : '197, 155, 95';
    const blobColors = isDark 
      ? ['rgba(225, 180, 109, 0.03)', 'rgba(225, 180, 109, 0.02)'] 
      : ['rgba(197, 155, 95, 0.08)', 'rgba(225, 180, 109, 0.04)', 'rgba(240, 240, 240, 0.5)'];

    class Blob {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      angle: number;
      speed: number;

      constructor(width: number, height: number, color: string) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 600 + 400;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.2 + 0.1;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.color = color;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off boundaries with a large margin
        if (this.x < -this.radius / 2 || this.x > width + this.radius / 2) this.vx *= -1;
        if (this.y < -this.radius / 2 || this.y > height + this.radius / 2) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - (this.y - (scroll.y * 0.15));
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            this.x += dx * 0.01;
            this.y += dy * 0.01;
          }
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const drawY = this.y - (scroll.y * 0.15);
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = themeColor;
        ctx.fill();
        
        if (isDark) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = themeColor;
        }
      }
    }

    const init = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = Array.from({ length: particleCount }, () => new Particle(width, height));
      blobs = Array.from({ length: blobCount }, (_, i) => 
        new Blob(width, height, blobColors[i % blobColors.length])
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleScroll = () => {
      scroll.y = window.scrollY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw blobs first (background)
      if (!isDark) {
        blobs.forEach(b => {
          b.update(canvas.width, canvas.height);
          b.draw(ctx);
        });
      }

      ctx.shadowBlur = 0;

      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            const drawY1 = p.y - (scroll.y * 0.15);
            const drawY2 = p2.y - (scroll.y * 0.15);
            ctx.moveTo(p.x, drawY1);
            ctx.lineTo(p2.x, drawY2);
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity * (isDark ? 0.2 : 0.1)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - (p.y - (scroll.y * 0.15));
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - (scroll.y * 0.15));
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = (1 - dist / mouseConnectionDistance) * 0.4;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    
    init();
    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ background: 'transparent' }}
      />
      {/* Subtle grain/noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};
