'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function LegalTags() {
  // Mock data - replace with actual data
  const tags = [
    { id: 'contract', label: 'Contract' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'liability', label: 'Liability' },
    { id: 'confidentiality', label: 'Confidentiality' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4">Legal Categories</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.button
            key={tag.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleTag(tag.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200
              ${selectedTags.includes(tag.id)
                ? 'bg-[#3b82f6] text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }
            `}
          >
            #{tag.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 