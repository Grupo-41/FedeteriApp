"use client"
import React, { useRef } from 'react'
import { useLocalStorage } from 'react-use'

const Page = () => {
  const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '');
  const codeRef = useRef();

  function validateCode(){
    const codigo = codeRef.current.value;

    if(email !== '' && codigo !== ''){
      const URL = `http://localhost:5000/api/usuarios/recuperacion/${email}/validar/${codigo}`;

      fetch(URL)
      .then(data => data.json())
      .then(data => {
        if(data === true){
          
        }
      })
    }
  }

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
    <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
        <div className='mb-3'>
          <label htmlFor="code" className="form-label">Código</label>
          <input ref={codeRef} placeholder='Ingrese el código que ha recibido en su correo' type="text" className="form-control" id="code"/>
        </div>

        <button onClick={validateCode} type="button" className="btn" style={{background: '#e7ab12 '}}>Ingresar código</button>
      </form>
    </div>  
    )
}

export default Page