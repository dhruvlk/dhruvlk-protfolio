'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(10, 'Message is too short').required('Required'),
});

export const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Message sent successfully!');
          resetForm();
        } else {
          alert('Failed to send message.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-10"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-foreground transition-colors text-sm"
            placeholder="Identity..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-foreground transition-colors text-sm"
            placeholder="Communication..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-widest text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className="w-full bg-transparent border-b border-foreground/10 py-4 outline-none focus:border-foreground transition-colors text-sm resize-none"
            placeholder="Intelligence..."
          />
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="btn-minimal w-full flex items-center justify-center gap-4"
        >
          {formik.isSubmitting ? 'Dispatching...' : 'Dispatch'}
          <span className="text-lg">→</span>
        </button>
      </form>
    </motion.div>
  );
};
