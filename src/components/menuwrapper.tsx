import { ReactNode } from 'react'

interface MenuWrapperProps {
  children: ReactNode
}

export default function MenuWrapper({children}: MenuWrapperProps) {
  return (
    <div className='bg-eerie-black w-screen h-screen flex justify-center items-center text-savoy-blue'>
      {children}
    </div>
  )
}