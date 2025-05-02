'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Upload Document",
    description: "Drag and drop your legal file",
    icon: "📄",
    delay: 0.2
  },
  {
    title: "AI Summarizes It",
    description: "Let Ai Summarize , extracts key clauses, obligations, and insights",
    icon: "🤖",
    delay: 0.4
  },
  {
    title: "Review & Share",
    description: "Read, download, or send your summary instantly",
    icon: "✅",
    delay: 0.6
  }
];

const HowItWorks = () => {
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
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#5EF1FF]/30 transition-all duration-300"
            >
              <div className="text-4xl mb-6">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;