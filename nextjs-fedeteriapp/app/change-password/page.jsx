'use client'
import React, { useEffect, useRef } from 'react'
import { useLocalStorage } from 'react-use'

const Page = () => {
    const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '')
    const refActualPass = useRef();
    const refNewPass = useRef();


  return (
    <div className="mt-5 d-flex justify-content-center w-100">
    <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
        { email !== '' &&
            <div className="mb-3">
                <label htmlFor="actualPass" className="form-label">DNI</label>
                <input ref={refActualPass} type="password" placeholder="Ingrese su DNI" className="form-control border border-dark" id="actualPass" />
            </div>
        }
        <div className="mb-4">
          <label htmlFor="contra" className="form-label">Contraseña</label>
          <input ref={refNewPass} type="password" placeholder="Ingrese su contraseña" className="form-control border border-dark" id="contra"/>
        </div>
        <button type="button" style={{backgroundColor: '#e7ab12 ', float: 'right'}} className="btn">Cambiar contraseña</button>
      </form>
    </div>
  )
}

export default Page