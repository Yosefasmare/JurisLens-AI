'use client';

import { FiPlus } from 'react-icons/fi';
import Link from 'next/link';

export function FloatingActionButton() {
  return (
    <Link
      href="/dashboard/upload"
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#3ee8c2] to-[#3b82f6] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#3ee8c2]/20 transition-all duration-300 hover:scale-110 group"
    >
      <FiPlus className="w-6 h-6 text-black" />
      <span className="absolute right-full mr-4 px-3 py-1 bg-white text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Upload New Document
      </span>
    </Link>
  );
} 