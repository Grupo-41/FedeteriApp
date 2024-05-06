'use client'
import { UserContext } from '@/components/ContextProvider/ContextProvider';
import React, {useRef, useEffect, useState, useContext} from 'react'

const page = () => {
    const [sucursales, setSucursales] = useState([]);
    const refDNI = useRef();
    const refName = useRef();
    const refApellido = useRef();
    const refPass = useRef();
    const refTelefono = useRef();
    const refNacimiento = useRef();
    const refEmail = useRef();
    const refSucursal = useRef();
    
    useEffect(() => {
        const URL = "http://localhost:5000/api/sucursales"

        fetch(URL)
        .then(data => data.json())
        .then(data => setSucursales(data))
    }, [])

    function postUsuario(){
        const URL = "http://localhost:5000/api/Usuarios"

        const user = {
            nombre: refName.current.value + " " + refApellido.current.value,
            dni: refDNI.current.value,
            email: refEmail.current.value,
            nacimiento: refNacimiento.current.value,
            telefono: refTelefono.current.value,
            contrasena: refPass.current.value,
            sucursalID: sucursales.find(x => x.nombre === refSucursal.current.value).id
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() =>{
            window.location.href = 'login';
        }).then(() =>{
            window.location.href = '/';
        })
    }

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
        <form onSubmit={postUsuario} style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input ref={refDNI} type="text" placeholder="Ingrese su DNI" className="form-control border border-dark" id="dni" required/>
            </div>
            <div className='d-flex flex-row gap-3'>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input ref={refName} type="text" placeholder="Ingrese su nombre"className="form-control border border-dark" id="nombre" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input ref={refApellido} type="text" placeholder="Ingrese su apellido" className="form-control border border-dark" id="apellido" required/>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input ref={refEmail} type="email" placeholder="Ingrese su correo electrónico"className="form-control border border-dark" id="email" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input ref={refTelefono} type="text" placeholder="Ingrese su número de teléfono"className="form-control border border-dark" id="telefono" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Fecha de nacimiento</label>
                <input ref={refNacimiento} type="date" placeholder="Ingrese su fecha de nacimiento"className="form-control border border-dark" id="fecha" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Contraseña</label>
                <input ref={refPass} type="password" placeholder="Ingrese su contraseña"className="form-control border border-dark" id="contra" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="sucursal-choice" className="form-label">Sucursal:</label>
                <select id="sucursal-list" ref={refSucursal} className='form-control form-select border border-dark' required >
                    {sucursales.map(x => 
                        <option value={x.id}>{x.nombre + " - " + x.direccion}</option>
                    )}
                </select>
            </div>
            <input type='submit' className="btn btn-primary" value="Registrarse"/>
        </form>
    </div>
  )
}

export default page