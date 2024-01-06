import { MessageContext } from '@/context/MessageContext'
import { ArrowBendUpLeft } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useContext, useEffect } from 'react'
import TooltipWrapper from '../tooltip'

interface MessageContentProps {
  owner: boolean
  imgURL?: string
  text: string
  time: string
}

export default function MessageContent({owner, imgURL, text, time}: MessageContentProps) {
  const { setSelectedMessage } = useContext(MessageContext)
  function handleReply() {
    setSelectedMessage({text: text, owner: owner})
  }
  return (
    <div className={`${owner && 'justify-self-end flex-row-reverse'} items-center gap-1 group flex`}>
      <div className={`${owner ? 'bg-neon-blue text-neutral-200 selection:bg-neutral-300 selection:text-neon-blue' : 'text-neutral-400 bg-eerie-black selection:text-eerie-black selection:bg-neutral-300'} rounded-xl p-3 leading-4 w-fit xl:max-w-[40%] max-w-[70%] font-semibold flex flex-col text-start`}>
        {imgURL 
        && <img className={`w-auto object-cover max-h-48 rounded-lg ${text && 'mb-2'}`} src={imgURL} />
        }
        {text}
      </div>
        <TooltipWrapper content='Reply'>
          <button onClick={handleReply}>
            <ArrowBendUpLeft className='text-neutral-500 hover:text-neutral-400 invisible group-hover:visible' weight='fill' size={20} />
          </button>
        </TooltipWrapper>
        <span className='text-neutral-500 text-sm font-semibold selection:bg-neutral-500 selection:text-neutral-200 invisible group-hover:visible'>{time}</span>
    </div>
  )
}