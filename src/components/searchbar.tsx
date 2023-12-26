import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FormEvent, useState } from 'react'
import BasicInfo from './basicInfo'
import Chats from './chats'

type UserData = {
  name: string
  username: string
  photoURL: string
}

export default function SearchBar() {
  const [queryInput, setQuery] = useState(String)
  const [user, setUser] = useState<UserData>()
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    handleSearch()
  }
  async function handleSearch() {
    const q = query(collection(db, 'users'), where('username', '==', queryInput))

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as UserData)
        console.log(doc.data())
      })
    } catch (error) {
      setError(true)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='my-4'>
        <input onChange={e => setQuery(e.target.value)} className='w-full rounded-xl focus:outline-none px-3 py-2 bg-jet placeholder:text-neutral-400' type='text' placeholder='search user...' />
      </form>
      {user && 
        <div className='hover:bg-jet border border-neon-blue p-4 py-3 rounded-xl cursor-pointer mb-2'>
        <BasicInfo img={user.photoURL} name={user.name} />
        </div>
      } 
    </div>
  )
}