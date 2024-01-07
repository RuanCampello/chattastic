import { AuthContext } from '@/context/AuthContext'
import { ChatContext } from '@/context/ChatContext'
import { useContext } from 'react'

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

  return (
    <div className={`text-sm font-medium text-neutral-400 flex flex-col ${owner && 'items-end'}`}>
      <div className='my-1'>
        <span>{getSender()} replied to {getReceiver()}</span>
      </div>
      <div className={`${repliedOwner && owner ? 'bg-neon-blue text-neutral-200' : 'bg-eerie-black'} p-2 rounded-xl w-fit truncate max-w-[35vw] mb-1`}>{repliedMessage}</div>
    </div>    
  )
}
