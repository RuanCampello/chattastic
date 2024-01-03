interface MessageProps {
  owner?: boolean
  imgURL?: string
  text: string
  time: string
  isLastMessage: boolean
}

export default function Message({owner, text, time, imgURL, isLastMessage}: MessageProps) { 
  return (
    <div className={`${owner ? 'items-end' : 'items-start'} flex flex-col`}>
      <div 
      className={`xl:max-w-[40%] max-w-[70%] ${!isLastMessage && owner ? 'rounded-s-2xl rounded-xl' : 'rounded-2xl'} ${!isLastMessage && !owner && 'rounded-e-2xl rounded-xl'} p-3 leading-4 font-semibold ${owner ? 'bg-neon-blue text-gray-200 selection:bg-neutral-300 selection:text-neon-blue' : 'text-gray-400 bg-eerie-black selection:text-eerie-black selection:bg-neutral-300'} flex flex-col text-justify`}
      >
        {imgURL 
        && <img className={`w-auto object-cover max-h-48 rounded-xl ${text && 'mb-2'}`} src={imgURL} />
        }
        {text}
      </div>
      {isLastMessage && <span className='text-gray-500 text-sm font-semibold mt-1 mx-1 selection:bg-gray-500 selection:text-neutral-300'>{time}</span>}
    </div>
  )
}