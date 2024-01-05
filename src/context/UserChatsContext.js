'use client'
import React, { createContext, useReducer } from 'react'

const initialState = {
  userChats: {}
}

const actionTypes = {
  SET_USER_CHATS: 'SET_USER_CHATS'
}

const userChatsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_CHATS:
      return {
        ...state,
        userChats: action.payload
      };
    default:
      return state
  }
}

export const UserChatsContext = createContext()

export const UserChatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userChatsReducer, initialState)

  const setUserChats = (userChats) => {
    dispatch({
      type: actionTypes.SET_USER_CHATS,
      payload: userChats
    })
  }

  return (
    <UserChatsContext.Provider
      value={{
        userChats: state.userChats,
        setUserChats
      }}
    >
      {children}
    </UserChatsContext.Provider>
  )
}