'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'react-use';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from "react-icons/fi"

const Page = () => {
    const refDNI = useRef();
    const refPass = useRef();
    const [error, setError] = useState(false)
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [userToValidate, setUserToValidate, removeUserToValidate] = useLocalStorage('user-validate', null);
    const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '');
    const [passVisibility, setPassVisibility] = useState(false)

    useEffect(() => {
      if(user !== null && typeof window !== "undefined"){
        window.location.href = "/"
      }
      }, [user])

    function keyDown(e){
      if (e.key === 'Enter' || e.keyCode === 13) {
        clickLogin();
      }
    }

    function togglePassVisibility(){
      setPassVisibility(!passVisibility)
    }

    function clickLogin(){
        fetch('http://localhost:5000/api/Usuarios/login?' + new URLSearchParams({
            dni: refDNI.current.value,
            contrasena: refPass.current.value,
        }))
        .then(data => data.json())
        .then(data => {
            if(data.status !== 400){
                if(data.esAdmin === true){
                    setUserToValidate(data)
                    window.location.href = '/validar-codigo';
                }
                else{
                    setUser(data)
                    window.location.href = '/'
                }

                removeEmail();
            }
            else{
              toast.error('Credenciales inválidas.')
            }
        })
        .catch(() => {
          toast.error('Credenciales inválidas.')
        })

    }
    
  return (
    <div className="mt-5 d-flex flex-column gap-5 justify-content-center align-items-center w-100">
      <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25">
        <h3 className='text-center'>Inicio de sesión</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">DNI</label>
            <input ref={refDNI} type="text" placeholder="Ingrese su DNI" className="form-control border border-dark" id="email" />
          </div>
          <div className="mb-4">
            <label htmlFor="contra" className="form-label">Contraseña</label>
            <div className="input-group mb-3">
              <input onKeyDown={(e) => keyDown(e)} ref={refPass} type={passVisibility ? "text" : "password"} placeholder="Ingrese su contraseña" className="form-control border border-dark" id="contra"/>
              <button className="btn btn-outline-secondary border-dark" onClick={togglePassVisibility} type="button" id="button-addon2">{passVisibility ? <FiEye className='mb-1' /> : <FiEyeOff className='mb-1' />}</button>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <a href="/recovery-password">Olvidé mi contraseña</a>
            <button onClick={clickLogin} type="button" style={{backgroundColor: '#e7ab12 ', float: 'right'}} className="btn">Iniciar sesión</button>
          </div>
      </form>
    </div>
  )
}

export default Page