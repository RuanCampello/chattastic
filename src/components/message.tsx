interface MessageProps {
  owner?: boolean
  imgURL?: string
  text: string
  time: string
}

export default function Message({owner, text, time, imgURL}: MessageProps) { 
  return (
    <div className={`${owner ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
      <div className={`max-w-[40%] p-3 leading-4 rounded-xl font-bold ${owner ? 'bg-neon-blue' : 'text-neutral-400 bg-eerie-black border border-neutral-600'} text-justify flex flex-col`}>
        {imgURL && <img className='w-auto object-cover h-48' src={imgURL} />}
        {text}
      </div>
      <span className='text-neutral-500 text-sm font-semibold mx-1'>{time}</span>
    </div>
  )
}