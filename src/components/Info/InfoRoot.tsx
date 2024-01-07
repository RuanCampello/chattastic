import { ReactNode } from 'react'
interface InfoRootProps {
  children: ReactNode
}
export default function InfoRoot({children}: InfoRootProps) {
  return (
    <div className='flex items-center gap-3 text-neutral-200'>
      {children}
    </div>
  )
}