'use client'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [currentUser, setUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsub()
  }, [])
  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}