'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { validatePassword } from '@/app/utils'

const ChangePassword = () => {
    const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '')
    const [user, setUser, removeUser] = useLocalStorage('user', null)
    const [passVisibility, setPassVisibility] = useState(false)
    const refRePass = useRef();
    const refPass = useRef();

    function changePassword(){
        if(checkInputs())
            return

        const URL = "http://localhost:5000/api/Usuarios/recuperar-contrasena"
        const bodyObject = {
            email: email,
            contrasena: refPass.current.value
        }

        fetch(URL, ({
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        })).then(() => { removeEmail(); window.location.href = '/login' })
    }

    function checkInputs(){
        if(!refPass.current.value){
            toast.error("Debe ingresar una contraseña.")
            return true;
        }
        if(!validatePassword(refPass.current.value)){
            toast.error("La contraseña debe tener más de 6 caracteres, 1 carácter especial y 1 mayúscula")
            return true;
        }
        if(!refRePass.current.value || refRePass.current.value !== refPass.current.value){
            toast.error("La contraseñas ingresadas deben coincidir")
            return true;
        }

        return false;
    }

    function togglePassVisibility(){
        setPassVisibility(!passVisibility);
    }

  return (
      <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
        <h3 className='mb-3'>Recuperación de contraseña</h3>
            <div key={"newPass"} className="mb-3">
                <label htmlFor="pass" className="form-label">Contraseña</label>
                <div className="input-group mb-3">
                    <input ref={refPass} type={passVisibility ? "text" : "password"} placeholder="Ingrese su contraseña" className="form-control border border-dark" id="pass"/>
                    <button className="btn btn-outline-secondary border-dark" onClick={togglePassVisibility} type="button">{passVisibility ? <FiEye className='mb-1' /> : <FiEyeOff className='mb-1' />}</button>
                </div>
            </div>
            <div key={"newRePass"} className="mb-3">
                <label htmlFor="rePass" className="form-label">Repita su contraseña</label>
                <div className="input-group mb-3">
                    <input ref={refRePass} type={passVisibility ? "text" : "password"} placeholder="Ingrese su contraseña" className="form-control border border-dark" id="rePass"/>
                    <button className="btn btn-outline-secondary border-dark" onClick={togglePassVisibility} type="button">{passVisibility ? <FiEye className='mb-1' /> : <FiEyeOff className='mb-1' />}</button>
                </div>
            </div>
        <button onClick={changePassword} type="button" style={{backgroundColor: '#e7ab12 ', float: 'right'}} className="btn mt-2">Cambiar contraseña</button>
      </form>
  )
}

export default ChangePassword