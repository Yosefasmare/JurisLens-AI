'use client';

import { useFileStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

export function KeyPointsList() {
  const { responseText } = useFileStore();

  if (!responseText?.keyPoints?.length) {
    return null;
  }

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4">Key Points</h2>
      <ul className="space-y-3">
        {responseText.keyPoints.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0 mt-1">
              <FiCheck className="w-3 h-3 text-[#3b82f6]" />
            </div>
            <span className="text-gray-300">{point}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
} 