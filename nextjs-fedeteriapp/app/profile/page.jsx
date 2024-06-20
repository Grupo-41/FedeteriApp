'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [truequesCount, setTruequesCount] = useState(0);

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/trueques-pendientes';

        fetch(URL)
        .then(data => data.json())
        .then(data => setTruequesCount(data.filter(x => x.realizado).length));
    }, [])

    if (user === null)
        return "Usted no se encuentra autenticado"

    if (user === null && typeof window !== "undefined")
        window.location.href = "/"

    return (
        <div className="mt-5 d-flex flex-column justify-content-center w-100">
            <form style={{ minWidth: '400px', background: 'white' }} className="border rounded p-4 w-25 align-self-center">
                <h3 className='text-center mt-1 mb-3'>Mi perfil</h3>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input value={user.dni} type="text" className="form-control border border-dark" id="dni" disabled />
                </div>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" value={user.nombre} className="form-control border border-dark" id="nombre" disabled />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" value={user.apellido} className="form-control border border-dark" id="apellido" disabled />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={user.email} className="form-control border border-dark" id="email" disabled />
                </div>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3 w-75">
                        <label for="telefono" className="form-label">Teléfono</label>
                        <input type="text" value={user.telefono} className="form-control border border-dark" id="telefono" disabled />
                    </div>
                    <div className="mb-3">
                        <label for="fecha" className="form-label">Fecha de nacimiento</label>
                        <input type="date" value={user.nacimiento} className="form-control border border-dark" id="fecha" disabled />
                    </div>
                </div>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3">
                        <label for="truequesCount" className="form-label">Trueques realizados</label>
                        <input type="text" value={truequesCount} className="form-control border border-dark" id="truequesCount" disabled />
                    </div>
                    <div className="mb-3">
                        <label for="pointsCount" className="form-label">Puntos</label>
                        <input type="text" value={user.puntos} className="form-control border border-dark" id="pointsCount" disabled />
                    </div>
                </div>
                {
                    user.sucursal &&
                    <div className="mb-3">
                        <label htmlFor="sucursal-choice" className="form-label">Sucursal:</label>
                        <input type="text" value={user.sucursal.nombre + " - " + user.sucursal.direccion} className="form-control border border-dark" id="fecha" disabled />
                    </div>
                }
                <div className='d-flex flex-row justify-content-around gap-3 mt-4'>
                    <input onClick={() => { window.location.href = '/modify-profile' }} type='button' className="btn w-50" style={{ background: '#e7ab12' }} value="Modificar perfil" />
                    <input onClick={() => { window.location.href = '/canjear-puntos' }} type='button' className="btn w-50" style={{ background: '#e7ab12' }} value="Canjear puntos" />
                </div>
            </form>
        </div>
    )
}

export default Page