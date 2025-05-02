'use client';

import { useState } from 'react';
import { FiShield, FiTrash2 } from 'react-icons/fi';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { storage } from '@/lib/appwrite';

export function SecuritySection() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { user, clearUser } = useAuthStore();

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    try {
      setIsDeleting(true);
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        // Delete user data from Firestore


        if((user?.fileIDs ?? []).length > 0 && user?.fileIDs !== null){
          for (let i = 0; i <= user.fileIDs!.length; i++) {
                const fileId = user!.fileIDs[i]
                await deleteDoc(doc(db,'files',fileId))
                await storage.deleteFile(
                    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
                    fileId
                )
          }
        }

        await deleteDoc(doc(db, 'users', user.id));

        
        // Delete the user account
        await deleteUser(currentUser);
        
        // Clear local state
        clearUser();
        
        // Show success message
        toast.success('Account deleted successfully');
        
        // Redirect to auth page
        router.push('/auth');
      }
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        alert('Please re-authenticate before deleting your account.');
         await auth.signOut()
        router.push('/auth')
      } else {
        console.error('Error deleting user:', error);
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FiShield className="text-[#3ee8c2]" />
          Privacy & Security
        </h2>

        <div className="space-y-8">
          {/* Delete Account */}
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <FiTrash2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-red-500">Delete Account</h3>
                  <p className="text-sm text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#0e1117] border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-red-500 mb-4">Delete Account</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 