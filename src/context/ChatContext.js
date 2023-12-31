'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { AuthContext } from './AuthContext'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  if(!currentUser) return
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  }
  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  useEffect(() => {
    if(state.user.uid) {
      const userDocRef = doc(db, 'users', state.user.uid)
      const unsubscribe = onSnapshot(userDocRef, (userDoc) => {
        const data = userDoc.data()
        const userStatus = data ? data.status || 'offline' : 'offline'
        const updatedUser = {
          ...state.user,
          status: userStatus,
        }
        dispatch({ type: 'CHANGE_USER', payload: updatedUser })
      })
      return () => {
        unsubscribe()
      }
    }

  }, [state.user.uid])
  
  return (
    <ChatContext.Provider value={{ userData:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}