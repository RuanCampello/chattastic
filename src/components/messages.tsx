import React, { useContext, useEffect, useRef, useState, memo, RefObject } from 'react'
import { ChatContext } from '@/context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'
import { formatTime } from '@/utils'
import { Message } from './Message'

function useScrollToBottom(containerRef: RefObject<HTMLDivElement>, messages: any) {
  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        const container = containerRef.current
        const images = container.querySelectorAll('img')

        const areAllImagesLoaded = () => Array.from(images).every((image) => image.complete)

        const handleScroll = () => container.scrollTop = container.scrollHeight

        const loadHandler = () => {
          if (areAllImagesLoaded()) {
            handleScroll()
            images.forEach((image) => image.removeEventListener('load', loadHandler))
          }
        }

        images.forEach((image) => image.addEventListener('load', loadHandler))
        handleScroll()
      }
    }
    scrollToBottom()
  }, [containerRef, messages])
}

const Messages = memo(() => {
  const [messages, setMessages] = useState([])
  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  useScrollToBottom(chatContainerRef, messages)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', userData.chatId), (doc) => {      
      if (doc.exists()) setMessages(doc.data().messages as [])
    })
    return () => unsub()
  }, [userData.chatId])

  return (
    <div ref={chatContainerRef} className='md:px-4 px-2 py-4 w-full overflow-y-auto scroll-smooth scrollbar scrollbar-w-3 scrollbar-track-jet scrollbar-thumb-eerie-black scrollbar-thumb-rounded-full scrollbar-track-rounded-lg'>
      {messages.map((ms, index) => {
        const isOwner = ms['senderId'] === currentUser.uid
        const timestamp = ms['date']['seconds']
        const date = new Date(timestamp * 1000)
        const repliedMessage: {repliedText: string, repliedOwner: boolean, receiverUid: string} = ms['repliedMessage']

        const isLastMessage =
          index === messages.length - 1 ||
          (index > 0 &&(messages[index + 1]['senderId'] !== ms['senderId'] ||
          date.getTime() - new Date(messages[index - 1]['date']['seconds'] * 1000).getTime() > 5 * 60 * 1000)) || index === 0 ||
          ms['img'] || false

        return (
          <div 
            key={index} 
            className={`my-[0.2rem]`}
          >
            <Message.Root>
              {repliedMessage && (
                <div className={`flex items-center ${isOwner && 'justify-end' } gap-2`}>
                  <Message.Header senderId={ms['senderId']} receiverUid={repliedMessage.receiverUid} repliedOwner={repliedMessage.repliedOwner} owner={isOwner} repliedMessage={repliedMessage.repliedText}/>
                  <div className={`w-1 bg-eerie-black h-9 mt-auto mb-1 rounded-full ${isOwner ? 'order-last' : 'order-first'}`}></div>
                </div>
              )}
              <Message.Content time={formatTime(date)} imgURL={ms['img']} text={ms['text']} owner={isOwner}/>
            </Message.Root>

          </div>
        )
      })}
    </div>
  )
})
Messages.displayName = 'Messages'
export default Messages
