'use client'
import React, { useRef } from 'react'
import { useContext } from 'react';
import { UserContext } from '@/components/ContextProvider/ContextProvider';

const page = () => {
    const refDNI = useRef();
    const refPass = useRef();

    const { user, setUser } = useContext(UserContext);

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
    <div class="mt-5 d-flex justify-content-center w-100">
        <form style={{minWidth: '400px', background: 'white'}} class="border rounded p-4 w-25 align-self-center">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">DNI</label>
              <input ref={refDNI} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Contraseña</label>
              <input ref={refPass} type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div className='form-label mb-4'>
              <a href="/recovery-password">Olvidé mi contraseña</a>
            </div>
            <button onClick={clickLogin} type="button" style={{backgroundColor: '#e7ab12 '}} class="btn">Iniciar sesión</button>
          </form>
    </div>
  )
}

export default page