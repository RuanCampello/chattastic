'use client'
import { Image, PaperPlaneRight } from '@phosphor-icons/react'

export default function InputMessage() {
  return (
    <div className='p-1' >
      <form className='w-full text-neutral-400 bg-eerie-black rounded-3xl font-semibold flex items-center px-4 p-1'>
        <input className='w-full p-2 overflow-y-scroll focus:outline-none bg-eerie-black' type='text' placeholder='type your message...'/>
        <div className='flex gap-1'>
          <input type='file' className='hidden' id='file' />
          <label className='cursor-pointer hover:bg-jet p-2 rounded-full' htmlFor='file'>
            <Image size={28} weight='duotone' />
          </label>
          <button className='hover:bg-jet p-2 rounded-full'>
            <PaperPlaneRight size={28} weight='duotone' />
          </button>
        </div>
      </form>
    </div>
  )
}