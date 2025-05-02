'use client';

import { useAuthStore, useFileStore } from '@/lib/store';
import { addFile, FileUpload, UpdateUser } from '@/lib/utils';
import { arrayUnion, increment } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
};

export function UploadSection() {
  const [filesSelected, setFilesSelected] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { fileType } = useFileStore();
  const { user } = useAuthStore();
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');
    setFilesSelected(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (rejectedFiles) => {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        setError('File is too large. Maximum size is 10MB.');
      } else if (error.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.');
      } else {
        setError('Error uploading file. Please try again.');
      }
    },
  });

  const removeFile = (index: number) => {
    setFilesSelected(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (filesSelected.length === 0) {
      setError('Please select at least one file to upload.');
      return;
    }
    if(!fileType){
      toast.error('please,select a type first')
      return
    }

    setLoading(true);
    setError('');

    try {
      for (const file of filesSelected) {
        const fileId = await FileUpload(file);
        if (fileId) {
          await addFile(fileId?.$id, file.name, fileType, file.size);
          await UpdateUser(user?.id as string, {
            files: arrayUnion(fileId?.$id),
            numberOfDocs: increment(1),
          });
          toast.success(`File ${file.name} uploaded successfully!`);
        }
      }
      setFilesSelected([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      setError('Failed to upload files. Please try again.');
    } finally {
      setLoading(false);
      router.push('/dashboard/docs')
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-[#3ee8c2] bg-[#3ee8c2]/5'
            : 'border-white/10 hover:border-[#3ee8c2]/50'
        }`}
      >
        <input {...getInputProps()} />
        <FiUpload className="w-12 h-12 mx-auto mb-4 text-[#3ee8c2]" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop the files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-gray-400">
          or click to select files (PDF, DOCX, TXT)
        </p>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {filesSelected.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium">Selected Files:</h3>
          <div className="space-y-2">
            {filesSelected.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FiFile className="w-5 h-5 text-[#3ee8c2]" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-3 bg-[#3ee8c2] text-black font-medium rounded-lg hover:bg-[#3ee8c2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      )}
    </div>
  );
} 
