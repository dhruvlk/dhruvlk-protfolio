'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, Variants } from 'framer-motion';
import { DATA } from '@/const/data';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const FloatingShape = ({ className, delay = 0, duration = 20 }: { className?: string; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.1, 0.25, 0.1],
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute pointer-events-none z-0 ${className}`}
  />
);

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax Values for Scroll
  const yImageScroll = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const rotatePlateScroll = useTransform(scrollYProgress, [0, 1], ["-8deg", "8deg"]);
  const textDrift = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Mouse Tracking for 3D Parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 100, damping: 30 });
  const springY = useSpring(my, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const containerVars: Variants = {
    initial: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    } as any
  };

  return (
    <section
      ref={containerRef}
      id="about"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        mx.set(0); my.set(0); setIsHovered(false);
      }}
      className="py-24 md:py-40 lg:py-56 bg-[#020617] transition-colors duration-500 relative overflow-hidden"
    >
      <div className={mounted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>

        {/* --- GLOBAL ATMOSPHERIC CORE & ROAMING SHAPES --- */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.03)_0%,transparent_60%)]" />
        <div className="absolute top-1/3 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] animate-morph -z-10" />

        {/* Roaming Technical Accents */}
        <FloatingShape className="top-[10%] left-[5%] w-32 h-32 border border-primary/10 rounded-full" delay={0} duration={30} />
        <FloatingShape className="top-[40%] right-[10%] w-64 h-64 border-l border-b border-primary/5 rounded-bl-[5rem]" delay={2} duration={45} />
        <FloatingShape className="bottom-[20%] left-[15%] w-48 h-48 border border-white/5 rounded-tr-[4rem]" delay={4} duration={35} />
        <FloatingShape className="top-1/2 left-1/2 w-96 h-96 border border-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" delay={1} duration={60} />
        <FloatingShape className="bottom-[5%] right-[20%] w-40 h-40 border-r border-t border-primary/10 rounded-full" delay={3} duration={25} />

        {/* --- MOBILE & TABLET CORE ARCHITECTURE (lg:hidden) --- */}
        <div className="lg:hidden w-full relative z-10 py-24 space-y-20">
          <div className="text-center space-y-12 px-6 relative">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-3xl shadow-2xl"
              >
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-primary leading-none">Strategic_Matrix</span>
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-[0.8] mix-blend-difference">
                  CORE<br />
                  <span className="text-transparent stroke-text italic" style={{ WebkitTextStroke: '2.5px var(--primary)' }}>PHILOSOPHY</span>
                </h2>
                <div className="h-[2px] w-32 bg-linear-to-r from-transparent via-primary/40 to-transparent mx-auto" />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-foreground/90 font-medium leading-relaxed italic max-w-2xl mx-auto px-4 opacity-95 drop-shadow-lg">
              <span className="text-primary font-black not-italic text-3xl mr-2">"</span>
              {DATA.about.content}
              <span className="text-primary font-black not-italic text-3xl ml-2">"</span>
            </p>

            {/* Glass-Circuit Technical Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
              {[
                { id: '01', label: 'STRATEGY', desc: 'SCALABLE_CORE', tag: 'ARCH' },
                { id: '02', label: 'PRECISION', desc: 'KINETIC_FLOW', tag: 'CORE' },
                { id: '03', label: 'IMPACT', desc: 'RESULT_MODULE', tag: 'EXEC' }
              ].map((mod, i) => (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[2.5rem] text-left overflow-hidden hover:border-primary/30 transition-all duration-700 hover:shadow-[0_20px_50px_-20px_var(--primary-20)]"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-10 h-10 border border-primary/20 rounded-xl flex items-center justify-center text-[10px] font-black text-primary group-hover:bg-primary group-hover:text-background transition-all">
                      {mod.id}
                    </div>
                    <span className="text-[8px] font-black text-muted tracking-widest">{mod.tag}</span>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <div className="text-sm font-black uppercase tracking-[0.4em] text-foreground group-hover:text-primary transition-colors">{mod.label}</div>
                    <div className="text-[10px] font-bold text-muted/40 uppercase tracking-widest leading-loose">{mod.desc}</div>
                  </div>

                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-br from-transparent to-primary/5 -z-10 group-hover:scale-150 transition-transform duration-1000" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DESKTOP ARCHITECTURE (hidden lg:block) --- */}
        <div className="hidden lg:block w-full max-w-[1800px] mx-auto relative z-10 px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

            {/* Portrait Architecture Area */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 relative perspective-2000"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 bg-secondary/10 backdrop-blur-3xl group">
                <Image
                  src={DATA.aboutImage}
                  alt={DATA.name}
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                <div className="absolute top-6 left-6 p-4 border border-primary/20 rounded-2xl bg-background/60 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="text-[8px] font-black text-primary tracking-widest uppercase mb-1">Source_Capture</div>
                  <div className="text-[10px] font-black text-foreground uppercase tracking-widest">{DATA.name}</div>
                </div>
                <div className="absolute bottom-6 right-6 flex gap-1">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-6 bg-primary/20" />)}
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -left-10 w-40 h-40 border border-primary/5 rounded-full border-dashed -z-10"
              />
            </motion.div>

            {/* Strategic Narrative Area */}
            <motion.div
              variants={containerVars}
              initial="initial"
              whileInView="visible"
              className="lg:col-span-7 flex items-center"
            >
              <div className="space-y-12 relative w-full">
                <div className="space-y-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-6"
                  >
                    <div className="h-[2px] w-12 bg-primary/40" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 italic">System_Archive // [Area_002]</span>
                  </motion.div>

                  <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-7xl xl:text-[7.6rem] font-black uppercase tracking-tighter leading-[0.85] lg:leading-[0.8]">
                    Core<br />
                    <span className="text-transparent stroke-text lg:pl-4" style={{ WebkitTextStroke: '2px var(--primary)' }}>Philosophy</span>
                  </h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-2 w-64 bg-linear-to-r from-primary via-emerald-500 to-transparent origin-left rounded-full mt-4"
                  />
                </div>
                <div className="max-w-4xl space-y-16">
                  <p className="text-lg md:text-xl text-justify text-muted/80 leading-relaxed font-semibold italic border-l-4 border-primary/30 pl-8">
                    "{DATA.about.content}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 border-t border-white/5">
                    {[
                      { id: '01', label: 'STRATEGY', desc: 'Scalable Systems Architect', tag: 'v4.0' },
                      { id: '02', label: 'PRECISION', desc: 'High-Fidelity Interaction', tag: 'A_L7' },
                      { id: '03', label: 'IMPACT', desc: 'Conversion Driven Growth', tag: 'RES_OK' }
                    ].map((mod, i) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-12">
                          <span className="text-[10px] font-black text-primary/30 group-hover:text-primary transition-colors">[{mod.id}]</span>
                          <span className="text-[8px] font-mono text-muted/30 group-hover:text-muted transition-colors tracking-tighter">{mod.tag}</span>
                        </div>
                        <div className="space-y-1 relative z-10">
                          <div className="text-xs font-black uppercase tracking-[0.3em] text-foreground group-hover:text-primary transition-colors">{mod.label}</div>
                          <div className="text-[8px] font-bold text-muted/60 uppercase tracking-widest leading-loose">{mod.desc}</div>
                        </div>
                        <div className="absolute -bottom-4 -right-2 text-[4rem] font-black opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity uppercase italic">
                          {mod.id}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Global Gradient Mesh */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-linear-to-t from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-0" />
      </div>
    </section>
  );
};
