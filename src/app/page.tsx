'use client'
import Chat from '@/components/chat'
import { updateUserStatus } from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { AuthContext } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

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
    function handleBeforeUnload() {
      updateUserStatus(user, 'offline')
    }
    function handleVisibilityChange() {
      if(document.visibilityState === 'hidden') updateUserStatus(user, 'away')
      else updateUserStatus(user, 'online')
    }
    updateUserToOnline()

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      updateUserStatus(user, 'offline')
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
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