import { useContext } from 'react'

import InputMessage from './inputMessage'
import Messages from './messages'
import { ChatContext } from '@/context/ChatContext'
import { AuthContext } from '@/context/AuthContext'
import { formatTime } from '@/utils'
import { Info } from './Info'

export default function Chat() {
  const { userData } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  
  if (!userData?.chatId || userData?.user?.uid === currentUser?.uid) return null
  
  const lastOnline = formatTime(new Date(userData.user.lastOnline))
  const user = userData?.user
  
  return (
    <div className='lg:w-3/4 md:w-2/3 w-full 2xl:rounded-r-lg pb-0 flex flex-col'>
      {userData.user && Object.keys(userData.user).length > 0 &&
      <>
        <div className='flex p-2 pb-0 flex-col flex-1 overflow-hidden'>
          <div className='border-b-2 border-eerie-black p-4 sticky top-0 bg-jet'>
            <Info.Root>
              <Info.Avatar>
                <Info.Image name={user.displayName || user.name} source={user.photoURL} />
                <Info.Activity activity={user.status} />
              </Info.Avatar>
              <Info.Content name={user.displayName || user.name} lastOnline={lastOnline} activity={user.status} />
            </Info.Root>
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