'use client'
import React from 'react'
import { useLocalStorage } from 'react-use'
import Image from 'next/image'
import FedeteriaLogo from '../../public/Fedeteria_Horizontal.png'

const Navbar = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);

    function closeSession(){
        removeUser();
        window.location.href = '/';
    }

  return (
    <>
        <nav className="navbar fixed-top navbar-expand-lg shadow border-bottom border-black" style={{background: '#e7ab12 '}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><Image src={FedeteriaLogo} width="233" height="35" alt="FedeteriApp"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { user === null && 
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/signup">Registrarme</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Iniciar sesión</a>
                            </li>
                        </>
                        }
                        { user !== null &&
                            <li className="nav-item">
                                <a className="nav-link" href="/sucursales">Ver sucursales</a>
                            </li>
                        }
                        { user !== null && user.esAdmin &&
                            <li className="nav-item">
                                <a className="nav-link" href="/estadisticas">Ver estadísticas</a>
                            </li>
                        }
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button type="submit" className="btn btn-outline-dark">Buscar</button>
                    </form>
                    { user !== null &&
                        <button onClick={closeSession} className="ms-2 btn btn-primary">Cerrar sesión</button>
                    }
                </div>
            </div>
            </nav>
            
    </>
  )
}

export default Navbar