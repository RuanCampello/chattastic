import { AuthContext } from '@/context/AuthContext'
import { auth, db } from '@/firebase'
import { SignOut } from '@phosphor-icons/react'
import { signOut } from 'firebase/auth'
import { collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { UserActivityType } from './chats'

export async function updateUserStatus(userId: string, status: string) {
  const userRef = doc(db, 'users', userId)
  await setDoc(userRef, {
    status,
    lastOnline: serverTimestamp()
  }, {merge: true})
}

export default function Navbar() {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {currentUser} = useContext(AuthContext)
  const [currentUserStatus, setCurrentUserStatus] = useState<UserActivityType>()
  const username = typeof window !== 'undefined' ? sessionStorage.getItem(`username_${currentUser.uid}`) : null
  const currentUserId = currentUser.uid

  async function getUsername() {
    try {
      if(!currentUser.email) return
      const usernameQuery = await getDocs(query(collection(db, 'users'), where('email', '==', currentUser.email)))
      
      if (usernameQuery.docs.length > 0) {
        const userData = usernameQuery.docs[0].data()
        sessionStorage.setItem(`username_${currentUserId}`, userData.username)
        setError(false) // reset error state if successful
      } else {
        // handle the case where no user is found for the given email
        setError(true)
      }
    } catch (error) {
      console.error('Error fetching username:', error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogOut() {
    await updateUserStatus(currentUserId, 'offline')
    signOut(auth)
  }

  useEffect(() => {
    const getUserStatus = () => {
      if (currentUser.uid) {
        const userRef = doc(db, 'users', currentUserId)
        return onSnapshot(userRef, (doc) => {
          const data = doc.data()
          setCurrentUserStatus(data?.status || 'offline')
        })
      }
    }
    const unsubscribe = currentUserId && getUserStatus()
    return () => unsubscribe && unsubscribe()
  }, [currentUser])

  useEffect(() => {
    getUsername()
  }, [username, currentUser.email, currentUser])

  return (
    <div className='2xl:rounded-bl-lg flex items-center justify-between p-4 w-full bg-eerie-black border-t border-neon-blue'>
      {isLoading ? (
        // skeleton while is loading
        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 bg-gray-500 rounded-full animate-pulse' />
          <div className='flex flex-col gap-1'>
            <div className='h-4 bg-gray-500 w-20 animate-pulse rounded-full' />
            <div className='h-3 bg-gray-500 w-16 animate-pulse rounded-full' />
          </div>
        </div>
      ) : (
        // loaded content
        <div className='flex items-center gap-4'> 
          <div className='flex relative'>
            <img 
            src={currentUser.photoURL} 
            className='h-10 w-10 rounded-full object-cover' 
            />
            <div className={`h-4 w-4 rounded-full absolute bottom-0 -right-1 border-[3px] border-eerie-black ${String(currentUserStatus) === 'online' ? 'bg-pigment-green' : String(currentUserStatus) === 'away' ? 'bg-xanthous' : 'bg-imperial-red'}`}></div>
          </div>
          <div className='flex flex-col gap-1'>
            <h2 className='text-lg text-start font-medium leading-4'>{currentUser.displayName}</h2>
            {!isLoading &&
            <h3 className='text-neon-blue leading-3 font-bold'>@{username}</h3>}
          </div>
        </div>
      )}
      {!isLoading && (
        <button
          onClick={handleLogOut}
          title='Log out'
          type='button'
          className='p-2 rounded-full transition duration-500 ease-in-out text-neon-blue hover:bg-jet'
        >
          <SignOut size={24} weight='duotone' />
        </button>
      )}
    </div>
  )
}