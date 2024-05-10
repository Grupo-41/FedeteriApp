'use client'
import React, { useEffect } from 'react'
import ChangePassword from './component/ChangePassword'
import { useLocalStorage } from 'react-use'

const Page = () => {
  const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '')

  useEffect(() => {
    if(email === '')
      window.location.href = '/'
  }, [email])

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
      <ChangePassword />
    </div>
  )
}

export default Page