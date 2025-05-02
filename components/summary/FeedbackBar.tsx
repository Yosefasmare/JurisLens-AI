'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

export function FeedbackBar() {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    setIsSubmitted(true);
    // Here you would typically send the feedback to your backend
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <p className="text-center text-gray-300">
          Thank you for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4">Was this summary helpful?</h2>
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleFeedback('positive')}
          className={`
            p-3 rounded-full transition-colors
            ${feedback === 'positive'
              ? 'bg-[#10b981] text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }
          `}
        >
          <FiThumbsUp className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleFeedback('negative')}
          className={`
            p-3 rounded-full transition-colors
            ${feedback === 'negative'
              ? 'bg-red-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }
          `}
        >
          <FiThumbsDown className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
} 