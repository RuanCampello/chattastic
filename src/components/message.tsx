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
      className={`max-w-[40%] rounded-3xl p-3 leading-4 font-bold ${owner ? 'bg-neon-blue text-gray-200' : 'text-gray-400 bg-eerie-black'} text-justify flex flex-col`}
      >
        {imgURL 
        && <img className={`w-auto object-cover max-h-48 ${text && 'mb-2'}`} src={imgURL} />
        }
        {text}
      </div>
      {isLastMessage && <span className='text-gray-500 text-sm font-semibold mt-1 mx-1'>{time}</span>}
    </div>
  )
}