import Pricing from '@/components/Pricing';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { FAQSection } from '@/components/pricing/FAQSection';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0f]">
      <PricingHeader />
      <Pricing />
      <FAQSection />
    </div>
  );
} 