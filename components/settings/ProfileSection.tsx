'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiEdit2, FiCamera } from 'react-icons/fi';
import { useAuthStore } from '@/lib/store';

export function ProfileSection() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
  });

  const {user} = useAuthStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FiEdit2 className="text-[#3ee8c2]" />
        Update Profile
      </h2>

      <div className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#3ee8c2]/20">
              <Image
                src={ user?.profilePic || '/default-avatar.png'}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <FiCamera className="w-6 h-6 text-white" />
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Profile Picture</h3>
            <p className="text-sm text-gray-400">JPG, GIF or PNG. Max size 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User Name
            </label>
            <input
              type="text"
              name="name"
              value={user?.userName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3ee8c2]/20 focus:border-[#3ee8c2] outline-none transition-all"
            />
          </div>


        
        {user?.password && (<>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3ee8c2]/20 focus:border-[#3ee8c2] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <button className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-left text-gray-300">
              Change Password
            </button>
          </div>
        </>

        )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-[#3ee8c2] text-black font-medium rounded-lg hover:bg-[#3ee8c2]/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 