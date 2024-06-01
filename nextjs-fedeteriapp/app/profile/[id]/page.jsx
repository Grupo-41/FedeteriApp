'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use';

const Page = ({params}) => {
    const id = params.id;
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [searchedUser, setSearchedUser] = useState(null)
    const [truequesCount, setTruequesCount] = useState(0);

    useEffect(() => {
        let URL = 'http://localhost:5000/api/Usuarios/' + id;

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

        URL = 'http://localhost:5000/api/Usuarios/' + id + '/trueques-pendientes';

        fetch(URL)
        .then(data => data.json())
        .then(data => setTruequesCount(data.filter(x => x.realizado).length));
    }, [])

    return (
        <>
        {
            user !== null ?
            searchedUser ?
            <div className="mt-5 d-flex flex-column justify-content-center w-100">
                <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
                    <h3 className='text-center mt-1 mb-3'>Perfil de {searchedUser.nombre}</h3>
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
                    <div className='d-flex flex-row gap-3'>
                        <div className="mb-3">
                            <label for="truequesCount" className="form-label">Trueques realizados</label>
                            <input type="text" value={truequesCount} className="form-control border border-dark" id="truequesCount" disabled/>
                        </div>
                        <div className="mb-3">
                            <label for="pointsCount" className="form-label">Puntos</label>
                            <input type="text" value={searchedUser.puntos} className="form-control border border-dark" id="pointsCount" disabled/>
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