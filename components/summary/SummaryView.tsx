'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SummaryHeader } from './SummaryHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { KeyPointsList } from './KeyPointsList';
import { LegalTags } from './LegalTags';
import { FullTextToggle } from './FullTextToggle';
import { ActionsPanel } from './ActionsPanel';
import { FeedbackBar } from './FeedbackBar';
import { useFileStore } from '@/lib/store';
import { LoadingScreen } from './LoadingScreen';
import { PartiesAndDates } from './PartiesAndDates';
import { RisksAndLiabilities } from './RisksAndLiabilities';

interface SummaryViewProps {
  documentId: string;
}

export function SummaryView({ documentId }: SummaryViewProps) {
  const { fileSummeryLoading } = useFileStore();

  return (
    <AnimatePresence mode="wait">
      {fileSummeryLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-[#0c0c0f] text-[#f9fafb]"
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <SummaryHeader documentId={documentId} />

            {/* Main Content */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Summary */}
              <div className="lg:col-span-2 space-y-6">
                <ExecutiveSummary />
                <KeyPointsList />
                <PartiesAndDates />
                <RisksAndLiabilities />
                <LegalTags />
                <FullTextToggle />
              </div>

              {/* Right Column - Actions & Insights */}
              <div className="space-y-6">
                <ActionsPanel />
                <FeedbackBar />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                  <span>←</span>
                  <span>Back to My Documents</span>
                </button>
                <div className="flex items-center gap-4">
                  <span>Last summarized: 2 mins ago</span>
                  <span>Summary ID: {documentId}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 