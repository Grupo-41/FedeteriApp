'use client'
import React, { useRef } from 'react'
import { useLocalStorage } from 'react-use';

const page = () => {
    const refDNI = useRef();
    const refPass = useRef();
    const [user, setUser, removeUser] = useLocalStorage('user', null);

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
            }
        })
    }
    
  return (
    <div className="mt-5 d-flex justify-content-center w-100">
        <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">DNI</label>
              <input ref={refDNI} type="text" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="contra" className="form-label">Contraseña</label>
              <input ref={refPass} type="password" className="form-control" id="contra"/>
            </div>
            <div className='form-label mb-4'>
              <a href="/recovery-password">Olvidé mi contraseña</a>
            </div>
            <button onClick={clickLogin} type="button" style={{backgroundColor: '#e7ab12 '}} className="btn">Iniciar sesión</button>
          </form>
    </div>
  )
}

export default page