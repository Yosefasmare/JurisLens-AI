'use client';

import { motion } from 'framer-motion';
import { FiFileText, FiSearch, FiCpu, FiCheck } from 'react-icons/fi';

const steps = [
  {
    id: 'fetching',
    icon: FiFileText,
    text: 'Fetching your file...',
    description: 'Retrieving document from storage',
  },
  {
    id: 'extracting',
    icon: FiSearch,
    text: 'Extracting legal text...',
    description: 'Analyzing document structure',
  },
  {
    id: 'analyzing',
    icon: FiCpu,
    text: 'Analyzing with Gemini AI...',
    description: 'Processing legal content',
  },
  {
    id: 'finalizing',
    icon: FiCheck,
    text: 'Finalizing your summary...',
    description: 'Preparing insights and recommendations',
  },
];

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0c0c0f]/95 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        {/* Document Icon Animation */}
        <div className="flex justify-center mb-12">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#10b981] flex items-center justify-center"
          >
            <FiFileText className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">{step.text}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
                <motion.div
                  className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#3b82f6] to-[#10b981]"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estimated Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400">
            This usually takes ~8 seconds
          </p>
        </motion.div>
      </div>
    </div>
  );
} 