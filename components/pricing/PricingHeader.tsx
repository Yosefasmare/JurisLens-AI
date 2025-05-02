'use client';

import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export function PricingHeader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        href="/dashboard"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the perfect plan for your needs. All plans include our core AI-powered document analysis features.
        </p>
      </motion.div>
    </div>
  );
} 