import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';

export const VideoStrip = () => {
  const { theme } = useContext(AppContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force play and set speed for time-lapse effect
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.5;
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    }
  }, []);
  
  return (
    <section className="relative py-0 overflow-hidden bg-black h-[400px] md:h-[600px]">
      {/* Cinematic Frame Labels (Fixed Position) */}
      <div className="absolute top-12 left-10 z-30 flex items-center gap-3 opacity-60">
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white font-mono leading-none">
            BUILCO_LIVE_FEED
          </span>
          <span className="text-[8px] font-bold text-white/40 font-mono mt-1">
            SECTOR_MINING_ALPHA_09
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-12 right-10 z-30 opacity-60 text-right">
        <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-white font-mono">
          ISO_COMPLIANCE_8820
        </span>
        <span className="block text-[8px] font-bold text-white/40 font-mono mt-1">
          ENCRYPTED_STREAM_SECURE
        </span>
      </div>

      {/* Main Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradients & Overlays for Background Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 opacity-100" />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover grayscale brightness-75 contrast-125 scale-110"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-mine-with-many-trucks-42422-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gold/50" />
            <span className="text-gold font-black uppercase tracking-[0.6em] text-[10px]">Industrial Infrastructure</span>
            <div className="w-12 h-px bg-gold/50" />
          </div>

          <h2 className="text-5xl md:text-8xl font-helvetica font-black text-white uppercase tracking-tighter mb-6 leading-[0.9]">
            Industrial <span className="text-gold italic">Mastery</span>
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/40 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs"
          >
            <span>Precision Logistics</span>
            <span className="text-gold/30">•</span>
            <span>Strategic Extraction</span>
            <span className="text-gold/30">•</span>
            <span>Elite Connectivity</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic "Tape" Edges (Top & Bottom Bars) */}
      <div className="absolute inset-x-0 top-0 h-12 bg-black z-30 border-b border-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-black z-30 border-t border-white/10" />
      
      {/* HUD Lines */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-4 h-px bg-white" />
        <div className="absolute top-1/4 left-10 h-4 w-px bg-white" />
        
        <div className="absolute top-1/4 right-10 w-4 h-px bg-white" />
        <div className="absolute top-1/4 right-10 h-4 w-px bg-white" />
        
        <div className="absolute bottom-1/4 left-10 w-4 h-px bg-white" />
        <div className="absolute bottom-1/4 left-10 h-4 w-px bg-white" />
        
        <div className="absolute bottom-1/4 right-10 w-4 h-px bg-white" />
        <div className="absolute bottom-1/4 right-10 h-4 w-px bg-white" />
      </div>

      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </section>
  );
};
