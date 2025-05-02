'use client';

import { useAuthStore } from '@/lib/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiCreditCard, FiArrowUpRight } from 'react-icons/fi';

export function SubscriptionSection() {

  const {user} = useAuthStore()
  const [totalDocuments, setTotalDocuments] = useState(10);
  const [percentage, setPercentage] = useState(0);
  const [billing, setBilling] = useState('');

  useEffect(()=>{
    if(user){
      if(user.plan === 'free') {
        setTotalDocuments(10);
        setBilling('Free');
      }else if(user.plan === 'pro') {
        setTotalDocuments(50);
        setBilling('29.99/month');
      }else if(user.plan === 'enterprise') {
        setTotalDocuments(100);
        setBilling('99.99/month');
      } 
  
        setPercentage((user?.numberOfDocs  / totalDocuments) * 100);
    }

  },[user])


  

  const usage = {
    current: user?.numberOfDocs || 0,
    total: totalDocuments,
    percentage: percentage,
  };



  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiCreditCard className="text-[#3ee8c2]" />
        Subscription & Billing
      </h2>

      <div className="space-y-8">
        {/* Current Plan */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Current Plan</h3>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div>
              <p className="text-lg font-medium">{user?.plan} Plan</p>
              <p className="text-sm text-gray-400">{billing}</p>
            </div>
            <Link href={'/dashboard/pricing'} className="px-4 py-2 bg-[#3ee8c2] text-black font-medium rounded-lg hover:bg-[#3ee8c2]/90 transition-colors flex items-center gap-2">
              Upgrade Plan
              <FiArrowUpRight />
            </Link>
          </div>
        </div>

        {/* Usage Stats */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Usage This Month</h3>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">
                {usage.current} of {usage.total} documents
              </span>
              <span className="text-sm text-[#3ee8c2]">{usage.percentage}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3ee8c2] rounded-full transition-all duration-500"
                style={{ width: `${usage.percentage}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 