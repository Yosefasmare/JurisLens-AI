'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Image from 'next/image';
import Avatar from '../../public/default-avatar.png';
import { auth } from '@/lib/firebase';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoDocumentText, IoSettings } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import { MdClear } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user , clearUser } = useAuthStore();
  const [isClosed, setIsClosed] = useState(true);

  const navItems = [
    { icon: <LuLayoutDashboard />, label: 'Dashboard', path: '/dashboard' },
    {icon: <FaCloudUploadAlt />, label: 'Upload', path: '/dashboard/upload'},
    { icon: <IoDocumentText />, label: 'My Docs', path: '/dashboard/docs' },
    { icon: <IoSettings />, label: 'Settings', path: '/dashboard/settings' },
  ];

  const router = useRouter()
  const handleLogOut = async () => {
    router.push('/auth')

    auth.signOut()
    clearUser()
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsClosed(false)}
        className="fixed top-5 left-6 w-10 h-10 rounded-lg border border-gray-600 bg-gray-800 flex items-center justify-center md:hidden z-40"
      >
        <HiMenuAlt3 className="text-white text-xl" />
      </button>

      {/* Overlay */}
      {!isClosed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsClosed(true)}
        />
      )}

      <aside 
        className={`fixed left-0 top-0 h-screen bg-[#0e1117]/95 backdrop-blur-md border-r border-white/10 transition-all duration-300 pt-6 z-50 ease-in-out w-64 ${
          isClosed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        }`}
      >
        {/* Logo and App Name */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3ee8c2] flex items-center justify-center">
              <span className="text-lg">⚖️</span>
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-[#3ee8c2] to-[#3b82f6] bg-clip-text text-transparent">
              JurisLens AI
            </h1>
          </div>
          <button 
            onClick={() => setIsClosed(true)}
            className="text-white md:hidden"
          >
            <MdClear className="text-xl" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsClosed(true)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                pathname === item.path
                  ? 'bg-[#3ee8c2]/10 text-[#3ee8c2]'
                  : 'text-[#94a3b8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="group-hover:translate-x-1 transition-transform">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-16 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src={user?.profilePic || Avatar}
              alt={user?.userName || 'User'}
              width={50}
              height={50}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{user?.userName}</span>
              <span className="text-xs text-[#94a3b8]">{user?.email}</span>
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="text-sm text-center w-full cursor-pointer font-bold text-[#e83e3e] hover:text-[#3ee8c2]/80 transition-colors duration-200 mt-2"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}; 