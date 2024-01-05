import { ReactNode } from 'react'

interface FormRootProps {
  children: ReactNode
  onSubmitFunction: (e: any) => void
}

export default function FormRoot({ children, onSubmitFunction }: FormRootProps) {
  return (
    <form onSubmit={onSubmitFunction} className='flex flex-col w-96 h-fit rounded-lg p-8 bg-gray-100'>
      {children}
    </form>
  )
}