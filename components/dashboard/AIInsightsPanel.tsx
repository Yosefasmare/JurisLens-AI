'use client';

export const AIInsightsPanel = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#3ee8c2]/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#3ee8c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#94a3b8]">Ready to analyze your documents with AI</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 