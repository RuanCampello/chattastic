import { MessageContext } from '@/context/MessageContext'
import { ArrowBendUpLeft } from '@phosphor-icons/react'
import { useContext, useEffect } from 'react'

interface MessageContentProps {
  owner: boolean
  imgURL?: string
  text: string
  time: string
}

export default function MessageContent({owner, imgURL, text, time}: MessageContentProps) {
  const { selectedMessage, setSelectedMessage } = useContext(MessageContext)
  function handleReply() {
    setSelectedMessage({text: text, owner: owner})
  }
  return (
    <div className={`${owner && 'justify-self-end flex-row-reverse'} items-center gap-1 group flex`}>
      <div className={`${owner ? 'bg-neon-blue text-gray-200 selection:bg-neutral-300 selection:text-neon-blue' : 'text-gray-400 bg-eerie-black selection:text-eerie-black selection:bg-neutral-300'} rounded-xl p-3 leading-4 w-fit xl:max-w-[40%] max-w-[70%] font-semibold flex flex-col text-start`}>
        {imgURL 
        && <img className={`w-auto object-cover max-h-48 rounded-xl ${text && 'mb-2'}`} src={imgURL} />
        }
        {text}
      </div>
      <button onClick={handleReply}>
        <ArrowBendUpLeft className='text-gray-500 hover:text-gray-300 invisible group-hover:visible' weight='fill' size={24} />
        </button>
        <span className='text-gray-500 text-sm font-semibold selection:bg-gray-500 selection:text-neutral-300 invisible group-hover:visible'>{time}</span>
    </div>
  )
}