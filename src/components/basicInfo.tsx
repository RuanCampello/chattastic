interface BasicInfoProps {
  name: string
  img?: string
}

export default function BasicInfo({name, img}: BasicInfoProps) {  
  return (
  <div className='flex items-center gap-3'>
     {img ? <img src={img} className='h-10 w-10 rounded-full object-cover' /> : <div className='h-10 w-10 rounded-full'></div>}
     <div className='flex flex-col'>
      <h2 className='text-lg leading-5 font-semibold'>{name}</h2>
    </div>
  </div>
  )
}