'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]"
        >
          What Our Users Say
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
            <div className="text-4xl mb-6">📝</div>
            <h3 className="text-2xl font-bold mb-4 text-white">No Testimonials Yet</h3>
            <p className="text-gray-300 mb-8">
              We&apos;re just getting started! Be the first to share your experience with our AI document summarization tool.
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#5EF1FF] text-[#1F1F2E] py-3 px-8 rounded-md font-medium hover:bg-[#4ad1e0] transition-colors"
              >
                Share Your Experience
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Placeholder for future testimonials carousel */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            Coming soon: Testimonials from legal firms and startups
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 