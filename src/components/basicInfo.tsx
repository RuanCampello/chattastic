interface BasicInfoProps {
  name: string
  username?: string
  img?: string
  lastMessage?: string
}

export default function BasicInfo({name, img, lastMessage, username}: BasicInfoProps) {  
  return (
  <div className='flex items-center gap-3'>
    {img
     ? <img src={img} className='h-10 w-10 rounded-full object-cover' />
     : <div className='h-10 w-10'></div>
    }
    
    <div className='flex flex-col'>
      <h2 className='text-lg leading-5 font-semibold'>{name}</h2>
      {username &&
      <h3 className='leading-3 text-neon-blue font-bold'>{`@${username}`}</h3>}
      {/* why is not showing? */}
      <p className='line-clamp-1 text-sm font-medium text-neutral-400'>
        {lastMessage}
      </p>
    </div>
  </div>
  )
}