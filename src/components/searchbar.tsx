import { db } from '@/firebase'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { FormEvent, useContext, useEffect, useState } from 'react'
import BasicInfo from './basicInfo'
import { AuthContext } from '@/context/AuthContext'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { ChatContext } from '@/context/ChatContext'

export type UserData = {
  uid: string
  name: string
  username: string
  photoURL: string
}

export default function SearchBar() {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const [queryInput, setQuery] = useState(String)
  const [user, setUser] = useState<UserData | null>(null)
  const [username, setUsername] = useState(String)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getUsername() {
      try {
        if(currentUser && currentUser.email) {
          const usernameQuery = await getDocs(query(collection(db, 'users'), where('email', '==', currentUser.email)))
          if(usernameQuery.docs.length > 0) {
            const userData = usernameQuery.docs[0].data()
            setUsername(userData.username)
          }
        }
      } catch(error) {
        console.error(error)
        setError(true)
      }
    }
    getUsername()
  }, [currentUser])
  
  async function handleClick() {
    if(user && currentUser) { 
      const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
      try {
        const chat = await getDoc(doc(db, 'chats', combinedId))
        if(chat.exists()) {
          setUser(null)
          return
        } 
        // First updateDoc call
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.name,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
        // Second updateDoc call
        await updateDoc(doc(db, 'userChats', user?.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      } catch (error) {}
    }
    setUser(null)
  }

  function handleSelection(user: any) {
    dispatch({type: 'CHANGE_USER', payload: user})
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    handleSearch()
    setQuery('')
  }
  async function handleSearch() {
    //verify if the user is not searching for himself
    if(username === queryInput.trim()) {
      setUser(null)
      return
    }
    const q = query(collection(db, 'users'), where('username', '==', queryInput.trim()))
    try { 
      const querySnapshot = await getDocs(q)
      if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser(doc.data() as UserData)
        })
      } else setUser(null)
    } catch (error) {
      setError(true)   
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className='my-4 flex items-center bg-jet rounded-xl w-full text-neutral-300'>
        <MagnifyingGlass size={18} className='text-neutral-400 ml-3' />
        <input value={queryInput} onChange={e => setQuery(e.target.value)} className='w-full rounded-xl focus:outline-none p-2 placeholder:text-neutral-400 leading-4 bg-jet' type='text' placeholder='search user...' />
      </form>
      {user && 
        <div onClick={() => {
          handleSelection(user)
          handleClick()
        }}
        className='hover:bg-jet border border-neon-blue p-4 py-3 rounded-xl cursor-pointer mb-2'>
        <BasicInfo img={user.photoURL} name={user.name} />
        </div>
      } 
    </div>
  )
}