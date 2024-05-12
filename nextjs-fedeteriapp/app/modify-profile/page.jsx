'use client'
import React,{useRef, useEffect, useState, useContext} from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from 'react-use'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { emailExists, validateEmail, validatePassword } from '../utils'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [sucursales, setSucursales] = useState([]);
    const [passVisibility, setPassVisibility] = useState(false);
    const refNombre = useRef();
    const refApellido = useRef();
    const refTelefono = useRef();
    const refEmail = useRef();
    const refSucursal = useRef();

    const refActualPass = useRef();
    const refPass = useRef();
    const refRePass = useRef();
    
    useEffect(() => {
        const URL = "http://localhost:5000/api/sucursales"

        fetch(URL)
        .then(data => data.json())
        .then(data => setSucursales(data))
    }, [])

    useEffect(() => {
        if(user === null && typeof window !== "undefined")
            window.location.href = "/"

        refNombre.current.value = user.nombre;
        refApellido.current.value = user.apellido;
        refEmail.current.value = user.email;
        refTelefono.current.value = user.telefono;
        refSucursal.current.value = user.sucursal.id;
    }, [user])

    function togglePassVisibility(){
        setPassVisibility(!passVisibility)
    }

    async function postDatosPersonales(){
        const URL = "http://localhost:5000/api/Usuarios"

        if(await checkInputs())
            return;

        const objPersonalData = {
            id: user.id,
            nombre: refNombre.current.value,
            apellido: refApellido.current.value,
            email: refEmail.current.value,
            telefono: refTelefono.current.value,
            sucursalID: refSucursal.current.value
        }

        await fetch(URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objPersonalData)
        }).then((data) => {
            if(data.status === 200)
                return data.json();
            
            return null;
        }).then((data) => {
            if(data !== null){
                setUser(data);
                toast.success("Datos personales modificados exitosamente.")
            }
        })
    }

    function changePassword(){
        if(checkPassInputs())
            return

        const URL = "http://localhost:5000/api/Usuarios/cambiar-contrasena"
        const bodyObject = {
            id: user.id,
            contrasenaActual: refActualPass.current.value,
            contrasena: refPass.current.value
        }

        fetch(URL, ({
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        })).then(data => data.json())
        .then((data) =>{
            if(data)
                toast.success("Contraseña modificada exitosamente.")
            else
                toast.error("La contraseña actual ingresada es incorrecta.")
        })
    }

    async function checkInputs(){
        if(!refNombre.current.value){
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
        if(user.email !== refEmail.current.value && await emailExists(refEmail.current.value)){
            toast.error("El email ingresado ya se encuentra registrado en la aplicación.")
            return true;
        }
        if(!refTelefono.current.value){
            toast.error("Debe ingresar un número de teléfono.")
            return true;
        }

        return false;
    }

    function checkPassInputs(){
        if(!refPass.current.value){
            toast.error("Debe ingresar una contraseña.")
            return true;
        }
        if(!validatePassword(refPass.current.value)){
            toast.error("La contraseña debe tener más de 6 caracteres, 1 carácter especial y 1 mayúscula")
            return true;
        }
        if(!refRePass.current.value || refRePass.current.value !== refPass.current.value){
            toast.error("La contraseñas ingresadas deben coincidir")
            return true;
        }

        return false;
    }

    return (
        <div className="mt-5 d-flex flex-row justify-content-center w-100 gap-5">
            <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
                <h3 className='mb-3'>Modificación de contraseña</h3>
                    <div className='mb-3'>
                        <label htmlFor="actualPass" className="form-label">Contraseña actual</label>
                        <div className="input-group mb-3">
                            <input ref={refActualPass} type={passVisibility ? "text" : "password"} placeholder="Ingrese su contraseña actual" className="form-control border border-dark" id="actualPass"/>
                            <button className="btn btn-outline-secondary border-dark" onClick={togglePassVisibility} type="button">{passVisibility ? <FiEye className='mb-1' /> : <FiEyeOff className='mb-1' />}</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Nueva contraseña</label>
                        <div className="input-group mb-3">
                            <input ref={refPass} type={passVisibility ? "text" : "password"} placeholder="Ingrese su nueva contraseña" className="form-control border border-dark" id="pass"/>
                            <button className="btn btn-outline-secondary border-dark" onClick={togglePassVisibility} type="button">{passVisibility ? <FiEye className='mb-1' /> : <FiEyeOff className='mb-1' />}</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rePass" className="form-label">Repita su nueva contraseña</label>
                        <div className="input-group mb-3">
                            <input ref={refRePass} type={passVisibility ? "text" : "password"} placeholder="Vuelva a ingresar su nueva contraseña" className="form-control border border-dark" id="rePass"/>
                            <button className="btn btn-outline-secondary border-dark" onClick={togglePassVisibility} type="button">{passVisibility ? <FiEye className='mb-1' /> : <FiEyeOff className='mb-1' />}</button>
                        </div>
                    </div>
                <button onClick={changePassword} type="button" style={{backgroundColor: '#e7ab12 ', float: 'right'}} className="btn mt-2">Cambiar contraseña</button>
            </form>

            <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
                <h3 className='mb-3'>Datos personales</h3>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input ref={refNombre} type="text" placeholder="Ingrese su nombre" className="form-control border border-dark" id="nombre" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input ref={refApellido} type="text" placeholder="Ingrese su apellido" className="form-control border border-dark" id="apellido" required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input ref={refEmail} type="email" placeholder="Ingrese su correo electrónico" className="form-control border border-dark" id="email" required/>
                </div>
                <div className='d-flex flex-row gap-3'>
                    <div className="mb-3 w-100">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input ref={refTelefono} type="number" min={0} placeholder="Ingrese su número de teléfono" className="form-control border border-dark" id="telefono" required/>
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
                <input type='button' onClick={postDatosPersonales} className="btn mt-2 float-end" style={{background: '#e7ab12'}} value="Modificar datos personales"/>
            </form>

            <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 d-flex flex-column justify-content-center align-self-center">
                <h3 className='mb-3'>Lista de deseados</h3>
                <input type='button' className="mt-2 btn justify-self-center" style={{background: '#e7ab12'}} value="Editar lista de deseados"/>
            </form>
        </div>
    )
}

export default Page