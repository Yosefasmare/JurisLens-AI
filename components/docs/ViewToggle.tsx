'use client';

import { useFileStore } from '@/lib/store';
import { FiGrid, FiList } from 'react-icons/fi';


export function ViewToggle() {
const {viewMode, setViewMode} = useFileStore()
  return (
    <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === 'grid'
            ? 'bg-[#3ee8c2] text-black'
            : 'hover:bg-white/10'
        }`}
      >
        <FiGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === 'list'
            ? 'bg-[#3ee8c2] text-black'
            : 'hover:bg-white/10'
        }`}
      >
        <FiList className="w-5 h-5" />
      </button>
    </div>
  );
} 