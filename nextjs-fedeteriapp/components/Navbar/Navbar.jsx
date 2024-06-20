'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'react-use'
import Image from 'next/image'
import FedeteriaLogo from '../../public/Fedeteria_Horizontal.png'
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [loading, setLoading] = useState(true);
    const refInput = useRef();

    function closeSession(){
        removeUser();
        window.location.href = '/';
    }

    function inputKeyDown(e){
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            onClickSearch();
        }
    }

    function onClickSearch(){
        if(refInput.current.value && refInput.current.value.length > 0){
            if(typeof(window) !== 'undefined')
                window.location.href = '/buscar/' + refInput.current.value;
        }
    }

    useEffect(() => {
        setLoading(false);

        const liElements = document.querySelectorAll(".navbar-nav li");

        liElements.forEach(x => x)

    }, [])

  return (
    <>
        <nav className="navbar fixed-top navbar-expand-lg shadow border-bottom border-black" style={{background: '#e7ab12 '}}>
            <div className="container-fluid">
                <a className="navbar-brand me-3 ms-2" href="/"><Image src={FedeteriaLogo} height="30" alt="FedeteriApp"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto gap-1 mb-2 mb-lg-0">
                        { !user && !loading && 
                        <>
                            <li key={"registrarme"} className="nav-item">
                                <a className="nav-link" href="/signup">Registrarme</a>
                            </li>
                            <li key={"login"} className="nav-item">
                                <a className="nav-link" href="/login">Iniciar sesión</a>
                            </li>
                        </>
                        }
                        { user &&
                        <>
                            <li key={"profile"} className="nav-item">
                                <a className="nav-link" href="/profile">Mi perfil</a>
                            </li>
                            {
                                !user.esAdmin &&
                                <>
                                    <li key={"publicar"} className="nav-item">
                                        <a className="nav-link" href="/publicar">Publicar artículo</a>
                                    </li>
                                    <li key={"publicaciones"} className="nav-item">
                                        <a className="nav-link" href="/mis-publicaciones">Mis publicaciones</a>
                                    </li>
                                    <li key={"propuestas"} className="nav-item">
                                        <a className="nav-link" href="/propuestas">Mis propuestas</a>
                                    </li>
                                    <li key={"mis-trueques"} className="nav-item">
                                        <a className="nav-link" href="/mis-trueques">Mis trueques</a>
                                    </li>
                                </>
                            }
                            <li key={"sucursales"} className="nav-item">
                                <a className="nav-link" href="/sucursales">Ver sucursales</a>
                            </li>
                        </>
                        }
                        { user && user.esAdmin &&
                        <>
                            <li key={"registrarEmpleado"} className="nav-item">
                                <a className="nav-link" href="/registrar-empleado">Registrar empleado</a>
                            </li>
                        </>
                        }
                        { user && (user.esEmpleado || user.esAdmin) &&
                            <>
                                <li key={"tasarArticulo"} className="nav-item">
                                    <a className="nav-link" href="/tasar-articulos">Tasar artículos</a>
                                </li>
                                <li key={"truequesPendientes"} className="nav-item">
                                    <a className="nav-link" href="/trueques-pendientes">Trueques pendientes</a>
                                </li>
                                <li key={"estadisticas"} className="nav-item">
                                    <a className="nav-link" href="/estadisticas">Ver estadísticas</a>
                                </li>
                            </>
                        }
                    </ul>
                    { user &&
                        <>
                            <form className="d-flex position-relative" style={{width: '300px'}} role="search">
                                <input ref={refInput} onKeyDown={e => inputKeyDown(e)} className="w-100 form-control me-2" type="search" placeholder="Buscar por artículo o marca..." aria-label="Search" />
                                <button type='button' onClick={onClickSearch} style={{marginTop: '5px', marginRight: '18px'}} className='position-absolute end-0'><BiSearch size={20} fill='gray' /></button>
                            </form>
                            <button onClick={closeSession} className="ms-2 btn btn-outline-secondary">Cerrar sesión</button>
                        </>
                    }
                </div>
            </div>
            </nav>
            
    </>
  )
}

export default Navbar