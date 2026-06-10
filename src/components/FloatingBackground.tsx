'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Shape = ({ children, initialPosition, size, duration, delay }: any) => {
  return (
    <motion.div
      initial={initialPosition}
      animate={{
        x: [initialPosition.x, initialPosition.x + 100, initialPosition.x - 50, initialPosition.x],
        y: [initialPosition.y, initialPosition.y - 150, initialPosition.y + 100, initialPosition.y],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className="fixed pointer-events-none z-0 opacity-20"
      style={{ width: size, height: size }}
    >
      {children}
    </motion.div>
  );
};

export const FloatingBackground = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Massive Dashed Circle */}
      <Shape 
        size="40rem" 
        initialPosition={{ x: -100, y: 100 }} 
        duration={35} 
        delay={0}
      >
        <div className="w-full h-full border-[1.5px] border-primary/20 border-dashed rounded-full" />
      </Shape>

      {/* Technical Blueprint Shard */}
      <Shape 
        size="30rem" 
        initialPosition={{ x: 1400, y: 150 }} 
        duration={45} 
        delay={2}
      >
        <div className="w-full h-full border border-primary/10 rounded-[4rem] bg-linear-to-br from-primary/5 to-transparent backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-10 left-10 w-[1px] h-32 bg-primary/20" />
          <div className="absolute top-10 left-10 w-32 h-[1px] bg-primary/20" />
        </div>
      </Shape>

      {/* Floating Geometric Hexagon Accent */}
      <Shape 
        size="25rem" 
        initialPosition={{ x: 300, y: 700 }} 
        duration={30} 
        delay={5}
      >
        <div className="w-full h-full border border-white/5 bg-secondary/10 backdrop-blur-3xl rotate-12 flex items-center justify-center">
            <div className="w-1/2 h-1/2 border border-primary/20 animate-pulse" />
        </div>
      </Shape>

      {/* Prismatic Technical Beam */}
      <Shape 
        size="50rem" 
        initialPosition={{ x: 1200, y: 800 }} 
        duration={50} 
        delay={1}
      >
        <div className="w-full h-[1px] bg-linear-to-r from-transparent via-primary/30 to-transparent rotate-[-45deg]" />
      </Shape>

      {/* Corner Node HUD */}
      <Shape 
        size="15rem" 
        initialPosition={{ x: 800, y: -100 }} 
        duration={25} 
        delay={8}
      >
        <div className="w-full h-full border-t border-l border-primary/20 rounded-tl-3xl opacity-50">
          <div className="p-4 space-y-1">
            <div className="h-1 w-12 bg-primary/20" />
            <div className="h-1 w-8 bg-primary/20" />
          </div>
        </div>
      </Shape>
    </div>
  );
};
