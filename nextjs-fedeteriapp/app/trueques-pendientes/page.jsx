'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import TruequeInfo from '@/components/TruequeInfo/TruequeInfo'
import { useLocalStorage } from 'react-use'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [trueques, setTrueques] = useState({});
    
    useEffect(() => {
        if(!user.esAdmin && !user.esEmpleado && typeof(window) !== 'undefined')
            window.location.href = "/";
    }, [user])

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Trueques'

        fetch(URL)
        .then(data => data.json())
        .then(data => {
            setTrueques(data)
            //setTrueques(user.esAdmin ? data : user.esEmpleado ? data.filter(x => x.sucursal.id === user.sucursal.id) : {});
        })
    }, [])

  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1>Trueques pendientes</h1>
        <em>Sucursal: {user && user.sucursal.nombre}</em>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="mt-4 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {trueques && trueques.length > 0 ?
                trueques.map(x => {
                    return (
                        <TruequeInfo key={x.id} 
                        trueque={x} />
                    )
                })
                :
                <p>La sucursal no posee trueques pendientes</p>
        }
        </div>
    </div>
  )
}

export default Page