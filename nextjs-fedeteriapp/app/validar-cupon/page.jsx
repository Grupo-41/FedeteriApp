"use client"
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
    const cuponRef = useRef();
    const [cupon, setCupon] = useState(null);

    function validateCode() {
        const codigo = cuponRef.current.value;

        if (!codigo) {
            toast.error("Debe ingresar un código.")
            return;
        }

        const URL = `http://localhost:5000/api/validar-cupon/${codigo}`;

        fetch(URL)
            .then(data => {
                if (data.status === 200)
                    return data.json()
                
                return null
            })
            .then(data => {
                setCupon(data)

                if (data !== null) {
                    toast.success("El cupón fue validado correctamente")
                }
                else
                    toast.error("El código es incorrecto.")
            })

    }

    return (
        <div className="mt-5 d-flex justify-content-center w-100">
            <form style={{ minWidth: '400px', background: 'white' }} className="border rounded p-4 w-25 align-self-center">
                <div className='mb-3'>
                    <h3 className='mb-3'>Validador de cupones</h3>
                    <input ref={cuponRef} placeholder='Ingrese el código' type="text" className="form-control" id="cupon" />
                </div>
                {cupon &&
                    <p className='alert alert-success'>El cupón canjeado tiene un descuento de ${cupon.valor}</p>
                }
                <button onClick={validateCode} type="button" className="btn float-end" style={{ background: '#e7ab12' }}>Validar cupón</button>
            </form>
        </div>
    )
}

export default Page