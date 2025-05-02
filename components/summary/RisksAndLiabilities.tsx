'use client';

import { useFileStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

export function RisksAndLiabilities() {
  const { responseText } = useFileStore();

  if (!responseText?.risksAndLiabilities?.length) {
    return null;
  }

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <FiAlertTriangle className="w-5 h-5 text-[#ef4444]" />
        <h2 className="text-lg font-semibold">Risks and Liabilities</h2>
      </div>
      <ul className="space-y-3">
        {responseText.risksAndLiabilities.map((risk, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
              <FiAlertTriangle className="w-3 h-3 text-red-500" />
            </div>
            <span className="text-gray-300">{risk}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
} 