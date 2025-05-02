'use client';

export const DocumentGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Document Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-[#3ee8c2]/50 transition-colors">
        <h3 className="text-lg font-semibold mb-2">Recent Documents</h3>
        <p className="text-[#94a3b8] mb-4">Your latest legal documents and summaries</p>
        <button className="bg-[#3ee8c2] text-[#0e1117] px-4 py-2 rounded-lg hover:bg-[#3ee8c2]/90 transition-colors">
          View Documents
        </button>
      </div>

      {/* Upload Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-[#3ee8c2]/50 transition-colors">
        <h3 className="text-lg font-semibold mb-2">Upload New Document</h3>
        <p className="text-[#94a3b8] mb-4">Upload and analyze your legal documents</p>
        <button className="bg-[#3ee8c2] text-[#0e1117] px-4 py-2 rounded-lg hover:bg-[#3ee8c2]/90 transition-colors">
          Upload Document
        </button>
      </div>
    </div>
  );
}; 