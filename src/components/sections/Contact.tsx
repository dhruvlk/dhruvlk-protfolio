'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { DATA } from '@/const/data';
import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const InputField = ({ label, id, type = "text", formik, placeholder }: any) => {
  const isError = formik.touched[id] && formik.errors[id];

  return (
    <div className="space-y-3 group">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[9px] font-black uppercase tracking-[0.4em] text-muted group-focus-within:text-primary transition-colors">
          {label}
        </label>
        {isError && (
          <span className="text-[8px] font-black uppercase text-red-500 animate-pulse">! Field_Required</span>
        )}
      </div>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={id}
            {...formik.getFieldProps(id)}
            placeholder={placeholder}
            rows={5}
            className={`w-full bg-secondary/30 backdrop-blur-xl border ${isError ? 'border-red-500/50' : 'border-white/5'} hover:border-primary/30 focus:border-primary/70 outline-none p-5 rounded-2xl text-[15px] font-semibold italic text-foreground transition-all duration-500 resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            {...formik.getFieldProps(id)}
            placeholder={placeholder}
            className={`w-full bg-secondary/30 backdrop-blur-xl border ${isError ? 'border-red-500/50' : 'border-white/5'} hover:border-primary/30 focus:border-primary/70 outline-none px-6 py-5 rounded-2xl text-[15px] font-semibold italic text-foreground transition-all duration-500`}
          />
        )}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-700" />
      </div>
    </div>
  );
};

export const Contact = () => {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => setMounted(true), []);

  const formRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 100, damping: 25 });
  const springY = useSpring(my, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const formik = useFormik({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      subject: Yup.string().required(),
      message: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setStatus('sending');
      setStatusMessage('Uplink_Init... Synchronizing Signals');

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          setStatus('success');
          setStatusMessage('Mission_Success: Transmission Locked');
          resetForm();
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          throw new Error();
        }
      } catch (err) {
        setStatus('error');
        setStatusMessage('System_Error: Signal Interrupted');
        setTimeout(() => setStatus('idle'), 5000);
      }
    },
  });

  return (
    <section id="contact" className="py-20 sm:py-32 md:py-56 px-6 md:px-10 bg-background relative overflow-hidden transition-colors duration-500">
      <div className={mounted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>

        {/* --- AMBIENT ARCHITECTURE --- */}
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[100px] md:blur-[180px] animate-morph animate-drift" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-500/5 rounded-full blur-[80px] md:blur-[140px] animate-morph animate-drift" style={{ animationDirection: 'reverse' }} />

        <FloatingShape className="top-[10%] left-[20%] w-24 h-24 md:w-32 md:h-32 border border-primary/10 rounded-full" delay={0} duration={25} />
        <FloatingShape className="bottom-[15%] right-[10%] w-32 h-32 md:w-48 md:h-48 border-b border-r border-primary/5 rounded-bl-[4rem]" delay={3} duration={40} />

        {/* Drifting Background Typography */}
        <motion.div
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-[-10%] text-[10rem] md:text-[20rem] font-black opacity-[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap text-transparent stroke-text leading-none uppercase"
          // @ts-ignore
          style={{ WebkitTextStroke: '1px var(--foreground)' }}
        >
          Connection
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left Narrative Section */}
            <div className="lg:col-span-6 space-y-8 md:space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-xl w-fit"
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-primary">Mission_Uplink // Open_Channel</span>
              </motion.div>

              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
                Ready to <br />
                <span className="inline-block bg-linear-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent italic drop-shadow-[0_0_20px_rgba(16,185,129,0.4)] pr-4 md:pr-12">Synchronize?</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-1.5 md:h-2 w-48 md:w-64 bg-linear-to-r from-primary via-emerald-500 to-transparent origin-left rounded-full mt-2 md:mt-4"
              />

              <p className="text-base md:text-xl text-muted/80 leading-relaxed font-semibold italic border-l-2 md:border-l-4 border-primary/30 pl-6 md:pl-8 max-w-xl">
                "The architectural blueprint is ready. Launch a transmission to initiate the technical exchange."
              </p>

              <div className="space-y-8 md:space-y-10 pt-4 md:pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-1 md:space-y-2 overflow-hidden">
                    <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted">Uplink_Signal</div>
                    <a
                      href="tel:+917069866165"
                      className="text-base md:text-xl font-black text-foreground hover:text-primary transition-all duration-300 drop-shadow-2xl"
                    >
                      +91 7069866165
                    </a>
                  </div>
                  <div className="space-y-1 md:space-y-2 overflow-hidden">
                    <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted">Mission_Coordinates</div>
                    <div className="text-base md:text-xl font-black text-foreground drop-shadow-2xl">
                      Surat, India
                    </div>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2 overflow-hidden">
                  <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted">Direct_Access_Link</div>
                  <a
                    href={`mailto:${DATA.contact.email}`}
                    className="text-base md:text-xl lg:text-2xl font-black text-foreground hover:text-primary transition-all duration-300 drop-shadow-2xl break-all"
                  >
                    {DATA.contact.email}
                  </a>
                </div>

                <div className="flex flex-wrap gap-6 md:gap-10 pt-8 md:pt-10 border-t border-white/5">
                  {DATA.contact.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted hover:text-primary transition-colors relative group"
                    >
                      {social.label}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form Section (3D Parallax Card) */}
            <div className="lg:col-span-6 perspective-2000">
              <motion.div
                ref={formRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mx.set(0); my.set(0); }}
                style={{ rotateX, rotateY }}
                className="relative bg-secondary/10 backdrop-blur-3xl border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 shadow-2xl preserve-3d"
              >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 md:gap-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <InputField label="01_Name" id="name" formik={formik} placeholder="Enter your identity" />
                    <InputField label="02_Email" id="email" type="email" formik={formik} placeholder="Enter Your Email" />
                  </div>
                  <InputField label="03_Subject" id="subject" formik={formik} placeholder="Specify project scope" />
                  <InputField label="04_Message" id="message" type="textarea" formik={formik} placeholder="Details for evaluation..." />

                  <div className="pt-2 md:pt-4">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full relative group"
                    >
                      <div className="absolute -inset-1 bg-linear-to-r from-primary to-emerald-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative bg-primary px-6 md:px-10 py-4 md:py-6 rounded-full text-black text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] flex items-center justify-center gap-2 md:gap-4 transition-transform active:scale-95 disabled:opacity-50">
                        {status === 'sending' ? (
                          <div className="flex items-center gap-2">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            Send Message
                            <span className="text-lg md:text-xl group-hover:translate-x-2 transition-transform">→</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>

                {/* Status Overlay */}
                <AnimatePresence>
                  {status !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 px-4 md:px-6 py-2 md:py-3 bg-background/80 backdrop-blur-2xl border border-primary/20 rounded-xl z-50 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary italic whitespace-nowrap shadow-2xl"
                    >
                      {statusMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Digital HUD Decor */}
                <div className="absolute top-4 right-6 md:top-6 md:right-10 flex gap-1">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-3 md:h-4 bg-primary/10 group-hover:bg-primary/50 transition-colors" />)}
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

