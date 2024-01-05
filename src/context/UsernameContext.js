'use client'

import { AuthContext } from './AuthContext'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

export const UsernameContext = createContext()

export const UsernameContextProvider = ({children}) => {
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState(String)

  async function getUsername() {
    if(!currentUser?.uid) {
      setIsLoading(false)
      return
    }
    try {
      const storedUsername = sessionStorage.getItem(`username_${currentUser?.uid}`)
      if(storedUsername) setUsername(storedUsername)
      else {
        const usernameQuery = await getDocs(query(collection(db, 'users'), where('uid', '==', currentUser?.uid)))
        if (usernameQuery.docs.length > 0) {
          const userData = usernameQuery.docs[0].data()
          const fetchedUsername = `@${userData.username}`
          setUsername(fetchedUsername)
          sessionStorage.setItem(`username_${currentUser.uid}`, fetchedUsername)
        }
      }
    } catch (error) {
      console.error('Error fetching username:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getUsername()
  }, [currentUser])
  return (
    <UsernameContext.Provider value={{username, isLoading}}>
      {children}
    </UsernameContext.Provider>
  )
}