'use client'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [currentUser, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true) 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const ref = collection(db, 'users')
      const q = query(ref, where('uid', '==', user.uid))
      const snap = await getDocs(q)
      if(snap.docs.length > 0) {
        const username = snap.docs[0].data().username
        setUser({
          ...user,
          username: '@'+username
        })
      } else setUser(user)
      setIsLoading(false)
    })
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}