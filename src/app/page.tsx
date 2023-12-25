'use client'
import Chat from '@/components/chat'
import Sidebar from '@/components/sidebar'

export default function HomePage() {
  return (
    <div className='w-screen h-screen bg-neutral-900 flex items-center justify-center'>
      <div className='2xl:h-[95%] 2xl:w-5/6 2xl:rounded-lg w-full h-full bg-jet flex'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}