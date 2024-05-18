'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import Publicacion from '@/components/Publicacion/Publicacion';

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
      const URL = 'http://localhost:5000/api/Articulos/a-tasar';
      
      fetch(URL)
      .then(data => data.json())
      .then(data => setArticulos(data));
    }, [])

    useEffect(() => {
        if((user === null || !user.esEmpleado) && typeof window !== "undefined")
            window.location.href = "/"
    }, [user])

  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1>Artículos a tasar</h1>
        {articulos.length > 0 && <em>Presione sobre un artículo para ver más información sobre el mismo y tasarlo</em>}
        <div style={{minWidth: '400px', maxWidth: '60rem', maxHeight: '71.5vh', padding:'0 10px', overflow: 'auto'}} className="mt-4 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {articulos && articulos.length > 0 ?
                articulos.map(x => {
                    return (
                        <Publicacion clickable={true} key={x.id} item={x} own={false}/>
                    )
                })
                :
                <p>Actualmente no hay artículos pendientes a tasar</p>
        }
        </div>
    </div>
  )
}

export default Page