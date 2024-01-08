import { IconProps } from '@phosphor-icons/react'
import { ElementType } from 'react'

interface InputIconProps {
  icon: ElementType<IconProps>
}

export default function InputIcon({icon: Icon}: InputIconProps) {
  return (
    <div className='p-5 flex rounded-l-md justify-center items-center bg-neon-blue text-slate-200'>
      <Icon weight='duotone' size={24} className='absolute' />
    </div>
  )
}