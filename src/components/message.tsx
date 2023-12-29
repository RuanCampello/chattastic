interface MessageProps {
  owner?: boolean
  text: string
  time: string
}

export default function Message({owner, text, time}: MessageProps) { 
  return (
    <div className={`${owner ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
      <p className={`max-w-[40%] px-3 p-2 rounded-xl font-bold ${owner ? 'bg-neon-blue' : 'text-neutral-400 bg-eerie-black border border-neutral-600'} text-justify`}>
        {text}
      </p>
      <span className='text-neutral-500 text-sm font-semibold mx-1'>{time}</span>
    </div>
  )
}