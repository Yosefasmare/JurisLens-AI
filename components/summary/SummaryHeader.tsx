'use client';

import { getFileView } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { FiFileText } from 'react-icons/fi';

interface SummaryHeaderProps {
  documentId: string;
}
interface DocumentData {
  fileSize: number;
  fileName: string;
  fileType:  string; 
  createdAt: any;
}

export function SummaryHeader({ documentId }: SummaryHeaderProps) {

  const [documentData, setDocumentData] = useState<DocumentData | undefined>(undefined);


  useEffect(()=>{
    const fetchFile = async () => {
      const res = await getFileView(documentId);
      const date: Date = res?.createdAt.toDate();
      const formattedDate = date.toLocaleString();
      setDocumentData({
        fileSize: res?.fileSize || 0,
        fileName: res?.fileName || '',
        fileType: res?.fileType || '',
        createdAt: formattedDate || new Date(),
      });
    }

    fetchFile()
  },[documentId])



  return (
    <div className="bg-white/4 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#10b981] flex items-center justify-center flex-shrink-0">
          <FiFileText className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-2">{documentData?.fileName}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Uploaded {documentData?.createdAt}</span>
            <span>•</span>
            <span>AI-powered summary</span>
          </div>
        </div>
      </div>
    </div>
  );
} 