'use client'
import React from 'react'
import { useLocalStorage } from 'react-use'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);

    if(user === null)
        window.location.href = "/"

    return (
        <div className="mt-5 d-flex flex-column justify-content-center w-100">
            <h1 className='text-center mb-4'>Mi perfil</h1>
            <form style={{minWidth: '400px', background: 'white'}} className="border rounded-3 p-4 w-25 align-self-center">
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input value={user.dni} type="text" className="form-control border border-dark" id="dni" disabled/>
                </div>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input  type="text" value={user.nombre} className="form-control border border-dark" id="nombre" disabled/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" value={user.apellido} className="form-control border border-dark" id="apellido" disabled/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input  type="email" value={user.email} className="form-control border border-dark" id="email" disabled/>
                </div>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3 w-75">
                        <label for="telefono" className="form-label">Teléfono</label>
                        <input type="text" value={user.telefono} className="form-control border border-dark" id="telefono" disabled/>
                    </div>
                    <div className="mb-3">
                        <label for="fecha" className="form-label">Fecha de nacimiento</label>
                        <input type="date" value={user.nacimiento} className="form-control border border-dark" id="fecha" disabled/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="sucursal-choice" className="form-label">Sucursal:</label>
                    <input type="text" value={user.sucursal} className="form-control border border-dark" id="fecha" disabled/>
                </div>
                <input type='submit' className="btn btn-primary" value="Registrarse"/>
            </form>
        </div>
    )
}

export default Page