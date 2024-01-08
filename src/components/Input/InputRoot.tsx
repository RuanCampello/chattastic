import { ReactNode } from 'react'

interface InputRootProps {
  children: ReactNode
}

export default function InputRoot({children}: InputRootProps) {
  return (
    <div className='flex items-center relative bg-slate-200 rounded-md'>
      {children}
    </div>
  )
}