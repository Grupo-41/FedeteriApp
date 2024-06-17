'use client'
import React, { useEffect } from 'react'
import ReactLoading from 'react-loading'

const Page = () => {
    useEffect(() => {
        setTimeout(() => {
            if(window)
                window.location.href = "/"
        }, 3000)
    }, [])

    return (
        <div className='rounded bg-white p-5 pb-4 mb-1 d-flex flex-column justify-content-center align-items-center text-center' >
            <h3>No se ha podido completar el pago</h3>
            <p className='mt-2'>Vuelva a intentarlo más tarde o con otro método de pago</p>
            Redirigiendo a la página principal...
            <ReactLoading className='my-3' height={35} width={35} type='bars' color='#023' />
        </div>
    )
}

export default Page