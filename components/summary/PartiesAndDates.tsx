'use client';

import { useFileStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar } from 'react-icons/fi';

export function PartiesAndDates() {
  const { responseText } = useFileStore();

  if (!responseText?.partiesInvolved?.length && !responseText?.importantDatesAndDeadlines?.length) {
    return null;
  }

  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="space-y-6">
        {/* Parties Involved */}
        {responseText.partiesInvolved?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiUsers className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-lg font-semibold">Parties Involved</h2>
            </div>
            <ul className="space-y-2">
              {responseText.partiesInvolved.map((party, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300"
                >
                  {party}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Important Dates */}
        {responseText.importantDatesAndDeadlines?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiCalendar className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-lg font-semibold">Important Dates</h2>
            </div>
            <ul className="space-y-2">
              {responseText.importantDatesAndDeadlines.map((date, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-300"
                >
                  {date}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 