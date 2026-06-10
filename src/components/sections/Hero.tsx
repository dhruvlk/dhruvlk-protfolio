'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { DATA } from '@/const/data';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const FloatingShape = ({ className, delay = 0, duration = 20 }: { className?: string; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.03, 0.08, 0.03],
      x: [0, 40, -40, 0],
      y: [0, -40, 40, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute pointer-events-none ${className}`}
  />
);

export const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse Tracking for Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-25px", "25px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-25px", "25px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-10 relative overflow-hidden bg-background pt-32 pb-20 transition-colors duration-500"
    >
      <div className={mounted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        {/* --- AMBIENT DIGITAL ATMOSPHERE --- */}
        <div className="absolute top-1/4 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px] animate-morph animate-drift" />
        <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/5 rounded-full blur-[80px] md:blur-[120px] animate-morph animate-drift" style={{ animationDirection: 'reverse' }} />

        {/* Floating Shapes */}
        <FloatingShape className="top-[15%] left-[10%] w-20 md:w-32 h-20 md:h-32 border border-primary/15 rounded-full" delay={0} duration={25} />
        <FloatingShape className="bottom-[20%] right-[10%] w-16 md:w-24 h-16 md:h-24 border-t border-l border-primary/10" delay={2} duration={18} />

        {/* Drifting Background Typography */}
        <motion.div
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[-10%] text-[10rem] md:text-[25rem] font-black opacity-[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap text-transparent stroke-text leading-none"
          // @ts-ignore
          style={{ WebkitTextStroke: '2px var(--foreground)' }}
        >
          ARCHITECT
        </motion.div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">

          {/* Left Side: Editorial Typography */}
          <motion.div
            variants={containerVars}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-8 lg:gap-10 lg:col-span-7 text-center lg:text-left"
          >
            <div className="space-y-6 lg:space-y-8 relative">
              <motion.div variants={itemVars} className="inline-block mx-auto lg:mx-0">
                <div className="flex items-center gap-4 px-5 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-xl">
                  <div className="relative flex h-2 w-2">
                    <div className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                    <div className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                    Core_Init // V.4.0
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVars}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter leading-[0.9] lg:leading-[0.8] uppercase"
              >
                <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: '1px var(--muted)' }}>Precision</span>
                <span className="block">Engineered</span>
                <span className="block bg-linear-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent italic pr-4 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  Excellence.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVars}
                className="text-sm md:text-lg lg:text-xl text-muted/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold italic border-l-4 border-primary/30 pl-6 md:pl-8"
              >
                {DATA.description}
              </motion.p>
            </div>

            <motion.div variants={itemVars} className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 md:px-14 py-4 md:py-6 bg-primary text-black text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full emerald-glow shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)]"
              >
                Launch Systems
              </motion.a>

              <div className="hidden sm:flex items-center gap-4 px-6 opacity-60">
                <div className="w-12 h-[1px] bg-muted/40" />
                <span className="text-[9px] font-black uppercase tracking-widest">Scroll To Explore</span>
              </div>
            </motion.div>

            <motion.div variants={itemVars} className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 pt-12 border-t border-white/5 mt-6">
              <div>
                <div className="text-3xl md:text-5xl font-black text-foreground relative inline-block">
                  05+
                  <span className="absolute -top-1 -right-4 text-primary text-xl animate-pulse">*</span>
                </div>
                <div className="text-[8px] md:text-[10px] font-bold text-muted uppercase tracking-[0.3em] mt-2 md:mt-3">Years Deep</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-foreground relative inline-block">
                  06+
                  <span className="absolute -top-1 -right-4 text-primary text-xl animate-pulse">*</span>
                </div>
                <div className="text-[8px] md:text-[10px] font-bold text-muted uppercase tracking-[0.3em] mt-2 md:mt-3">Deployments</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-foreground relative inline-block">
                  99%
                  <span className="absolute -top-1 -right-4 text-primary text-xl animate-pulse">*</span>
                </div>
                <div className="text-[8px] md:text-[10px] font-bold text-muted uppercase tracking-[0.3em] mt-2 md:mt-3">Performance</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Portrait Image Layer */}
          <div className="relative flex justify-center lg:justify-end lg:col-span-5 h-[400px] md:h-[650px] items-center perspective-2000 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotateX, rotateY, x: translateX, y: translateY }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative group w-full max-w-[280px] md:max-w-[420px] cursor-crosshair preserve-3d"
            >
              {/* --- FUTURISTIC HALO & ANIMATED BORDERS --- */}
              
              {/* Cinematic Pulse Glow */}
              <div className="absolute inset-[-40px] bg-primary/10 rounded-[4rem] blur-[80px] animate-pulse opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

              {/* Rotating Technical Dashed Border */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] border-[1.5px] border-dashed border-primary/20 rounded-[3.5rem] pointer-events-none"
              />

              {/* Floating Orbital Rings */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, -360]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-25px] border border-white/5 rounded-[4rem] pointer-events-none"
              />

              {/* HUD Corner Accents */}
              <div className="absolute top-[-10px] left-[-10px] w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl z-50" />
              <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-2xl z-50" />

              <div className="relative h-[350px] md:h-[530px] w-full overflow-hidden rounded-[3rem] bg-secondary border border-white/10 shadow-2xl z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src={DATA.heroImage}
                  alt={DATA.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>

              {/* Badge (Responsive Position) */}
              <motion.div
                style={{ translateZ: 100 }}
                className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 px-6 md:px-8 py-4 md:py-6 bg-background/90 backdrop-blur-2xl border border-white/10 rounded-2xl z-40 transform-gpu"
              >
                <div className="flex flex-col gap-1 md:gap-2">
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-muted">Core.Protocol</span>
                  <p className="text-xs md:text-base font-black italic tracking-widest text-primary">
                    DHRUV LALLUKARSHANWALA
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};


