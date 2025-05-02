'use client';

import { useAuthStore } from '@/lib/store';

export const WelcomeSection = () => {
  const { user } = useAuthStore();

  return (
    <div className="mb-8 ">
      <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.userName}!</h2>
      <p className="text-[#94a3b8]">You have {user?.numberOfDocs} documents in your workspace</p>
    </div>
  );
}; 