'use client';

import { auth, db, googleProvider } from '@/lib/firebase';
import { useAuthStore } from '@/lib/store';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {  doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify';


const AuthForm = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const {setLoading} = useAuthStore();




const handleAuth = async (e: any): Promise<void> => {
    e.preventDefault();
    if (email === '' || password === '') {
        toast.error("Please fill all the fields");
        return;
    }

    if (!isLogin && (userName === '' || confirmPassword === '')) {
        toast.error("Please fill all the fields");
        return;
    }

    try {
      setLoading(true)
        if (isLogin) {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, 'users', response.user.uid);
            const existingUser = await getDoc(userRef);
            if (!existingUser.exists()) {
                toast.error("User not found");
                return;
            }
            router.push('/dashboard');
        } else {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const userRef = doc(db, 'users', response.user.uid);
            await setDoc(userRef, {
                userName: userName,
                email: email,
                profilePic: response.user.photoURL,
                numberOfDocs: 0,
                plan: 'free',
                createdAt: new Date(),
            });
            router.push('/dashboard');
        }
    } catch (error) {
      console.log(error)
    }

    setLoading(false);
};

  const handleGoogleAuth = async () => {
  setLoading(true)
    try {
        const response = await signInWithPopup(auth, googleProvider);
        const userRef = doc(db, 'users', response.user.uid);
        const existingUser = await getDoc(userRef);
        if(!existingUser.exists()){
            await setDoc(userRef, {
                userName: response.user.displayName,
                email: response.user.email,
                profilePic: response.user.photoURL,
                numberOfDocs: 0,
                plan: 'free',
                createdAt: new Date(),
            });
            router.push('/dashboard');
        }else{
          router.push('/dashboard')
        }
    } catch (error) {
        console.log(error)
    }
    setLoading(false);
  }



  return (

    <form className="space-y-6" onSubmit={(e) => handleAuth(e)}>
            {/* username Input */}
            {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#d1d5db] mb-2">
                User Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#d1d5db]/50 focus:outline-none focus:border-[#3ee8c2] focus:ring-1 focus:ring-[#3ee8c2] transition-all"
                  placeholder="Enter your User Name"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#d1d5db] mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#d1d5db]/50 focus:outline-none focus:border-[#3ee8c2] focus:ring-1 focus:ring-[#3ee8c2] transition-all"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#d1d5db]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-[#3ee8c2] hover:text-[#1b9a84] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                min={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#d1d5db]/50 focus:outline-none focus:border-[#3ee8c2] focus:ring-1 focus:ring-[#3ee8c2] transition-all"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
                 <div>
                 <div className="flex items-center justify-between mb-2">
                   <label htmlFor="confpass" className="block text-sm font-medium text-[#d1d5db]">
                    Confirm Password
                   </label>
                 </div>
                 <input
                   type="password"
                   min={6}
                   id="confpass"
                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#d1d5db]/50 focus:outline-none focus:border-[#3ee8c2] focus:ring-1 focus:ring-[#3ee8c2] transition-all"
                   placeholder="Confirm password"
                   onChange={(e) => setConfirmPassword(e.target.value)}
                 />
               </div>
            )}

          

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#3ee8c2] to-[#1b9a84] text-white font-medium rounded-lg hover:shadow-[0_0_15px_rgba(62,232,194,0.3)] transition-all duration-300 transform hover:scale-[1.02]"
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[#d1d5db]">or Contiue with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex">
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#d1d5db] hover:bg-white/10 hover:border-[#3ee8c2]/50 transition-all group"
              >
                <span><FcGoogle /></span>
                <span>Google</span>
              </button>
            
            </div>

            {/* Account Redirect */}
            <div className="text-center mt-6">
              <p className="text-[#d1d5db]">
                New to JurisLens AI?{' '}
                <button onClick={()=>setIsLogin(prev=>!prev)} className="text-[#3ee8c2] hover:text-[#1b9a84] transition-colors">
                 {isLogin ? 'Create an account' : 'Already have an account?'}
                </button>
              </p>
            </div>
          </form>
  )
}

export default AuthForm