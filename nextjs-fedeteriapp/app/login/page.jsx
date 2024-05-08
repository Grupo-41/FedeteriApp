'use client'
import React, { useRef, useState } from 'react'
import { useLocalStorage } from 'react-use';
import toast from 'react-hot-toast';


const Page = () => {
    const refDNI = useRef();
    const refPass = useRef();
    const [error, setError] = useState(false)
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '');

    function keyDown(e){
      if (e.key === 'Enter' || e.keyCode === 13) {
        clickLogin();
      }
    } 

    function clickLogin(){
        fetch('http://localhost:5000/api/Usuarios/login?' + new URLSearchParams({
            dni: refDNI.current.value,
            contrasena: refPass.current.value,
        }))
        .then(data => data.json())
        .then(data => {
            if(data.status !== 400){
                if(data.esAdmin){
                    data = {...data, validado: false}
                    setUser(data)
                    window.location.href = '/ingresar-codigo';
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
    <div className="mt-5 d-flex justify-content-center w-100">
        <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">DNI</label>
              <input ref={refDNI} type="text" placeholder="Ingrese su DNI" className="form-control border border-dark" id="email" />
            </div>
            <div className="mb-4">
              <label htmlFor="contra" className="form-label">Contraseña</label>
              <input onKeyDown={(e) => keyDown(e)} ref={refPass} type="password" placeholder="Ingrese su contraseña" className="form-control border border-dark" id="contra"/>
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