import { ChatContext } from '@/context/ChatContext'
import { useContext } from 'react';

interface MessageHeaderProps {
  repliedMessage: string
  repliedOwner: boolean
  owner: boolean
}

export default function MessageHeader({ repliedMessage, repliedOwner, owner }: MessageHeaderProps) {
  const { userData } = useContext(ChatContext)

  return (
    <div className={`text-sm font-medium text-neutral-400 flex flex-col ${owner && 'items-end'}`}>
      <div className='my-1'>
        {repliedOwner ? <span>you replied yourself</span> : <span>you replied <b>{userData.user.displayName}</b></span>}
      </div>
      <div className='bg-eerie-black p-2 rounded-xl w-fit truncate max-w-[50vw] mb-1'>{repliedMessage}</div>
    </div>
  )
}
