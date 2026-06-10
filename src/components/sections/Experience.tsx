'use client';

import { motion, useScroll, useTransform, useSpring, Variants, AnimatePresence } from 'framer-motion';
import { DATA } from '@/const/data';
import React, { useState, useEffect, useRef } from 'react';

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

const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start group`}
    >
      {/* Date Module (Architectural) */}
      <div className={`md:col-span-4 flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:order-last md:items-start md:text-left'}`}>
        <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-2">Protocol_Period</div>
        <div className="text-2xl md:text-3xl font-black text-foreground tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
          {exp.period}
        </div>
      </div>

      {/* Central Node Visual */}
      <div className="hidden md:flex md:col-span-1 justify-center relative">
        <div className="relative z-20">
          <motion.div
            animate={isHovered ? { scale: [1, 1.5, 1], rotate: 180 } : {}}
            className="w-6 h-6 bg-background border-2 border-primary rounded-lg flex items-center justify-center transform rotate-45"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 2.5 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl -z-10"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Card (Glassmorphic) */}
      <div className={`md:col-span-7 relative ${index % 2 === 1 ? 'md:order-first' : ''}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 md:p-10 bg-secondary/20 backdrop-blur-3xl border border-white/5 rounded-[2rem] group-hover:border-primary/40 transition-all duration-700 shadow-2xl relative overflow-hidden"
        >
          {/* Background Texture for Card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary/40 group-hover:w-12 transition-all duration-700" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">System_Role</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">{exp.role}</h3>
            <div className="text-lg md:text-xl font-bold bg-linear-to-r from-emerald-400 to-primary bg-clip-text text-transparent italic">
              @ {exp.company}
            </div>
          </header>

          <p className="text-muted/80 font-semibold italic text-lg leading-relaxed border-l-2 border-white/10 pl-6 py-2">
            "{exp.description}"
          </p>

          {/* Technical HUD Elements inside card */}
          <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-primary/20 group-hover:bg-primary/60 transition-colors" />)}
            </div>
            <div className="text-[8px] font-black uppercase text-muted tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all">
              Exec_Verified_0{index + 1}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const railProgress = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  if (!mounted) return (
    <section ref={containerRef} id="experience" className="py-56 bg-background relative overflow-hidden" />
  );

  return (
    <section ref={containerRef} id="experience" className="py-56 px-6 md:px-10 bg-background relative overflow-hidden transition-colors duration-500">

      {/* --- AMBIENT ARCHITECTURE --- */}
      <div className="absolute top-1/4 left-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[160px] animate-morph animate-drift" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] animate-morph animate-drift" style={{ animationDirection: 'reverse' }} />

      <FloatingShape className="top-[15%] left-[10%] w-32 h-32 border border-primary/10 rounded-full" delay={0} duration={25} />
      <FloatingShape className="bottom-[10%] right-[5%] w-48 h-48 border-b border-r border-primary/5 rounded-br-[4rem]" delay={3} duration={40} />

      {/* Drifting Background Typography */}
      <motion.div
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-[-5%] text-[15rem] font-black opacity-[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap text-transparent stroke-text leading-none uppercase italic"
        // @ts-ignore
        style={{ WebkitTextStroke: '2px var(--foreground)' }}
      >
        Trajectory
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 md:mb-40 space-y-6 md:space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 px-5 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-xl w-fit mx-auto md:mx-0"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-primary">Evolutionary_Steps // Succession</span>
          </motion.div>

          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] lg:leading-[0.85]">
            Professional <span className="block bg-linear-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent italic drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">Succession.</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-2 w-64 bg-linear-to-r from-primary via-emerald-500 to-transparent origin-left rounded-full mx-auto md:mx-0 mt-4" 
          />
        </header>

        <div className="relative">
          {/* The Cyber-Rail (Scroll Managed) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-white/5 z-0">
            <motion.div
              style={{ height: railProgress }}
              className="absolute top-0 left-0 w-full bg-linear-to-b from-primary via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />
            {/* Floating Rail Indicator */}
            <motion.div
              style={{ top: railProgress }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-1 bg-primary blur-[2px] z-10"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {DATA.experience.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

