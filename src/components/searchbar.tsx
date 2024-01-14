import { db } from '@/firebase'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { ChatContext } from '@/context/ChatContext'
import { UserChatsContext } from '@/context/UserChatsContext'
import { Info } from './Info'

export type UserData = {
  uid: string
  name: string
  username: Promise<string>
  photoURL: string
}

export default function SearchBar() {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const { userChats } = useContext(UserChatsContext)
  const [queryInput, setQuery] = useState(String)
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState(false)
  
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
    const selectedUser = {
      ...user,
      displayName: user.name
    }
    dispatch({type: 'CHANGE_USER', payload: selectedUser}) 
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    handleSearch()
    setQuery('')
  }
  function checkQueryUser(user: UserData): boolean {
    //verify if the user is not searching for himself
    if(`@${user.username}` === currentUser.username.value) return false
    //verify if the users is not in usersChats
    const isUserInChats = Object.entries(userChats).some((chat: any) => {
      return chat[1].userInfo.uid === user.uid
    })
    return !isUserInChats
  }
  async function handleSearch() {
    const q = query(collection(db, 'users'), where('username', '==', queryInput.trim()))
    try {
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const users = querySnapshot.docs.map((doc) => doc.data() as UserData)
        const validUser = users.find((user) => checkQueryUser(user))
  
        if (validUser) {
          setUser(validUser)
        } else setUser(null)
      } else setUser(null)
    } catch (error) {
      setError(true)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className='mb-3 flex items-center bg-jet rounded-xl w-full text-neutral-300'>
        <MagnifyingGlass size={18} weight='bold' className='text-neutral-400 ml-3' />
        <input value={queryInput} onChange={e => setQuery(e.target.value)} className='w-full rounded-xl font-semibold focus:outline-none p-2 placeholder:text-neutral-400 placeholder:font-semibold leading-4 bg-jet' type='text' placeholder='search user...' />
      </form>
      {user && 
        <div onClick={() => {
          handleSelection(user)
          handleClick()
        }}
        className='hover:bg-jet border border-neon-blue p-4 py-3 rounded-xl cursor-pointer mb-2'>
        <Info.Root>
          <Info.Image name={user.name} source={user.photoURL} />
          <Info.Content name={user.name} username={user.username} />
        </Info.Root>
        </div>
      } 
    </div>
  )
}