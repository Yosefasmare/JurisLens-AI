'use client'

import { auth, db } from '@/lib/firebase';
import { useAuthStore } from '@/lib/store';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AuthWrapper = ({children}:{children: React.ReactNode}) => {

    const {loading,setLoading} = useAuthStore();
    const [userExist,setUserExist] = useState(false)
    const router = useRouter();
    const pathName = usePathname()
    const {setUser,clearUser} = useAuthStore()
    

    useEffect(()=>{
        onAuthStateChanged(auth,async(userAuth)=>{
            try {
                if (userAuth) {
                    const res = await getDoc(doc(db, 'users', userAuth!.uid));
                    if (res.exists()) {
                        const userData = res.data();
                        setUser({
                            id: userAuth!.uid,
                            email: userData?.email,
                            userName: userData?.userName,
                            profilePic: userData?.profilePic,
                            numberOfDocs: userData?.numberOfDocs,
                            fileIDs: userData?.files,
                            plan: userData?.plan,
                            createdAt: userData?.createdAt
                        });
                        setUserExist(true)
                    }else{
                     router.push('/auth')
                      clearUser();
                    }
                }else{
                   router.push('/auth')
                   clearUser();
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        })
     },[])
 
    useEffect(()=>{
        if(pathName.startsWith('/auth') && userExist && !loading){
            router.push('/dashboard')
         } 
    },[router])

     



    if(loading){
        return(
        <div className='w-full h-screen flex items-center justify-center'>
            <svg className="animate-spin h-10 w-10 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4.22 4.22a10 10 0 0115.56 15.56L12 12l-7.78-7.78z"></path>
            </svg>
            <p className='font-bold text-2xl text-white animate-pulse'>Loading...</p>
        </div>)
    }


    if(!pathName.startsWith('/auth') && !userExist && !loading){
        return null
     }

  return (
    <>
     {children}
    </>
  )
}

export default AuthWrapper