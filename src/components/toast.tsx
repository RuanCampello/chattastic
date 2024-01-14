import { XCircle } from '@phosphor-icons/react'
import * as Toast from '@radix-ui/react-toast'
import { ReactNode } from 'react'

interface ToastProps {
  children: ReactNode
  title: string
  description: string
  isOpen: boolean
  type?: string
  setIsOpen: () => void
}
export default function ToastWrapper({children, title, description, type, isOpen, setIsOpen}: ToastProps) {
  return (
    <Toast.Provider>
      {children}
      <Toast.Root className={`flex items-center gap-4 ${type === 'error' ? 'text-pink-500' : 'text-neon-blue'}`} open={isOpen}>
        <div className='flex-col'>
          <Toast.Title className='leading-5 font-bold'>
            {title}
          </Toast.Title>
          <Toast.Description className='text-neutral-400 font-medium'>
            {description}
          </Toast.Description>
        </div>
        <Toast.Close onClick={setIsOpen}>
          <XCircle size={24} weight='duotone' />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={`transition bg-eerie-black ${type === 'error' ? 'border-pink-500' : 'border-neon-blue'} duration-300 ${isOpen ? 'fixed bottom-4 right-0 p-4 rounded-lg -translate-x-4 border' : 'translate-x-1/2'}`} />
    </Toast.Provider>
  )
}