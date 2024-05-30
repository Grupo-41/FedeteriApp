'use client'
import React,{useRef, useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from 'react-use'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BsFillTrashFill } from "react-icons/bs";
import { emailExists, validateEmail, validatePassword } from '../utils'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [sucursales, setSucursales] = useState([]);
    const [passVisibility, setPassVisibility] = useState(false);
    const [listaDeDeseos, setListaDeDeseos] = useState([]);
    const refNombre = useRef();
    const refApellido = useRef();
    const refTelefono = useRef();
    const refEmail = useRef();
    const refSucursal = useRef();

    const refActualPass = useRef();
    const refPass = useRef();
    const refRePass = useRef();

    const refArticuloDeseado = useRef();
    const refMarcaDeseado = useRef();
    
    useEffect(() => {
        const URL = `http://localhost:5000/api/Usuarios/${user.id}/Deseados`;

        fetch(URL)
        .then(data => data.json())
        .then(data => setListaDeDeseos(data));
    }, [])

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

    function postArticuloDeseado(){
        const URL = `http://localhost:5000/api/Usuarios/${user.id}/Deseados`;
        const objDeseado = {
            "descripcion": refArticuloDeseado.current.value,
            "marca": refMarcaDeseado.current.value
        };

        if(!refArticuloDeseado.current.value){
            toast.error('Debe ingresar un artículo a añadir')
            return;
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objDeseado),
        })
        .then(data => data.json())
        .then(data => {
            if(data){
                setListaDeDeseos([...listaDeDeseos, objDeseado]);
                refArticuloDeseado.current.value = "";
                refMarcaDeseado.current.value = "";
            }
            else
                toast.error('Ese artículo ya se encuentra en su lista de deseados')
        })
    }

    function deleteArticuloDeseado(idArticulo){
        const URL = `http://localhost:5000/api/Usuarios/${user.id}/Deseados/${idArticulo}`;

        fetch(URL, {
            method: 'DELETE'
        })
        .then(() => {
            const newArray = [...listaDeDeseos];
            newArray.splice(idArticulo, 1);
            setListaDeDeseos(newArray);
        })
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
            
            <div className='d-flex flex-column gap-4 align-items-center justify-content-center p-0 m-0 w-25'>
                <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 d-flex flex-column justify-content-center align-self-center">
                    <h3 className='mb-3'>Agregar artículo deseado</h3>
                    <div className='d-flex flex-row gap-3'>
                        <div className="mb-3 w-50">
                            <label htmlFor="articulo" className="form-label">Artículo</label>
                            <input ref={refArticuloDeseado} type="text" placeholder="Ingrese un artículo" className="form-control border border-dark" id="articulo" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="marca" className="form-label">Marca</label>
                            <input ref={refMarcaDeseado} type="text" placeholder="Ingrese la marca" className="form-control border border-dark" id="marca" required/>
                        </div>
                    </div>
                    <input onClick={postArticuloDeseado} type='button' className="mt-2 btn justify-self-center" style={{background: '#e7ab12'}} value="Agregar artículo deseado"/>
                </form>
                {
                    listaDeDeseos.length > 0 &&
                    <form style={{minWidth: '400px', width: '100%', background: 'white'}} className="border rounded p-4 d-flex flex-column justify-content-center align-self-center">
                        <h3 className='mb-3'>Tu lista de deseos</h3>
                        <ul style={{maxHeight: '25.7vh'}} className="list-group pe-2 py-1 overflow-y-auto">
                            { listaDeDeseos.map((x, index) => 
                                (<li key={index} className="list-group-item border-black d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-0">{x.descripcion}</h6>
                                        <small><strong>Marca:</strong> {x.marca ? x.marca : "Ninguna"}</small>
                                    </div>
                                    <span onClick={() => deleteArticuloDeseado(index)} className="badge text-bg-danger py-2" style={{cursor: 'pointer'}}>Eliminar</span>
                                </li>)
                            ) }
                        </ul>
                    </form>
                }
                
            </div>
        </div>
    )
}

export default Page