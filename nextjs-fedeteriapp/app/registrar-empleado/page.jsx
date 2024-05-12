'use client'
import React, {useRef, useEffect, useState, useContext} from 'react'
import toast from 'react-hot-toast';
import { validateEmail, validatePassword, validateAge, emailExists, dniExists } from '../utils';
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useLocalStorage } from 'react-use';

const Page = () => {
    const [sucursales, setSucursales] = useState([]);
    const [user, setUser, removeUser] = useLocalStorage('user', null)
    const refDNI = useRef();
    const refName = useRef();
    const refApellido = useRef();
    const refTelefono = useRef();
    const refNacimiento = useRef();
    const refEmail = useRef();
    const refSucursal = useRef();
    
    useEffect(() => {
        if(user === null && typeof window !== "undefined")
            window.location.href = "/"
        if(user !== null && !user.esAdmin)
            window.location.href = "/"

        }, [user])

    useEffect(() => {
        const URL = "http://localhost:5000/api/sucursales"

        fetch(URL)
        .then(data => data.json())
        .then(data => setSucursales(data))
    }, [])

    async function postEmpleado(){
        const URL = "http://localhost:5000/api/Empleados"

        if(await checkInputs())
            return

        const user = {
            nombre: refName.current.value,
            apellido: refApellido.current.value,
            dni: refDNI.current.value,
            email: refEmail.current.value,
            nacimiento: refNacimiento.current.value,
            telefono: refTelefono.current.value,
            sucursalID: refSucursal.current.value
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() =>{
            window.location.href = '/login';
        })
    }

    async function checkInputs(){
        if(!refDNI.current.value){
            toast.error('Debe ingresar un DNI.')
            return true;
        }
        if(await dniExists(refDNI.current.value)){
            toast.error("Ya existe un usuario con el DNI ingresado.")
            return true;
        }
        if(!refName.current.value){
            toast.error('Debe ingresar un nombre.')
            return true;
        }
        if(!refApellido.current.value){
            toast.error('Debe ingresar un apellido.')
            return true;
        }
        if(!refEmail.current.value || !validateEmail(refEmail.current.value)){
            toast.error("Debe ingresar un email válido.")
            return true;
        }
        if(await emailExists(refEmail.current.value)){
            toast.error("El email ingresado ya se encuentra registrado en la aplicación.")
            return true;
        }
        if(!refTelefono.current.value){
            toast.error("Debe ingresar un número de teléfono.")
            return true;
        }
        if(!validateAge(refNacimiento.current.value)){
            return true;
        }

        return false;
    }

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
        <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <h3 className='text-center'>Registro de empleados</h3>
            <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input ref={refDNI} type="number" min={0} placeholder="Ingrese el DNI del empleado a registrar" className="form-control border border-dark" id="dni" required/>
            </div>
            <div className='d-flex flex-row gap-3'>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input ref={refName} type="text" placeholder="Ingrese el nombre"className="form-control border border-dark" id="nombre" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input ref={refApellido} type="text" placeholder="Ingrese el apellido" className="form-control border border-dark" id="apellido" required/>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input ref={refEmail} type="email" placeholder="Ingrese un correo electrónico"className="form-control border border-dark" id="email" required/>
            </div>
            <div className='d-flex flex-row gap-3'>
                <div className="mb-3 w-75">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input ref={refTelefono} type="number" min={0} placeholder="Ingrese un número de teléfono"className="form-control border border-dark" id="telefono" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha de nacimiento</label>
                    <input ref={refNacimiento} type="date" placeholder="Ingrese su fecha de nacimiento"className="form-control border border-dark" id="fecha" required/>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="sucursal-choice" className="form-label">Sucursal:</label>
                <select id="sucursal-list" ref={refSucursal} className='form-control form-select border border-dark' required >
                    {sucursales.map(x => 
                        <option key={x.id} value={x.id}>{x.nombre + " - " + x.direccion}</option>
                    )}
                </select>
            </div>
            <input type='button' onClick={postEmpleado} className="btn mt-2 w-100" style={{background: '#e7ab12'}} value="Registrar empleado"/>
        </form>
    </div>
  )
}

export default Page