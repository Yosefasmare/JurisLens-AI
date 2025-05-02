import { SearchBar } from '@/components/docs/SearchBar';
import { SummaryGrid } from '@/components/docs/SummaryGrid';
import { FloatingActionButton } from '@/components/docs/FloatingActionButton';
import { ViewToggle } from '@/components/docs/ViewToggle';

export default function SummariesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3ee8c2] to-[#3b82f6] bg-clip-text text-transparent">
            My Summaries
          </h1>
          <ViewToggle />
        </div>

        {/* Search and Filters */}
        <SearchBar />

        {/* Summary Grid */}
        <SummaryGrid />

        {/* Floating Action Button */}
        <FloatingActionButton />
      </div>
    </div>
  );
} 