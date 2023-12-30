interface BasicInfoProps {
  name: string
  img?: string
  activity?: string
}

export default function BasicInfo({name, img, activity}: BasicInfoProps) {  
  return (
  <div className='flex items-center gap-3'>
     {img ? 
     <div className='flex relative'>
       <img src={img} className='h-10 w-10 rounded-full object-cover' />
       <div className={`h-4 w-4 rounded-full absolute bottom-0 -right-1 border-[3px] border-eerie-black ${activity === 'online' ? 'bg-pigment-green' : activity === 'away' ? 'bg-xanthous' : 'bg-imperial-red'}`}></div>
     </div>
     : <div className='h-10 w-10 rounded-full'></div>}
     <div className='flex flex-col'>
      <h2 className='text-base leading-5 font-semibold'>{name}</h2>
    </div>
  </div>
  )
}