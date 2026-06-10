'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA } from '@/const/data';

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "pt-4" : "pt-0"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div
              className={`relative flex items-center justify-between transition-all duration-700 px-6 md:px-8 ${isScrolled
                ? "h-16 bg-background/40 backdrop-blur-3xl border border-white/5 rounded-full shadow-2xl"
                : "h-24 bg-transparent border-b border-white/5"
                }`}
            >
              {/* Logo / System ID */}
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                  <div className="absolute inset-0 border border-primary/40 rounded-lg rotate-45 group-hover:rotate-0 transition-transform duration-700 flex items-center justify-center">
                    <span className="text-xs font-black text-primary -rotate-45 group-hover:rotate-0 transition-transform">D</span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col -space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">DHRUV</span>

                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex flex-1 justify-center">
                <div className="flex items-center gap-1">
                  {DATA.navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-4 xl:px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] text-muted/60 hover:text-foreground transition-all group overflow-hidden"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                        layoutId="navHover"
                      />
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary rounded-full group-hover:w-4 transition-all duration-500 ease-out" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* CTA & Mobile Toggle */}
              <div className="flex items-center gap-4">
                <motion.a
                  href={(DATA as any).whatsapp || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:inline-flex px-8 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full emerald-glow shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]"
                >
                  Initiate_Hire
                </motion.a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/5 border border-white/10 rounded-full"
              >
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[1.5px] bg-primary rounded-full"
                />
                <motion.div
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-[1.5px] bg-primary rounded-full"
                />
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="w-5 h-[1.5px] bg-primary rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl xl:hidden flex flex-col p-10 pt-32"
          >
            {/* Close Button in Overlay */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-10 w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white/5 border border-white/10 rounded-full z-[70]"
            >
              <motion.div
                animate={{ rotate: 45, y: 7 }}
                className="w-6 h-[1.5px] bg-primary rounded-full"
              />
              <motion.div
                animate={{ opacity: 0 }}
                className="w-6 h-[1.5px] bg-primary rounded-full"
              />
              <motion.div
                animate={{ rotate: -45, y: -7 }}
                className="w-6 h-[1.5px] bg-primary rounded-full"
              />
            </button>

            <div className="flex flex-col gap-8">
              {DATA.navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-5xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors italic"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto space-y-10 border-t border-white/5 pt-10">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Secure_Portal</div>
                <a
                  href={(DATA as any).whatsapp || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-6 bg-primary text-black font-black uppercase tracking-[0.4em] text-xs rounded-2xl"
                >
                  Initiate_Uplink
                </a>
              </div>

              <div className="flex gap-8">
                {DATA.contact.socials.map((social) => (
                  <a key={social.label} href={social.href} className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">{social.label}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


