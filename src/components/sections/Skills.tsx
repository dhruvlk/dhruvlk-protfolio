'use client';

import { motion, Variants, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { DATA } from '@/const/data';
import React, { useState, useEffect } from 'react';

// Generates a Cyber-style abbreviation for missing logos
const getInitials = (name: string) => {
  if (name.length <= 3) return name.toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const FloatingShape = ({ className, delay = 0, duration = 20 }: { className?: string; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.05, 0.15, 0.05],
      x: [0, 50, -50, 0],
      y: [0, -50, 50, 0],
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

const SkillCard = ({ skill, index, groupIdx }: { skill: string; index: number; groupIdx: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for individual card parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springX = useSpring(mx, { stiffness: 100, damping: 20 });
  const springY = useSpring(my, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const shadowTranslateX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const shadowTranslateY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: (groupIdx * 0.1) + (index * 0.05),
        ease: [0.16, 1, 0.3, 1]
      }}
      className="perspective-2000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{ rotateX, rotateY }}
        className="relative group cursor-crosshair preserve-3d"
      >
        {/* Dynamic Glow Shadow */}
        <motion.div
          style={{ x: shadowTranslateX, y: shadowTranslateY }}
          className="absolute -inset-2 bg-primary/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
        />

        {/* The Card Body */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 5 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3
          }}
          className="relative px-6 py-5 bg-secondary/30 backdrop-blur-2xl border border-white/5 rounded-2xl flex items-center gap-5 group-hover:border-primary/40 group-hover:bg-secondary/50 transition-all duration-700 shadow-2xl overflow-hidden"
        >
          {/* Glass Specular Highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {/* Animated Gradient Border on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-2xl p-[1px] bg-linear-to-br from-primary/50 via-transparent to-primary/50 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Skill Icon with Magnetic Feel */}
          <motion.div
            style={{ translateZ: 50 }}
            className="relative w-12 h-12 flex items-center justify-center shrink-0"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:rotate-12 transition-all duration-700" />
            <div className="absolute inset-0 border border-primary/20 rounded-xl group-hover:scale-110 group-hover:border-primary/60 transition-all duration-500" />

            {/* Morphing Shape behind logo */}
            <div className="absolute w-8 h-8 bg-primary/20 animate-morph blur-sm group-hover:bg-primary/40 transition-colors" />

            <span className="relative text-[11px] font-black text-primary z-10">
              {getInitials(skill)}
            </span>
          </motion.div>

          <div className="flex flex-col relative z-20">
            <span className="text-sm font-black uppercase tracking-widest text-foreground/80 group-hover:text-primary transition-colors duration-500">
              {skill}
            </span>
            <div className="flex items-center gap-2 mt-1 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="h-[2px] w-12 bg-linear-to-r from-primary/40 to-transparent rounded-full" />
            </div>
          </div>

          {/* Decorative Corner Target markers */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
            <div className="w-[2px] h-3 bg-primary" />
            <div className="w-3 h-[2px] bg-primary" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Skills = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVars: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  if (!mounted) return null;

  return (
    <section id="skills" className="py-48 px-6 md:px-10 bg-background relative overflow-hidden transition-colors duration-500">

      {/* --- AMBIENT ARTIFICIAL INTELLIGENCE LAYERS --- */}

      {/* Morphing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-morph animate-drift" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] animate-morph animate-drift" style={{ animationDirection: 'reverse' }} />

      {/* Floating Geometric Elements */}
      <FloatingShape className="top-[10%] left-[5%] w-24 h-24 border border-primary/20 rounded-full" delay={0} duration={25} />
      <FloatingShape className="bottom-[15%] right-[10%] w-40 h-40 border-t border-l border-primary/10 rounded-tr-[3rem]" delay={2} duration={30} />
      <FloatingShape className="top-1/2 left-[80%] w-16 h-16 bg-primary/5 rounded-lg rotate-12" delay={5} duration={18} />

      {/* Floating Background Typography (Dynamic) */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[-10%] text-[20rem] font-black pointer-events-none select-none tracking-tighter text-transparent stroke-text leading-none whitespace-nowrap"
        style={{ WebkitTextStroke: '2px var(--foreground)' }}
      >
        CORE_TECH
      </motion.div>

      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mask-radial">
        <div className="w-full h-full bg-[linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 md:mb-32 space-y-6 md:space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-[1px] bg-primary group-hover:w-24 transition-all duration-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary animate-pulse">Neural_Network [v0.8]</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] lg:leading-[0.8]"
          >
            <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: '1px var(--muted)' }}>Powering</span>
            <span className="bg-linear-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent italic md:pl-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">Vision.</span>
          </motion.h2>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-2 w-64 bg-linear-to-r from-primary via-emerald-500 to-transparent origin-left rounded-full mt-4" 
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-muted text-lg md:text-xl font-medium italic max-w-2xl border-l-2 border-primary/20 pl-6 md:pl-8 pt-4 leading-relaxed"
          >
            A curated selection of industrial-grade technologies meticulously integrated to deliver elite digital experiences.
          </motion.p>
        </header>

        <motion.div
          variants={containerVars}
          initial="initial"
          whileInView="whileInView"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {DATA.skills.map((group, groupIdx) => (
            <div key={group.category} className="space-y-12 relative group/module">
              {/* Module Header with Glow Effect */}
              <div className="relative border-b border-white/5 pb-8 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-linear-to-r from-primary/50 to-transparent -translate-x-full group-hover/module:translate-x-0 transition-transform duration-1000" />

                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="text-[9px] font-black text-primary uppercase tracking-[0.4em] mb-1">0{groupIdx + 1}_Component</div>
                    <h3 className="text-2xl font-black uppercase tracking-widest text-foreground group-hover/module:text-primary transition-colors duration-500">
                      {group.category}
                    </h3>
                  </div>
                  <div className="text-4xl font-black text-primary/5 group-hover/module:text-primary/20 transition-colors">
                    {String(groupIdx + 1).padStart(2, 'x')}
                  </div>
                </div>
              </div>

              {/* Skill Cards Stack */}
              <div className="grid grid-cols-1 gap-8">
                {group.items.map((skill, i) => (
                  <SkillCard key={skill} skill={skill} index={i} groupIdx={groupIdx} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Extreme Foreground Depth Element */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 left-[-10%] w-[500px] h-[500px] border border-primary/5 rounded-[4rem] group-hover:border-primary/10 transition-colors pointer-events-none"
      />
    </section>
  );
};