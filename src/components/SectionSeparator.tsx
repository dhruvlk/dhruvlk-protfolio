'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

export const SectionSeparator = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return <div className="w-full h-12 bg-background" />;

   return (
      <div className="w-full relative h-48 flex items-center justify-center bg-background overflow-hidden selection:bg-primary selection:text-black">

         {/* Background Fracture Atmosphere */}
         <div className="absolute inset-x-0 h-24 bg-primary/5 blur-[80px] opacity-20" />

         {/* The Prismatic Rift Rails */}
         <div className="absolute inset-x-0 h-[1px] flex items-center justify-center gap-0 pointer-events-none">
            <motion.div
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="w-[45%] h-full bg-linear-to-r from-transparent via-primary/40 to-primary origin-right"
            />
            <div className="w-32" /> {/* The Rift Gap */}
            <motion.div
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="w-[45%] h-full bg-linear-to-l from-transparent via-primary/40 to-primary origin-left"
            />
         </div>

         {/* Specialized RIFT Telemetry HUD */}
         <div className="absolute inset-x-12 flex justify-between items-center opacity-40">
            <div className="flex flex-col gap-1">
               <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary">Rift_Sync // L9</span>
               <div className="flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-primary/20" />
                  <span className="text-[8px] font-bold text-foreground tabular-nums tracking-widest uppercase">Protocol: V4.0</span>
               </div>
            </div>
            <div className="flex flex-col items-end gap-1">
               <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary">Uplink_Security</span>
               <div className="flex items-center gap-2">
                  <span className="text-[8px] font-bold text-foreground tabular-nums tracking-widest uppercase">Signal: Locked</span>
                  <div className="w-8 h-[2px] bg-primary/20" />
               </div>
            </div>
         </div>

         {/* The Central Fracture Node */}
         <div className="relative z-10 flex items-center justify-center">
            {/* Kinetic Energy Arcs (SVG) */}
            <svg className="absolute w-[400px] h-32 pointer-events-none opacity-30">
               <motion.path
                  d="M 120,64 Q 200,20 280,64"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               />
               <motion.path
                  d="M 120,64 Q 200,108 280,64"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               />
            </svg>

            {/* Glassmorphic Data Core */}
            <motion.div
               initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
               className="relative w-24 h-12 bg-background/40 backdrop-blur-3xl border border-primary/30 rounded-lg flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] group"
            >
               {/* Internal Scanning Bar */}
               <motion.div
                  animate={{ x: [-60, 60] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-8 bg-linear-to-r from-transparent via-primary/20 to-transparent rotate-12"
               />

               <div className="relative flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground group-hover:text-primary transition-colors">Feature</span>
               </div>
            </motion.div>
         </div>

         {/* Environmental Data Stream */}
         <div className="absolute inset-x-0 bottom-10 flex justify-center gap-24 opacity-10">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="text-[6px] font-mono text-primary animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                  0x{Math.floor(Math.random() * 9999).toString(16)} // ARCH_DATA_STABLE
               </div>
            ))}
         </div>

         {/* Atmospheric Vertical Fade */}
         <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
      </div>
   );
};
