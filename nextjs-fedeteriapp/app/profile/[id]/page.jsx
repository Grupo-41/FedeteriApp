'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use';

const Page = ({params}) => {
    const id = params.id;
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [searchedUser, setSearchedUser] = useState(null)

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Usuarios/' + id;

        fetch(URL)
        .then(data => {
            if(data.status === 200)
                return data.json()
            
            return null;
        })
        .then(data => {
            if(data !== null)
                setSearchedUser(data);
        })
    }, [])

    return (
        <>
        {
            user !== null ?
            searchedUser ?
            <div className="mt-5 d-flex flex-column justify-content-center w-100">
                <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
                    <h3 className='text-center mt-1 mb-3'>Perfil de {searchedUser.nombre}</h3>
                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label">DNI</label>
                        <input value={searchedUser.dni} type="text" className="form-control border border-dark" id="dni" disabled/>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input  type="text" value={searchedUser.nombre} className="form-control border border-dark" id="nombre" disabled/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" value={searchedUser.apellido} className="form-control border border-dark" id="apellido" disabled/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input  type="email" value={searchedUser.email} className="form-control border border-dark" id="email" disabled/>
                    </div>
                    <div className='d-flex flex-row gap-3'>
                        <div className="mb-3 w-75">
                            <label for="telefono" className="form-label">Teléfono</label>
                            <input type="text" value={searchedUser.telefono} className="form-control border border-dark" id="telefono" disabled/>
                        </div>
                        <div className="mb-3">
                            <label for="fecha" className="form-label">Fecha de nacimiento</label>
                            <input type="date" value={searchedUser.nacimiento} className="form-control border border-dark" id="fecha" disabled/>
                        </div>
                    </div>
                </form>
            </div>
            : "El usuario solicitado no existe"
            : "Debe estar autenticado para ver perfiles ajenos"
        }
        </>
    )
}

export default Page