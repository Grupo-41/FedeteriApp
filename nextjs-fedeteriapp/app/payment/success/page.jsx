'use client'
import React, { useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { FaCheck } from "react-icons/fa";
import ReactLoading from 'react-loading'

const Page = () => {
  const [aDestacar, setADestacar, removeADestacar] = useLocalStorage('destacado', null);

  useEffect(() => {
    if (!aDestacar || !aDestacar.id) {
      if(window)
        window.location.href = "/"

      return;
    }

    const URL = `http://localhost:5000/api/Articulos/destacar/${aDestacar.id}/${aDestacar.duracion}`;
    console.log(URL)

    fetch(URL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(() => {
      setTimeout(() => {
        removeADestacar();

        if (window)
          window.location.href = "/"
      }, 2500);
    })
  }, [])

  return (
    <div className='rounded bg-white p-5 pb-4 mb-1 d-flex flex-column justify-content-center align-items-center text-center' >
      <h3>Pago realizado correctamente <FaCheck className='ms-2 mb-3' fill='#0a4' size={24} /></h3>
      { aDestacar && 
        <p>Su artículo <strong>{aDestacar.descripcion}</strong> fue destacado por <strong>{aDestacar.duracion} día{aDestacar.duracion > 1 && "s"}!</strong></p>
      }
      Redirigiendo a la página principal...
      <ReactLoading className='my-3' height={35} width={35} type='bars' color='#023' />
    </div>
  )
}

export default Page