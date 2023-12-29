interface MessageProps {
  owner?: boolean
  imgURL?: string
  text: string
  time: string
  isLastMessage: boolean
  // isFirstMessage: boolean
}

export default function Message({owner, text, time, imgURL, isLastMessage}: MessageProps) { 
  return (
    <div className={`${owner ? 'items-end' : 'items-start'} flex flex-col ${!isLastMessage && 'gap-1'}`}>
      <div 
      className={`max-w-[40%] rounded-xl p-3 leading-4 font-bold ${owner ? 'bg-neon-blue rounded-s-xl' : 'text-neutral-400 bg-eerie-black border border-neutral-600'} text-justify flex flex-col`}
      >
        {imgURL && <img className='w-auto object-cover max-h-48' src={imgURL} />}
        {text}
      </div>
      {isLastMessage && <span className='text-neutral-500 text-sm font-semibold mx-1'>{time}</span>}
    </div>
  )
}