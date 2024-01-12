import { ReactNode } from 'react'

interface InputRootProps {
  children: ReactNode
}

export default function InputRoot({ children }: InputRootProps) {
  return (
    <div className='pb-5 relative'>
      <div className='bg-slate-200 flex items-center rounded-md w-full'>
        {children}
      </div>
    </div>
  )
}
