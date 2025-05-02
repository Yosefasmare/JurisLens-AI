'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiSearch, FiFileText } from 'react-icons/fi';

const documentTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'contract', label: 'Contract' },
  { value: 'legal', label: 'Legal Document' },
  { value: 'research', label: 'Research Paper' },
  { value: 'other', label: 'Other' },
];




export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const router = useRouter()


  const handleSerach =(e:any)=>{
    e.preventDefault()

    const query: Record<string, string> = {};
    if (selectedType !== 'all') query.type = selectedType;
    if (searchQuery !== '') query.title = searchQuery;

    const searchParams = new URLSearchParams(query).toString();
    router.push(`/dashboard/docs/?${searchParams}`);

  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <form onSubmit={(e)=>handleSerach(e)} className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search summaries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ee8c2]/50 focus:border-transparent"
        />
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Document Type Filter */}
        <div className="relative">
          <FiFileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3ee8c2]/50 focus:border-transparent appearance-none"
          >
            {documentTypes.map((type) => (
              <option className='text-gray-900' key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 