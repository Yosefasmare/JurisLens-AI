'use client';

import { useEffect, useState } from 'react';
import { FiFileText, FiDownload, FiTrash2 } from 'react-icons/fi';
import { RiRobot2Fill } from "react-icons/ri";
import { useAuthStore, useFileStore } from '@/lib/store';
import { delateFile, extractTextFromDOCX, extractTextFromPDF, getFileView } from '@/lib/utils';
import Link from 'next/link';
import { storage } from '@/lib/appwrite';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

export function SummaryGrid() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const { viewMode, setFileSummeryLoading, setResponseText, fileType } = useFileStore();

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        if (!user?.fileIDs || user?.fileIDs.length === 0) {
          setLoading(false);
          return;
        }
        const fetchedFiles = [];
        for (let i = 0; i < user?.fileIDs.length; i++) {
          const fileId = user?.fileIDs[i];
          const response = await getFileView(fileId);
          if (response) {
            const fileData = {
              id: fileId,
              fileName: response.fileName,
              fileType: response.fileType,
              createdAt: response.createdAt,
            };
            fetchedFiles.push(fileData);
          }
        }
        setFiles(fetchedFiles);
        setFilteredFiles(fetchedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [user?.fileIDs]);

  // Filter files based on search query
  useEffect(() => {
    const title = searchParams.get('title')?.toLowerCase();
    const type = searchParams.get('type');

    if (!title && !type) {
      setFilteredFiles(files);
      return;
    }

    const filtered = files.filter(file => {
      const matchesTitle = !title || file.fileName.toLowerCase().includes(title);
      const matchesType = !type || type === 'all' || file.fileType.toLowerCase().includes(type);
      return matchesTitle && matchesType;
    });

    setFilteredFiles(filtered);
  }, [searchParams, files]);

  const handleDelete = async (id: string) => {
    if (user?.plan === 'free') {
      toast.warning('Upgrade your plan To Unlock this Feature!!');
      return;
    }

    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
    await delateFile(id, user?.id as string);
  };

  const getSummery = async (fileid: any) => {
    try {
      setFileSummeryLoading(true);
      const fileUrl = storage.getFileDownload(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string, fileid);

      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch the file.");
      }

      const blob = await response.blob();
      const type = blob.type;

      let text = '';

      if (type === 'text/plain') {
        text = await blob.text();
      } else if (type === 'application/pdf') {
        text = await extractTextFromPDF(blob);
      } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDOCX(blob);
      } else {
        throw new Error('Unsupported file type.');
      }

      if (text) {
        const aiRes = await fetch('/api/summerizer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, title: fileType }),
        });

        if (!aiRes.ok) {
          throw new Error('AI summarization failed.');
        }

        const aiData = await aiRes.json();
        const rawResponse = aiData.response;
        const jsonString = rawResponse.replace(/^```json\n/, '').replace(/\n```$/, '');

        const parsedResponse = JSON.parse(jsonString);
        setResponseText(parsedResponse);
      }
    } catch (error) {
      console.error('Error processing file or summarization:', error);
    } finally {
      setFileSummeryLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex pt-14 items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3ee8c2]"></div>
        </div>
      ) : (
        <div>
          {!loading && filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-start pt-5 h-screen">
              <h2 className="text-2xl font-semibold text-gray-400">
                {files.length === 0 ? 'No files found' : 'No matching files found'}
              </h2>
              <p className="text-gray-500 mt-2">
                {files.length === 0 
                  ? 'You have not uploaded any files yet.'
                  : 'Try adjusting your search criteria.'}
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#3ee8c2]/50 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#3ee8c2]/10 flex items-center justify-center flex-shrink-0">
                      <FiFileText className="w-6 h-6 text-[#3ee8c2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate">{file.fileName}</h3>
                      <p className="text-sm text-gray-400">{file.fileType}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {file.createdAt.toDate().toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/10">
                    <Link
                      href={`/dashboard/docs/${file.id}`}
                      onClick={() => getSummery(file.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <RiRobot2Fill className="w-5 h-5 text-teal-500" />
                    </Link>
                    <button
                      onClick={() => getSummery(file.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <FiDownload className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
} 