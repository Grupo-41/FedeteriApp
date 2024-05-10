'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import Image from 'next/image'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
      const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/articulos';
      
      fetch(URL)
      .then(data => data.json())
      .then(data => setArticulos(data));
    }, [])

  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1 className='mb-4'>Tus publicaciones</h1>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {articulos.map(x => {
                return (
                    <div key={x.id} className="card" style={{width: '18rem'}}>
                        <img src={`http://localhost:5000/api/Images/${x.imageNames[0]}`} height={175} style={{objectFit: 'contain'}} alt="" className="p-2 card-img-top" />
                        <div className="card-footer">
                            <h5 className="card-title">{x.descripcion}</h5>
                            <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{x.estado}</p>
                            <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{x.categoria || "Aún sin definir"}</p>
                        </div>
                        <div className='card-footer'>{x.tasado ? "Artículo publicado" : "Artículo a la espera de ser tasado"}</div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Page