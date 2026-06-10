'use client';

import { motion } from 'framer-motion';
import { DATA } from '@/const/data';
import React, { useState, useEffect } from 'react';

export const Education = () => {
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   return (
      <section id="education" className="py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-background relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />

         <div className="max-w-7xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center mb-16 md:mb-20 text-center"
            >
               <div className="px-4 py-1.5 border border-primary/20 rounded-full bg-primary/5 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Academic_Foundation</span>
               </div>
               <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none">
                  Education <span className="block sm:inline text-transparent stroke-text italic" style={{ WebkitTextStroke: '1px var(--foreground)' }}>History</span>
               </h2>
               <motion.div 
                 initial={{ scaleX: 0 }}
                 whileInView={{ scaleX: 1 }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                 className="h-2 w-64 bg-linear-to-r from-primary via-emerald-500 to-transparent rounded-full mx-auto mt-6" 
               />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {DATA.education.map((edu, index) => (
                  <motion.div
                     key={edu.school}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: index * 0.1 }}
                     className="group relative bg-secondary/10 backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 overflow-hidden"
                  >
                     {/* Background Index */}
                     <div className="absolute top-[-20%] right-[-10%] text-[10rem] font-black opacity-[0.03] italic pointer-events-none">
                        0{index + 1}
                     </div>

                     <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                           <div className="bg-primary/10 px-4 py-1 rounded-full border border-primary/20">
                              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{edu.period}</span>
                           </div>
                           <div className="text-[9px] font-bold text-muted uppercase tracking-[0.3em]">{edu.location}</div>
                        </div>

                        <div className="space-y-2">
                           <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                              {edu.school}
                           </h3>
                           <p className="text-lg text-muted/80 font-bold italic">
                              {edu.degree}
                           </p>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex gap-2">
                           {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />)}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
};
