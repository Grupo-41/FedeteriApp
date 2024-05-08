'use client'
import React, { useEffect, useRef } from 'react'
import { useLocalStorage } from 'react-use'

const ChangePassword = () => {
    const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '')
    const [user, setUser, removeUser] = useLocalStorage('user', null)
    const refActualPass = useRef();
    const refNewPass = useRef();

    function changePassword(){
        let URL = "http://localhost:5000/api/Usuarios/"
        let bodyObject;

        if(email === ''){
            URL += "cambiar-contrasena";
            bodyObject = {
                id: user.id,
                contrasenaActual: refActualPass.current.value,
                contrasena: refNewPass.current.value
            }
        }
        else{
            URL += 'recuperar-contrasena';
            bodyObject = {
                email: email,
                contrasena: refNewPass.current.value
            }
        }

        fetch(URL, ({
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        })).then(() => window.location.href = '/')
    }

  return (
      <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
        { email === '' &&
            <div key={"actualPass"} className="mb-3">
                <label htmlFor="actualPass" className="form-label">Contraseña actual</label>
                <input ref={refActualPass} type="password" placeholder="Ingrese su contraseña actual" className="form-control border border-dark" id="actualPass" />
            </div>
        }
        <div key={"newPass"} className="mb-4">
          <label htmlFor="contra" className="form-label">Nueva contraseña</label>
          <input ref={refNewPass} type="password" placeholder="Ingrese su nueva contraseña" className="form-control border border-dark" id="contra"/>
        </div>
        <button onClick={changePassword} type="button" style={{backgroundColor: '#e7ab12 ', float: 'right'}} className="btn">Cambiar contraseña</button>
      </form>
  )
}

export default ChangePassword