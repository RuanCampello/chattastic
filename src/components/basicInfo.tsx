interface BasicInfoProps {
  name: string
  img?: string
  text?: string
}

export default function BasicInfo({name, img, text}: BasicInfoProps) {
  return (
  <div className='flex items-center gap-3'>
    {img &&
      <img src={img} className='h-10 w-10 rounded-full object-cover' />
    }
    <div className='flex flex-col'>
      <h2 className='text-lg leading-5 font-semibold'>{name}</h2>
      <p className='line-clamp-1 text-sm font-medium text-neutral-400'>
        {text}
      </p>
    </div>
  </div>
  )
}