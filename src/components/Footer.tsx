'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DATA } from '@/const/data';

const FloatingShape = ({ className, delay = 0, duration = 20 }: { className?: string; delay?: number; duration?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.1, 0.25, 0.1],
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
    className={`absolute pointer-events-none z-0 ${className}`}
  />
);

export const Footer = () => {
   const [time, setTime] = useState('');
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      const updateTime = () => {
         const now = new Date();
         setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
      };
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
   }, []);

   if (!mounted) return null;

   return (
      <footer className="py-32 px-6 md:px-10 bg-background relative overflow-hidden transition-colors duration-500 border-t border-white/5">

         {/* Massive Background Typography */}
         <div className="absolute bottom-[-5%] left-[-2%] text-[25rem] font-black opacity-[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap text-transparent stroke-text leading-none uppercase italic">
            {DATA.name.split(' ')[0]}
         </div>

         {/* Roaming Technical Accents */}
         <FloatingShape className="top-[10%] right-[10%] w-32 h-32 border border-primary/20 rounded-full" delay={1} duration={25} />
         <FloatingShape className="bottom-[15%] left-[10%] w-24 h-24 border-t border-l border-primary/20" delay={3} duration={20} />

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end">

               {/* Branding Module */}
               <div className="lg:col-span-5 space-y-10">
                  <div className="space-y-4">
                     <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        Architecting <br />
                        <span className="text-primary italic">The Future.</span>
                     </div>
                     <p className="text-muted/60 text-xs font-black uppercase tracking-[0.4em] leading-loose max-w-sm">
                        Precision engineered digital experiences for elite-scale operations.
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-6">
                     <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em]">Uplink_Channel</span>
                        <a href="tel:+917069866165" className="text-sm font-bold text-foreground hover:text-primary transition-colors tracking-widest">+91 7069866165</a>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-black text-primary uppercase tracking-[0.5em]">Base_Coordinates</span>
                        <span className="text-sm font-bold text-foreground tracking-widest">SURAT_INDIA</span>
                     </div>
                  </div>


               </div>

               {/* Navigation & Connection Module */}
               <div className="lg:col-span-7 flex flex-col md:items-end gap-12">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
                     <div className="space-y-6">
                        <div className="text-[9px] font-black text-primary uppercase tracking-[0.5em]">Navigation</div>
                        <div className="flex flex-col gap-4">
                           {DATA.navLinks.map(link => (
                              <a key={link.href} href={link.href} className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-colors">
                                 {link.label}
                              </a>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="text-[9px] font-black text-primary uppercase tracking-[0.5em]">Social_Ports</div>
                        <div className="flex flex-col gap-4">
                           {DATA.contact.socials.map(social => (
                              <a
                                 key={social.label}
                                 href={social.href}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-colors group flex items-center gap-2"
                              >
                                 {social.label}
                                 <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <div className="text-[9px] font-black text-primary uppercase tracking-[0.5em]">Contact_Uplink</div>
                        <div className="flex flex-col gap-4">
                           <a href={`mailto:${DATA.contact.email}`} className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-colors">
                              {DATA.contact.email}
                           </a>
                        </div>
                     </div>
                  </div>

                  <div className="pt-12 border-t border-white/5 w-full md:w-auto md:text-right">
                     <div className="text-[10px] font-black tracking-[0.5em] text-muted/30 uppercase">
                        &copy; {new Date().getFullYear()} DHRUV LALLUKARSHANWALA
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Subtle Background Accent Orbs */}
         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10 animate-morph" />
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[120px] -z-10 animate-drift" />
      </footer>
   );
};

