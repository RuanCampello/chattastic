import { ReactNode } from 'react'

interface MessageRootProps {
  children: ReactNode
}

export default function MessageRoot({children}: MessageRootProps) {
  return (
    <div className='flex flex-col'>
      {children}
    </div>
  )
}