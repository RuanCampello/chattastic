'use client'
import Chat from '@/components/chat'
import Sidebar from '@/components/sidebar'
import { AuthContext } from '@/context/AuthContext'
import { db } from '@/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

export default function Home() {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  async function updateUserStatus(userId: string, status: string) {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, {
      status,
      lastOnline: serverTimestamp()
    }, {merge: true})
  }

  useEffect(() => {
    if (!currentUser) router.replace('/login')
  }, [currentUser])

  useEffect(() => {
    if(currentUser && currentUser.uid) {
      const user = currentUser.uid
      updateUserStatus(user, 'online')

      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        updateUserStatus(user, 'offline')
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [currentUser?.uid])

  function handleBeforeUnload() {
    updateUserStatus(currentUser.uid, 'offline')
  }
  function handleVisibilityChange() {
    if(document.visibilityState === 'hidden') updateUserStatus(currentUser.uid, 'away')
    else updateUserStatus(currentUser.uid, 'online')
  }
  return (
    <div className='w-screen h-screen bg-neutral-900 flex items-center justify-center'>
      { currentUser && 
      <div className='2xl:h-[95%] 2xl:w-5/6 2xl:rounded-lg w-full h-full bg-jet flex'>
        <Sidebar />
        <Chat />
      </div>
      }
    </div>
  )
}