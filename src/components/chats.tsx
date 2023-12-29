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
    lastMessage?: {
      text: string;
    }
  }
}


export default function Chats() {
  const [chats, setChats] = useState<ChatType>({})
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        if(doc.exists()) {
          const userData = doc.data() as ChatType
          console.log(doc.data());
          
          setChats(userData)
        }
      })
      return () => unsub()
    }
    currentUser.uid && getChats()
    console.log(chats)
  }, [currentUser.uid])
  function handleSelectUser(user: any) {
    dispatch({type:'CHANGE_USER', payload: user})
  }


  return (
    <div>
      {Object.entries(chats).map((chat) => {
        return (
          <div key={chat[0]} className='p-2 cursor-pointer hover:bg-jet' onClick={() => handleSelectUser(chat[1].userInfo)}>
            <BasicInfo name={chat[1].userInfo?.displayName} img={chat[1].userInfo?.photoURL}/>
          </div>
        )
      })}
    </div>
  )
}