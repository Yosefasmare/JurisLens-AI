'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Image from 'next/image';
import { FaBarsStaggered } from "react-icons/fa6";
import { MdClear } from "react-icons/md";

const Navbar = () => {
  const {user,} = useAuthStore();
  const pathname = usePathname();
  const [isBaropen,setIsBaropen] = useState(false)

 


    if(pathname === "/auth" ){
        return null;
    }


  return (
     <>
    <motion.nav
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center w-full justify-between p-5 bg-gray-950/50  shadow-gray-900 shadow-lg  fixed z-40 text-white">
      <h1 className='font-extrabold font-mono text-2xl md:text-4xl '>JurisLens AI</h1>
        <ul className={`md:flex hidden items-center gap-5`}>
            <Link href={'/'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">Home</Link>
            <Link href={'/#features'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">Features</Link>
            <Link href={'/privacy'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">privacy</Link>
            <Link href={'/pricing'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">Pricing</Link>
        </ul>  
         
        <span className='md:hidden block'>
          <FaBarsStaggered 
          onClick={()=>setIsBaropen(prev=>!prev)}
          className={`text-white  ${isBaropen && 'hidden'}`}
           />
           <MdClear 
            onClick={()=>setIsBaropen(prev=>!prev)}
            className={`text-white   ${isBaropen ? 'block' : 'hidden'}`}
           />
        </span>
        {user ? (
            <div className='flex items-center gap-5'>
              <div>
                <Link href={'/dashboard'} className='flex items-center gap-2'>
                    <Image src={user?.profilePic || ''} alt="profile" width={150} height={150} className='w-10 h-10 rounded-full'  />
                    <h1 className='text-lg font-semibold'>
                      {user?.userName.length > 10 ? user?.userName.slice(0, 7) + '...' : user?.userName}
                      </h1>
                </Link>
              </div>
            </div>
        ) : (
        <div className='flex items-center justify-center gap-5'>
            <Link href="/auth" className='bg-[#27a9fc] text-white px-5 py-3 rounded-4xl cursor-pointer hover:bg-[#2563eb]'>Login</Link>
        </div> 
        )}
    </motion.nav>
         <div className={`flex flex-col w-full md:hidden fixed z-30 bg-gray-900/90 transition-all ease-in-out duration-75 overflow-hidden  ${isBaropen ? 'h-[300px]' : 'h-0'}`}>
         <ul className={`flex flex-col h-full p-5   items-center justify-end gap-5`}>
            <Link href={'/'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">Home</Link>
            <Link href={'/#features'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">Features</Link>
            <Link href={'/privacy'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">privacy</Link>
            <Link href={'/dashboard/pricing'} className="text-lg font-semibold hover:text-gray-400 cursor-pointer">Pricing</Link>
        </ul> 
        </div>
    </>
  )
}

export default Navbar