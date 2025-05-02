'use client';

import { motion } from 'framer-motion';
import { useFileStore } from '@/lib/store';

export function ActionsPanel() {
  const {responseText} = useFileStore()


  return (
    <div className="space-y-6">
      {/* AI Confidence */}
      <div className="bg-white/4  backdrop-blur-md rounded-xl p-6 border border-white/10">
        <h2 className="text-lg font-semibold mb-4">AI Confidence</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Accuracy Score</span>
            <span className="text-[#3b82f6] font-medium">{responseText?.accuracyScore}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${responseText?.accuracyScore ?? 0}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#10b981]"
            />
          </div>
          <p className="text-sm text-gray-400">
            Based on document complexity and clarity
          </p>
        </div>
      </div>
    </div>
  );
} 