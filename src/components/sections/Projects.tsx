'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { DATA } from '@/const/data';
import Image from 'next/image';
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

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for card 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 100, damping: 20 });
  const springY = useSpring(my, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-2000"
    >
      <motion.a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ rotateX, rotateY }}
        className="relative block cursor-pointer bg-secondary/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-colors duration-700 group-hover:border-primary/40 preserve-3d"
      >
        {/* Parallax Image Component */}
        <div className="relative aspect-[16/11] overflow-hidden m-4 rounded-[1.8rem] bg-background">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-1000 scale-105 group-hover:scale-110 grayscale-[0.4] group-hover:grayscale-0"
          />

          {/* Technical HUD Overlay on Image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
          <div className="absolute top-4 left-4 p-3 bg-background/60 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
            <div className="text-[8px] font-black uppercase text-primary tracking-widest leading-none mb-1">Target_Id</div>
            <div className="text-[10px] font-black text-foreground">0{index + 1}_VNTUR</div>
          </div>

          {/* Dynamic Glare Effect */}
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(16,185,129,0.1), transparent 70%)`
            }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>

        <div className="p-10 pt-4 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-primary/40 group-hover:w-16 transition-all duration-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">0{index + 1} System_Output</span>
          </div>

          <h3 className="text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-muted/80 font-semibold italic text-lg md:text-xl leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t: string, j: number) => (
                <div key={j} className="px-3 py-1.5 bg-background border border-white/5 rounded-lg group-hover:border-primary/20 transition-colors">
                  <span className="text-[9px] font-black text-muted uppercase tracking-widest group-hover:text-primary transition-colors">
                    {t}
                  </span>
                </div>
              ))}
            </div>

            {project.liveLink && (
              <div className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-2xl hover:bg-primary/20 transition-all group/link relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary relative z-10">Live_Site</span>
                <svg
                  className="w-4 h-4 text-primary transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </motion.a>

      {/* Outer Architectural Floating Badge */}
      <motion.div
        style={{ translateZ: 100 }}
        className="absolute -top-6 -right-6 px-5 py-5 bg-background border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl pointer-events-none z-20"
      >
        <div className="text-[8px] font-black uppercase text-muted tracking-widest mb-1">Status</div>
        <div className="text-[10px] font-black text-primary italic">Live_Production</div>
      </motion.div>
    </motion.div>
  );
}

export const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const containerVars: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section ref={containerRef} id="projects" className="py-56 px-6 md:px-10 bg-background relative overflow-hidden transition-colors duration-500">
      <div className={mounted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>

        {/* --- AMBIENT ARCHITECTURE --- */}
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] animate-morph animate-drift" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] animate-morph animate-drift" style={{ animationDirection: 'reverse' }} />

        <FloatingShape className="top-[20%] right-[10%] w-32 h-32 border border-primary/10 rounded-full" delay={0} duration={25} />
        <FloatingShape className="bottom-[10%] left-[5%] w-48 h-48 border-b border-l border-primary/5 rounded-bl-[4rem]" delay={3} duration={40} />

        {/* Drifting Background Typography */}
        <motion.div
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[-5%] text-[15rem] font-black opacity-[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap text-transparent stroke-text leading-none uppercase italic"
          // @ts-ignore
          style={{ WebkitTextStroke: '2px var(--foreground)' }}
        >
          Engineering
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-40 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 px-5 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-xl w-fit"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Case_Studies // 2026</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]"
            >
              Selected <span className="block text-transparent stroke-text" style={{ WebkitTextStroke: '1px var(--primary)' }}>Ventures.</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-2 w-64 bg-linear-to-r from-primary via-emerald-500 to-transparent origin-left rounded-full mt-4"
            />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
            {DATA.projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

