'use client'
import React, { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext(null);

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
    <>
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    </>
  )
}

export default ContextProvider