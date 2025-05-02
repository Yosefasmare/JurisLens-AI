'use client';

import { useFileStore } from '@/lib/store';
import { FiFileText, FiFile, FiBook } from 'react-icons/fi';
import { LuFileType } from "react-icons/lu";


const documentTypes = [
  {
    id: 'contract',
    name: 'Contract',
    description: 'Legal agreements, terms, and conditions',
    icon: FiFileText,
    color: '#3ee8c2',
  },
  {
    id: 'legal',
    name: 'Legal Document',
    description: 'Court documents, briefs, and legal memos',
    icon: FiFile,
    color: '#3b82f6',
  },
  {
    id: 'research',
    name: 'Research Paper',
    description: 'Academic papers and research documents',
    icon: FiBook,
    color: '#8b5cf6',
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Any other type of document',
    icon: LuFileType,
    color: '#f59e0b',
  },
];

export function DocumentTypeSelector() {
  const {setFileType,fileType} = useFileStore();

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-6">Select Document Type</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setFileType(type.id)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                fileType === type.id
                  ? 'border-[#3ee8c2] bg-[#3ee8c2]/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${type.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: type.color }} />
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 