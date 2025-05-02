'use client';

import { useFileStore } from '@/lib/store';
import { FiFileText } from 'react-icons/fi';

export function ExecutiveSummary() {
  const { responseText } = useFileStore();

  if (!responseText?.executiveSummary) {
    return null;
  }

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
          <FiFileText className="w-5 h-5 text-[#3b82f6]" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-3">Executive Summary</h2>
          <p className="text-gray-300 leading-relaxed">
            {responseText.executiveSummary}
          </p>
        </div>
      </div>
    </div>
  );
} 