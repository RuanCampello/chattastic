import { useContext } from 'react'
import BasicInfo from './basicInfo'
import InputMessage from './inputMessage'
import Messages from './messages'
import { ChatContext } from '@/context/ChatContext'
import { AuthContext } from '@/context/AuthContext'
import { formatTime } from '@/utils'

export default function Chat() {
  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  
  if (!userData?.chatId || userData?.user?.uid === currentUser?.uid) return null
  const lastOnline = formatTime(new Date(userData.user.lastOnline))
  
  return (
    <div className='w-2/3 2xl:w-3/4 2xl:rounded-r-lg p-2 pb-0 flex flex-col'>
      {userData.user && Object.keys(userData.user).length > 0 &&
      <>
        <div className='flex flex-col flex-1 overflow-hidden'>
          <div className='border-b-2 border-eerie-black p-4 sticky top-0 bg-jet'>
            <BasicInfo name={userData.user.displayName || userData.user.name} img={userData.user.photoURL} activity={userData.user.status} lastOnline={lastOnline}/>
          </div>
          <div className='overflow-y-scroll scrollbar-none flex'>
            <Messages />
          </div>
        </div>
        <div className='sticky bottom-0'>
          <InputMessage />
        </div>
      </>
      }
    </div>
  )
}