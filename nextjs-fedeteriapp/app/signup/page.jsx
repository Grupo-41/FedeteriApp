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
        })
    }

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
        <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">DNI</label>
                <input ref={refDNI} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className='d-flex flex-row gap-3'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Nombre</label>
                    <input ref={refName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Apellido</label>
                    <input ref={refApellido} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email</label>
                <input ref={refEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className='d-flex flex-row gap-3 w-100'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Teléfono</label>
                    <input ref={refTelefono} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3 w-50">
                    <label for="exampleInputEmail1" className="form-label">Fecha de nacimiento</label>
                    <input ref={refNacimiento} type="date" className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                <input ref={refPass} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="sucursal-choice">Sucursal:</label>
                <input ref={refSucursal} className='form-control' list="sucursal-list" id="sucursal-choice" name="sucursal-choice" />
                <datalist id="sucursal-list">
                    {sucursales.map(x => 
                        <option value={x.nombre}>{x.direccion}</option>
                    )}
                </datalist>
            </div>
            <button onClick={postUsuario} style={{background: '#e7ab12'}} type='button' className="btn">Registrarse</button>
        </form>
    </div>
  )
}

export default page