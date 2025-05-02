import { UploadSection } from '@/components/upload/UploadSection';
import { DocumentTypeSelector } from '@/components/upload/DocumentTypeSelector';

export default function UploadPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3ee8c2] to-[#3b82f6] bg-clip-text text-transparent">
            Upload Document
          </h1>
        </div>

        <div className="space-y-8">
          <DocumentTypeSelector />
          <UploadSection />
        </div>
      </div>
    </div>
  );
} 