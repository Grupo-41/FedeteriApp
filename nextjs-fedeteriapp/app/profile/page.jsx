'use client'
import React from 'react'
import { useLocalStorage } from 'react-use'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);

    if(user === null)
        return "Usted no se encuentra autenticado"

    if(user === null && typeof window !== "undefined")
        window.location.href = "/"

    return (
        <div className="mt-5 d-flex flex-column justify-content-center w-100">
            <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
                <h3 className='text-center mt-1 mb-3'>Mi perfil</h3>
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
                    <input type="text" value={user.sucursal.nombre + " - " + user.sucursal.direccion} className="form-control border border-dark" id="fecha" disabled/>
                </div>
                <input onClick={() => {window.location.href = '/modify-profile'}} type='button' className="btn btn-primary mt-2" value="Modificar perfil"/>
            </form>
        </div>
    )
}

export default Page