import { useContext, useEffect, useState } from 'react'
import BasicInfo from './basicInfo'
import { Timestamp, collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from '@/context/AuthContext'
import { ChatContext } from '@/context/ChatContext'
import { UserChatsContext } from '@/context/UserChatsContext'

type ChatType = {
  [chatId: string]: {
    userInfo: {
      uid: string
      photoURL?: string
      displayName: string
      status: 'online' | 'away' | 'offline'
    }
    date: number
  }
}
export type UserActivityType = {
  [userId: string]: 'online' | 'away' | 'offline'
}
type UserLastOnline = {
  [userId: string]: Timestamp
}

export default function Chats() {
  const { currentUser } = useContext(AuthContext)
  const { userData, dispatch } = useContext(ChatContext)
  const { setUserChats } = useContext(UserChatsContext)
  const [chats, setChats] = useState<ChatType>({})
  const [userActivities, setUserActivities] = useState<UserActivityType>({})
  const [usersLastOnline, setUsersLastOnline] = useState<UserLastOnline>({})
  
  useEffect(() => {
    const getChats = () => {
      const unsubChats = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        const userChatsData = doc.data() as ChatType
        setChats(userChatsData)
        setUserChats(userChatsData)
      })
      const unsubActivities = onSnapshot(collection(db, 'users'), (snapshot) => {
        const activities: UserActivityType = {}
        snapshot.forEach((userDoc) => {
          const userId = userDoc.id
          const data = userDoc.data()
          activities[userId] = data.status || 'offline'
          usersLastOnline[userId] = data.lastOnline
        })
        setUserActivities(activities)
        setUsersLastOnline(usersLastOnline)
      })

      return () => {
        unsubChats()
        unsubActivities()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])
  
  function handleSelectUser(user: any) {   
    if(userData && userData.user.uid === user.uid) return
    
    const selectedUser = {
      ...user,
      lastOnline: usersLastOnline[user.uid].seconds*1000
    }
    dispatch({ type:'CHANGE_USER', payload: selectedUser })
  }
  return (
    <div>
      {
        Object.entries(chats)?.map((chat) => {
          return (
            <div onClick={() => handleSelectUser(chat[1]['userInfo'])} key={chat[0]} className={`hover:bg-jet p-2 px-3 rounded-xl cursor-pointer active:bg-jet/70 mb-2 transition-colors duration-300 ${chat[1]['userInfo']['uid'] === userData.user.uid && 'bg-jet'}`}>
            <BasicInfo img={chat[1]['userInfo']['photoURL']} name={chat[1]['userInfo']['displayName']} activity={userActivities[chat[1]['userInfo']['uid']]}/>
          </div>
          )  
        })
      }
    </div>
  )
}