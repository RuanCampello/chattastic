/* eslint-disable @next/next/no-img-element */
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

interface DialogWrapperProps {
  children: ReactNode
  title: string
  description: string
  url?: string
  text?: string
}

export default function DialogWrapper({children, title, description, text, url}: DialogWrapperProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex justify-center' asChild>
        {children}
      </Dialog.Trigger>
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50 z-40' />
      <Dialog.Content className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl'>
        <div className='bg-eerie-black py-1 px-3 rounded-t-xl'>
          <Dialog.Title className='text-neutral-200 text-lg font-bold'>{title}</Dialog.Title>
          <Dialog.Description className='text-neutral-400 text-sm font-semibold'>{description}</Dialog.Description>
        </div>
        <div className={`bg-jet flex justify-center ${!text && 'rounded-b-xl'}`}>
          <img src={url} className={`${!text && 'rounded-b-xl'} object-contain max-w-[80vw] max-h-[80vh]`} alt='expanded picture' />
        </div>
        {text &&
          <div className='bg-eerie-black text-lg rounded-b-xl px-3 py-1'>
            {text}
          </div>
        }
      </Dialog.Content>
    </Dialog.Root>
  )
}