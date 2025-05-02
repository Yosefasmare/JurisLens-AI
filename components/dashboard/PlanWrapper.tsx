'use client'

import { useAuthStore } from '@/lib/store'
import React from 'react'
import Link from 'next/link'
import { FiAlertCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface PlanWrapperProps {
  children: React.ReactNode;
  message?: string;
  showUpgradeButton?: boolean;
}

const PlanWrapper = ({ 
  children, 
  message = "You've reached the maximum number of files allowed on the free plan.", 
  showUpgradeButton = true 
}: PlanWrapperProps) => {
  const { user } = useAuthStore()
  const isFreePlan = user?.plan === 'free'
  const fileCount = user?.fileIDs?.length || 0
  const hasReachedLimit = isFreePlan && fileCount >= 10

  if (hasReachedLimit) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 max-w-2xl w-full"
        >
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <FiAlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="text-2xl font-semibold text-[#3ee8c2]">Storage Limit Reached</h3>
              <p className="text-gray-400 text-lg">
                {message}
              </p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500"
              >
                Current usage: {fileCount}/10 files
              </motion.p>
            </motion.div>

            {showUpgradeButton && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <Link 
                  href="/dashboard/pricing" 
                  className="inline-block px-8 py-4 bg-[#3ee8c2] text-black font-medium rounded-lg hover:bg-[#3ee8c2]/90 transition-all duration-300 text-lg hover:scale-105 hover:shadow-lg hover:shadow-[#3ee8c2]/20"
                >
                  Upgrade Your Plan
                </Link>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-gray-500 mt-4 text-sm"
                >
                  Get unlimited storage and access to premium features
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}

export default PlanWrapper