'use client'
import { useState } from 'react'
import { createContext } from 'react'

export const MessageContext = createContext()

export const MessageContextProvider = ({children}) => {
  const [selectedMessage, setSelectedMessage] = useState(null)

  return (
    <MessageContext.Provider value={{selectedMessage, setSelectedMessage}}>
      {children}
    </MessageContext.Provider>
  )
}