'use client'
import Chat from '@/components/chat'
import Sidebar from '@/components/sidebar'
import { AuthContext } from '@/context/AuthContext'
import { db } from '@/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

export function handleBeforeUnload(user: string) {
  return () => updateUserStatus(user, 'offline')
}
export function handleVisibilityChange(user: string) {
  return () => {
    if(document.visibilityState === 'hidden') updateUserStatus(user, 'away')
    else updateUserStatus(user, 'online')
  }
}

export async function updateUserStatus(userId: string, status: string) {
  const userRef = doc(db, 'users', userId)
  await setDoc(userRef, {
    status,
    lastOnline: serverTimestamp()
  }, {merge: true})
}

export default function Home() {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!currentUser) router.replace('/login')   
  }, [currentUser])

  useEffect(() => {
    if(!currentUser || !currentUser.uid || pathname === '/login') return
    const user:string = currentUser.uid

    async function updateUserToOnline() {
      await updateUserStatus(user, 'online')
    }
    handleVisibilityChange(user)
    updateUserToOnline()

    document.addEventListener('visibilitychange', handleVisibilityChange(user))
    window.addEventListener('beforeunload', handleBeforeUnload(user))
    return () => {
      updateUserStatus(user, 'offline')
      document.removeEventListener('visibilitychange', handleVisibilityChange(user))
      window.removeEventListener('beforeunload', handleBeforeUnload(user))
      }
  }, [currentUser?.uid, pathname])
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