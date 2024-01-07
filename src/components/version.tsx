import Image from 'next/image'
import Logo from '@/app/chattastic-logo.svg'
import { GithubLogo } from '@phosphor-icons/react'
import TooltipWrapper from './tooltip'

export default function Version() {
  return (
    <div className='bg-jet rounded-xl py-2 px-3 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='bg-neon-blue w-fit rounded-full'>
          <Image alt='logo' width={48} height={48} src={Logo} />
        </div>
        <div className='flex flex-col'>
          <h4 className='text-neutral-200 font-bold text-lg leading-5'>Chattastic</h4>
          <h5 className='leading-3 text-neutral-400 text-sm font-medium'>v-1.0</h5>
        </div>
      </div>
      <TooltipWrapper side='left' content='View source'>
        <a target='_blank' href='https://github.com/RuanCampello/chattastic' className='p-2 hover:bg-eerie-black text-neon-blue rounded-full transition-colors duration-300'>
          <GithubLogo weight='duotone' size={28} />
        </a>
      </TooltipWrapper>
    </div>
  )  
}