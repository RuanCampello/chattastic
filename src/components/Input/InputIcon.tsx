import { IconProps } from '@phosphor-icons/react'
import { ElementType } from 'react'

interface InputIconProps {
  icon: ElementType<IconProps>
}

export default function InputIcon({icon: Icon}: InputIconProps) {
  return (
    <div className='p-5 flex border border-neon-blue bg-neon-blue rounded-l-md justify-center items-center text-slate-200'>
      <Icon weight='duotone' size={24} className='absolute' />
    </div>
  )
}