import React, { useEffect, useRef } from 'react';

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, active: false };
    const scroll = { y: 0 };
    const particleCount = 60;
    const connectionDistance = 200;
    const mouseConnectionDistance = 250;
    const themeColor = isDark ? '#E1B46D' : '#C59B5F';
    const lineColor = isDark ? '225, 180, 109' : '197, 155, 95';

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        // Normal movement
        this.x += this.vx;
        this.y += this.vy;

        // Mouse influence - subtle attraction
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            this.x += dx * 0.01;
            this.y += dy * 0.01;
          }
        }

        // Boundary check
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        // Apply scroll parallax to the drawing position
        const drawY = this.y - (scroll.y * 0.15);
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = themeColor;
        ctx.fill();
        
        ctx.shadowBlur = isDark ? 10 : 5;
        ctx.shadowColor = themeColor;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: particleCount }, () => new Particle(canvas.width, canvas.height));
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
      ctx.shadowBlur = 0;

      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);

        // Connections between particles
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
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity * (isDark ? 0.2 : 0.15)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connections to mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - (p.y - (scroll.y * 0.15));
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - (scroll.y * 0.15));
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = (1 - dist / mouseConnectionDistance) * 0.5;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ background: 'transparent' }}
    />
  );
};
