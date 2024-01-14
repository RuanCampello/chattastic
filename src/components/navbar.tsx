import { ChatContext } from '@/context/ChatContext'
import { AuthContext } from '@/context/AuthContext'
import { auth, db } from '@/firebase'
import { SignOut } from '@phosphor-icons/react'
import { signOut } from 'firebase/auth'
import { doc,  onSnapshot,  serverTimestamp, setDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { UserActivityType } from './chats'
import TooltipWrapper from './tooltip'
import { Info } from './Info'

export async function updateUserStatus(userId: string, status: string) {
  const userRef = doc(db, 'users', userId)
  await setDoc(userRef, {
    status,
    lastOnline: serverTimestamp()
  }, {merge: true})
}

export default function Navbar() {
  const { currentUser, isLoading } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  
  const [currentUserStatus, setCurrentUserStatus] = useState<UserActivityType>()
  const currentUserId = currentUser.uid

  async function handleLogOut() {
    try {
      await updateUserStatus(currentUserId, 'offline')
      dispatch({ type:'LOG_OUT' })
      signOut(auth)
    } catch(error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const getUserStatus = () => {
      if (currentUser.uid) {
        const userRef = doc(db, 'users', currentUser.uid)
        return onSnapshot(userRef, (doc) => {
          const data = doc.data()
          setCurrentUserStatus(data?.status || 'offline')
        })
      }
    }
    const unsubscribe = currentUserId && getUserStatus()
    return () => unsubscribe && unsubscribe()
  }, [currentUser])

  const currentUserActivity = String(currentUserStatus)

  return (
    <div className='2xl:rounded-bl-lg flex items-center md:justify-between justify-center px-2 py-3 md:p-4 w-full bg-eerie-black border-t border-neon-blue'>
      {isLoading ? (
        // skeleton while is loading
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 bg-gray-500 rounded-full animate-pulse' />
          <div className='md:flex hidden flex-col gap-1'>
            <div className='h-4 bg-gray-500 w-20 animate-pulse rounded-full' />
            <div className='h-3 bg-gray-500 w-16 animate-pulse rounded-full' />
          </div>
        </div>
      ) : (
        // loaded content
        <Info.Root>
          <Info.Avatar>
            <Info.Image name={currentUser['displayName']} source={currentUser['photoURL']} />
            <Info.Activity activity={currentUserActivity} />
          </Info.Avatar>
          <Info.Content isLoading={isLoading} hideOnSmallScreens={true} name={currentUser['displayName']} activity={currentUserActivity} username={currentUser.username} />
        </Info.Root>
      )}
      {!isLoading && (
        <TooltipWrapper content='Log out'>
          <button
            onClick={() => handleLogOut()}
            type='button'
            className='p-2 rounded-full transition duration-500 ease-in-out text-neon-blue hover:bg-jet md:block hidden'
          >
            <SignOut size={24} weight='duotone' />
          </button>
        </TooltipWrapper>
      )}
    </div>
  )
}