"use client"
import React, { useRef, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import toast from 'react-hot-toast'

const Page = () => {
  const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '');
  const codeRef = useRef();

  useEffect(() => {
    if(email === '')
      window.location.href = '/'
  }, [email])

  function validateCode(){
    const codigo = codeRef.current.value;

    if(!codigo)
      toast.error("Debe ingresar un código.");

    if(email !== '' && codigo !== ''){
      const URL = `http://localhost:5000/api/usuarios/recuperacion/${email}/validar/${codigo}`;

      fetch(URL)
      .then(data => data.json())
      .then(data => {
        if(data === true)
          window.location.href = '/change-password'
        else
          toast.error("El código es incorrecto.")
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

        <button onClick={validateCode} type="button" className="btn float-end" style={{background: '#e7ab12'}}>Ingresar código</button>
      </form>
    </div>  
    )
}

export default Page