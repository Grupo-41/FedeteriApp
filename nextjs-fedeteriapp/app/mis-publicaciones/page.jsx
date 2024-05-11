'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import Image from 'next/image'
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
      if(!user)
        return

      const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/articulos';
      
      fetch(URL)
      .then(data => data.json())
      .then(data => setArticulos(data));
    }, [])

    useEffect(() => {
        if(user === null && typeof window !== "undefined")
            window.location.href = "/"
    }, [user])

  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1 className='mb-4'>Tus publicaciones</h1>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {articulos && articulos.length > 0 ?
                articulos.map(x => {
                    return (
                        <div key={x.id} className="card" style={{width: '18rem'}}>
                            <div className='position-relative card-img-top'>
                                <img src={`http://localhost:5000/api/Images/${x.imageNames[0]}`} height={175} style={{objectFit: 'contain'}} alt="" className="w-100 p-2" />
                                <div class="btn-group-vertical position-absolute top-0 end-0 mt-2 me-2">
                                    <button type="button" class="btn btn-warning p-1 pt-0 pb-1"><MdEdit size={16}/></button>
                                    <button type="button" class="btn btn-danger p-2 pt-0 pb-1"><BsFillTrashFill size={16}/></button>
                                </div>
                            </div>
                            
                            <div className="card-footer">
                                <h5 className="card-title">{x.descripcion}</h5>
                                <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{x.estado}</p>
                                <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{x.categoria || "Aún sin definir"}</p>
                            </div>
                            <div className='card-footer'>{x.tasado ? "Artículo publicado" : "Artículo a la espera de ser tasado"}</div>
                        </div>
                    )
                })
                :
                <p>Usted no posee publicaciones</p>
        }
        </div>
    </div>
  )
}

export default Page