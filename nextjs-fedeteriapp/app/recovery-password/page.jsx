"use client"
import React, {useRef} from 'react'
import { useLocalStorage } from 'react-use';

const Page = () => {
    const [email, setEmail, removeEmail] = useLocalStorage('email-recovery', '');
    const refEmail = useRef();

    function sendCode(){
        let URL = "http://localhost:5000/api/usuarios/recuperacion/"
        let inputEmail = refEmail.current.value;

        if(validateEmail(inputEmail)){
            setEmail(inputEmail)
            URL = URL + inputEmail;

            fetch(URL, {method: 'POST'});
            window.location.href = `/validar-codigo`
        }
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };


  return (
    <div className="mt-5 d-flex justify-content-center w-100">
    <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
        <div className='mb-3'>
          <label htmlFor="email" className="form-label">Email</label>
          <input ref={refEmail} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">
            Se le enviará un código al correo para validar su identidad y recuperar su contraseña.
          </div>
        </div>

        <button onClick={sendCode} type="button" className="btn" style={{background: '#e7ab12 '}}>Generar código</button>
      </form>
    </div>
  )
}

export default Page