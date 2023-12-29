import { memo, useContext, useEffect, useState } from 'react'
import BasicInfo from './basicInfo'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'
import { ChatContext } from '@/context/ChatContext'

type ChatType = {
  [chatId: string]: {
    userInfo: {
      photoURL?: string
      displayName: string
    }
    date: {
      seconds: number
      nanoseconds: number
    }
  }
}

export default function Chats() {
  const [chats, setChats] = useState<ChatType>({})
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data() as ChatType)
      })
      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])
  
  function handleSelectUser(user: any) {
    dispatch({ type:'CHANGE_USER', payload: user })
  }
  return (
    <div>
      {
        Object.entries(chats)?.map((chat) => {
          if(chat[1] && chat[1]['userInfo']) {
            return (
              <div onClick={() => handleSelectUser(chat[1]['userInfo'])} key={chat[0]} className='hover:bg-jet p-4 py-3 rounded-xl cursor-pointer'>
              <BasicInfo img={chat[1]['userInfo']['photoURL']} name={chat[1]['userInfo']['displayName']}/>
            </div>
            )
          }
        })
      }
    </div>
  )
}