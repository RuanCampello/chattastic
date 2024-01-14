import { MessageContext } from '@/context/MessageContext'
import { ArrowBendUpLeft } from '@phosphor-icons/react'
import { useContext } from 'react'
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
      <div className={`${owner ? 'bg-neon-blue text-neutral-200 selection:bg-neutral-300 selection:text-neon-blue' : 'text-neutral-400 bg-eerie-black selection:text-eerie-black selection:bg-neutral-300'} md:rounded-xl md:p-2 p-2 rounded-lg leading-4 w-fit xl:max-w-[40%] max-w-[70%] font-semibold flex flex-col text-start`}>
        {imgURL && 
          <img className={`w-auto max-h-48 object-cover md:rounded-lg md:p-0 py-1 ${text && 'md:mb-2 mb-1'}`} src={imgURL}/>
        }
        {text}
      </div>
        <TooltipWrapper side='top' content='Reply'>
          <button onClick={handleReply}>
            <ArrowBendUpLeft className='text-neutral-500 hover:text-neutral-400 invisible group-hover:visible' weight='fill' size={20} />
          </button>
        </TooltipWrapper>
        <span className='text-neutral-500 md:text-sm text-xs font-semibold selection:bg-neutral-500 selection:text-neutral-200 invisible group-hover:visible'>{time}</span>
    </div>
  )
}