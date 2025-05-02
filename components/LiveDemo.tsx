'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LiveDemo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]"
        >
          Live Demo
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Upload Your Document</h3>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragging ? 'border-[#5EF1FF] bg-[#5EF1FF]/10' : 'border-white/20 hover:border-[#5EF1FF]/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-4xl mb-4">📄</div>
              <p className="text-gray-300 mb-4">
                {file ? file.name : 'Drag and drop your document here'}
              </p>
              <p className="text-sm text-gray-400">
                Supported formats: PDF, DOCX, TXT
              </p>
            </div>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">AI Summary</h3>
            <div className="relative">
              <div className="bg-white/5 rounded-lg p-6 min-h-[200px]">
                <div className="space-y-4 blur-sm">
                  <p className="text-gray-300">This is a sample summary of your document...</p>
                  <p className="text-gray-300">Key points and insights will appear here...</p>
                  <p className="text-gray-300">Important clauses and obligations...</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link 
                    href="/auth"
                    className="bg-[#5EF1FF] text-[#1F1F2E] py-3 px-6 rounded-md font-medium hover:bg-[#4ad1e0] transition-colors"
                  >
                    Get Full Summary → Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo; 