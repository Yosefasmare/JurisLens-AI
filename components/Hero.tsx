'use client';

import React from 'react'
import Image from 'next/image'
import icon from '../public/hero.png'
import Link from 'next/link'
import {motion} from 'motion/react'

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0E121B] to-[#0A0F1C] text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute w-full inset-0 bg-gradient-to-br from-[#0A0F1C]/50 via-[#0E121B]/50 to-[#0A0F1C]/50" />
      
      {/* Content */}
      <div className="relative z-10 flex w-full flex-row items-center justify-between h-full px-4">
        {/* Text content on the left */}
        <div className="md:w-1/2 w-full md:pl-12">
          <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold font-mono mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5EF1FF]">
            Understand Legal Documents in Seconds
          </motion.h1>
          <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
           className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
          Upload contracts, policies, or reports — and get concise AI-powered summaries 
          </motion.p>
          <motion.div
           initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4">
            <Link href={'/auth'} className="bg-[#5EF1FF] text-[#1F1F2E] py-4 px-8 border-none rounded-md text-xl  font-medium hover:bg-[#4ad1e0] transition-colors">
              Try for Free 
            </Link>
            <Link href={'/about'} className="bg-transparent text-[#5EF1FF] py-4 px-8 border border-[#5EF1FF] rounded-md text-xl font-medium hover:bg-[#5EF1FF]/10 transition-colors">
              Learn More
            </Link>
          </motion.div>
        </div>
        
        {/* Document Icon on the right */}
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-1/2   items-center justify-center hidden md:flex">
          <div className="relative w-full h-[500px]">
            <Image
              src={icon}
              alt="Document Icon"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
