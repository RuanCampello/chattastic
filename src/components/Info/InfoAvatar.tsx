import { ReactNode } from 'react'
interface InfoAvatarProps {
  children: ReactNode
}
export default function InfoAvatar({children}: InfoAvatarProps) {
  return (
    <div className='flex relative'>
      { children }
    </div>
  )
}