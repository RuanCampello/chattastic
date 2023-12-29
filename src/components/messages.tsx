import { useContext, useEffect, useRef, useState } from 'react'
import Message from './message'
import { ChatContext } from '@/context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [prevMessageIsLast, setPrevMessageIsLast] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if(doc.exists()) {
        setMessages(doc.data().messages as [])
      }
    })
    return () => unsub()
  }, [data.chatId])

  useEffect(() => {
    // scroll to the bottom of the chat when messages change
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight
    }
  }, [messages])
  
  function formatMessageTime(date: Date) {
    const now = new Date()
    const diffInMilliseconds = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMilliseconds / (60 * 1000))
  
    if (diffInMinutes <= 1) {
      return 'Just now'
    } else if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      // Today
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else if (
      date.getDate() === now.getDate() - 1 &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      // yesterday
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    } else {
      // older than yesterday
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }
  }
  return (
    <div ref={chatContainerRef} className='px-4 mt-4 w-full'>
      {messages.map((ms, index) => {
        const timestamp = ms['date']['seconds']
        const date = new Date(timestamp*1000)

        const isLastMessage =
        index === messages.length - 1 ||
        (index > 0 &&(messages[index + 1]['senderId'] !== ms['senderId'] ||
        date.getTime() - new Date(messages[index - 1]['date']['seconds'] * 1000).getTime() > 5 * 60 * 1000)) ||
        ms['img'] || false
        return (
          <div 
           key={index} 
           className={`${isLastMessage && 'mb-4'}  my-1`}
          >
            <Message 
             owner={ms['senderId'] === currentUser.uid} 
             text={ms['text']} 
             time={formatMessageTime(date)} 
             imgURL={ms['img']}
             isLastMessage={isLastMessage}
             />
          </div>
        )
      })
      }
    </div>
  )
}