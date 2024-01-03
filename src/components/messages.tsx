import React, { useContext, useEffect, useRef, useState, memo } from 'react'
import Message from './message'
import { ChatContext } from '@/context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'
import { formatTime } from '@/utils'

const Messages = memo(() => {
  const [messages, setMessages] = useState([])
  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', userData.chatId), (doc) => {      
      if (doc.exists()) setMessages(doc.data().messages as [])
    })
    return () => unsub()
  }, [userData.chatId])

  useEffect(() => {
    // scroll to the bottom of the chat when messages change
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight
    }
  }, [messages])

  return (
    <div ref={chatContainerRef} className='px-4 mt-4 w-full overflow-y-auto scrollbar scrollbar-w-3 scrollbar-track-neutral-800 scrollbar-thumb-eerie-black scrollbar-thumb-rounded-full scrollbar-track-rounded-lg'>
      {messages.map((ms, index) => {
        const timestamp = ms['date']['seconds']
        const date = new Date(timestamp * 1000)

        const isLastMessage =
          index === messages.length - 1 ||
          (index > 0 &&(messages[index + 1]['senderId'] !== ms['senderId'] ||
          date.getTime() - new Date(messages[index - 1]['date']['seconds'] * 1000).getTime() > 5 * 60 * 1000)) || index === 0 ||
          ms['img'] || false
        return (
          <div 
            key={index} 
            className={`${isLastMessage && 'mb-4'} my-[0.2rem]`}
          >
            <Message 
              owner={ms['senderId'] === currentUser.uid} 
              text={ms['text']} 
              time={formatTime(date)} 
              imgURL={ms['img']}
              isLastMessage={isLastMessage}
            />
          </div>
        )
      })}
    </div>
  )
})

export default Messages
