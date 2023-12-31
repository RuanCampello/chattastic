import { formatTime } from '@/utils'

interface BasicInfoProps {
  name: string
  img?: string
  activity?: string
  lastOnline?: Date
}

export default function BasicInfo({name, img, activity, lastOnline}: BasicInfoProps) {
  return (
  <div className='flex items-center gap-3'>
     {img ? 
     <div className='flex relative'>
       <img src={img} className='h-11 w-11 rounded-full object-cover' />
       <div className={`h-4 w-4 rounded-full absolute bottom-0 -right-1 border-[3px] border-eerie-black ${activity === 'online' ? 'bg-pigment-green' : activity === 'away' ? 'bg-xanthous' : 'bg-imperial-red'}`}></div>
     </div>
     : <div className='h-11 w-11 rounded-full'></div>}
     {img &&
     <div className='flex flex-col'>
      <h2 className='text-lg leading-5 font-semibold'>{name}</h2>
      {lastOnline && 
        <h3 className='lowercase text-sm text-neutral-400 font-medium leading-3'>
          {activity !== 'online' ? <span>online {formatTime(lastOnline)}</span> : <span>online</span> 
          }
        </h3>
      }
    </div>}
  </div>
  )
}