import { AuthContext } from '@/context/AuthContext';
import { ChatContext } from '@/context/ChatContext'
import { useContext, useEffect } from 'react';

interface MessageHeaderProps {
  repliedMessage: string
  repliedOwner: boolean
  owner: boolean
  senderId: string
  receiverUid: string
}

export default function MessageHeader({ repliedMessage, repliedOwner, owner, senderId, receiverUid }: MessageHeaderProps) {
  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)

  function getSender() {
    if(senderId === currentUser.uid) return 'You'
    else return userData.user.displayName
  }
  function getReceiver() {
    if(repliedOwner && senderId !== currentUser.uid) return 'themself'
    if(repliedOwner) return 'yourself'
    if(receiverUid === currentUser.uid) return 'you'
    else return userData.user.displayName
  }

  useEffect(() => {
    console.log(`receiver:${getReceiver()} sender:${getSender()}`);
    
  }, [senderId, receiverUid])

  return (
    <div className={`text-sm font-medium text-neutral-400 flex flex-col ${owner && 'items-end'}`}>
      <div className='my-1'>
        <span>{getSender()} replied to {getReceiver()}</span>
      </div>
      <div className='bg-eerie-black p-2 rounded-xl w-fit truncate max-w-[50vw] mb-1'>{repliedMessage}</div>
    </div>
  )
}
