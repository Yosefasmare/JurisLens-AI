import { ProfileSection } from '@/components/settings/ProfileSection';
import { SubscriptionSection } from '@/components/settings/SubscriptionSection';
import { SecuritySection } from '@/components/settings/SecuritySection';

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3ee8c2] to-[#3b82f6] bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        <div className="space-y-8">
          <ProfileSection />
          <SubscriptionSection />
          <SecuritySection />
        </div>
      </div>
    </div>
  );
} 