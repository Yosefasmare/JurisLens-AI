import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { DocumentGrid } from '@/components/dashboard/DocumentGrid';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        <WelcomeSection />
        <DocumentGrid />
        <AIInsightsPanel />
      </div>
    </div>
  );
}