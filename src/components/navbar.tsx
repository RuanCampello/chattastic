import { AuthContext } from '@/context/AuthContext'
import { auth, db } from '@/firebase'
import { SignOut } from '@phosphor-icons/react'
import { signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'

export default function Navbar() {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState(String)
  const {currentUser} = useContext(AuthContext)

  async function getUserName() {
    try {
      const usernameQuery = await getDocs(query(collection(db, 'users'), where('email', '==', currentUser.email)))
      if(usernameQuery.docs.length > 0) {
        const userData = usernameQuery.docs[0].data()
        setUsername(userData.username)
      }
    } catch(error) {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if(currentUser) {
      getUserName()
    }
  }, [currentUser])
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
          <img
            src={currentUser.photoURL}
            title={currentUser.displayName}
            alt={currentUser.displayName}
            className='h-12 w-12 rounded-full object-cover'
          />
          <div className='flex flex-col gap-1'>
            <h2 className='text-lg text-start font-medium leading-4'>{currentUser.displayName}</h2>
            <h3 className='text-neon-blue leading-3 font-bold'>@{username}</h3>
          </div>
        </div>
      )}
      {!isLoading && (
        <button
          onClick={() => signOut(auth)}
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