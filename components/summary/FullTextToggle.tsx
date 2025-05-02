'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useFileStore } from '@/lib/store';

export function FullTextToggle() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { responseText } = useFileStore();

  if (!responseText?.fullSummaryText?.length) {
    return null;
  }

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-lg font-semibold">Full Extracted Text</h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                {responseText.fullSummaryText.join('\n\n')}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 