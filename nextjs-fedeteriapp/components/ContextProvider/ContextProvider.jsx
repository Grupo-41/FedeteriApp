'use client'
import React, { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext(null);

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const userObject = {user, setUser}

  return (
    <>
        <UserContext.Provider value={userObject}>
            {children}
        </UserContext.Provider>
    </>
  )
}

export default ContextProvider