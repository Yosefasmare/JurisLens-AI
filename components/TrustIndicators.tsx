'use client';

import React from 'react';
import { motion } from 'framer-motion';

const indicators = [
  {
    icon: "✅",
    metric: "98%",
    description: "summarization accuracy",
    delay: 0.2
  },
  {
    icon: "🔒",
    metric: "GDPR & HIPAA",
    description: "Compliant",
    delay: 0.3
  },
  {
    icon: "📚",
    metric: "100,000+",
    description: "legal documents trained",
    delay: 0.4
  },
  {
    icon: "🧑‍⚖️",
    metric: "Legal Expert",
    description: "Reviewed",
    delay: 0.5
  }
];

const TrustIndicators = () => {
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
          Why Trust Our AI?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: indicator.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#5EF1FF]/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{indicator.icon}</div>
              <h3 className="text-3xl font-bold mb-2 text-white">{indicator.metric}</h3>
              <p className="text-gray-300">{indicator.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators; 