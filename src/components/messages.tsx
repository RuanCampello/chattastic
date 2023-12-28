import { useContext, useEffect, useState } from 'react'
import Message from './message'
import { ChatContext } from '@/context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if(doc.exists()) {
        setMessages(doc.data().messages as [])
      }
    })
    return () => unsub()
  }, [data.chatId])  
  return (
    <div className='space-y-2 px-4 mt-4 w-full'>
      {messages.map((ms, index) => (
        <Message owner={ms['senderId'] === currentUser.uid} key={index} text={ms['text']}/>
      ))}
    </div>
  )
}