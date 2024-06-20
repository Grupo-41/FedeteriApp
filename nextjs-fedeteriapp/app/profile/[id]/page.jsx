'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use';
import Image from 'next/image';
import CalificacionEjemplo from '../../../public/Calificacion Ejemplo.webp'
import { Rating } from '@mui/material';

const Page = ({ params }) => {
    const id = params.id;
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [searchedUser, setSearchedUser] = useState(null)
    const [userRating, setUserRating] = useState(4.5);
    const [truequesCount, setTruequesCount] = useState(0);
    const [listaDeseos, setListaDeseos] = useState([]);
    const votantes = 23132;

    const labels = {
        null: 'Sin calificar',
        0: 'Sin calificar',
        1: 'Muy malo',
        2: 'Malo',
        3: 'Regular',
        4: 'Bueno',
        5: 'Excelente',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    useEffect(() => {
        let URL = 'http://localhost:5000/api/Usuarios/' + id;

        fetch(URL)
            .then(data => {
                if (data.status === 200)
                    return data.json()

                return null;
            })
            .then(data => {
                if (data !== null)
                    setSearchedUser(data);
            })

        URL = 'http://localhost:5000/api/Usuarios/' + id + '/trueques-pendientes';

        fetch(URL)
            .then(data => data.json())
            .then(data => setTruequesCount(data.filter(x => x.realizado).length));


        URL = 'http://localhost:5000/api/Usuarios/' + id + '/deseados';

        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setListaDeseos(data)
            });
    }, [])

    return (
        <>
            {
                user !== null ?
                    searchedUser ?
                        <div style={{width: 'fit-content'}} className="mt-5 d-flex flex-nowrap flex-column gap-4 justify-content-center w-100">
                            <form style={{ minWidth: '400px', width: '100%', background: 'white' }} className="d-flex flex-column border rounded p-4 w-25 align-self-center">
                                <h3 className='text-center mt-1 mb-1'>Perfil de {searchedUser.nombre}</h3>
                                <div className='d-flex flex-column text-center gap-1 align-items-center w-100'>
                                    <Rating name="read-only" precision={0.1} value={userRating} getLabelText={getLabelText} readOnly />
                                    <p>{userRating} ({votantes})</p>
                                </div>
                                <div className='d-flex flex-row gap-3'>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" value={searchedUser.nombre} className="form-control border border-dark" id="nombre" disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido</label>
                                        <input type="text" value={searchedUser.apellido} className="form-control border border-dark" id="apellido" disabled />
                                    </div>
                                </div>
                                <div className='d-flex flex-row gap-3'>
                                    <div className="mb-3">
                                        <label for="truequesCount" className="form-label">Trueques realizados</label>
                                        <input type="text" value={truequesCount} className="form-control border border-dark" id="truequesCount" disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label for="pointsCount" className="form-label">Puntos</label>
                                        <input type="text" value={searchedUser.puntos} className="form-control border border-dark" id="pointsCount" disabled />
                                    </div>
                                </div>
                                <a href={`/publicaciones/${searchedUser.id}`} className='btn btn-warning mt-2 mb-2' style={{ background: '#e7ab12' }}>Ver artículos publicados</a>
                                <a href={`/historial-trueques/${searchedUser.id}`} className='btn btn-warning' style={{ background: '#e7ab12' }}>Ver historial de trueques</a>
                            </form>
                            <form style={{ minWidth: '400px', width: '100%', background: 'white' }} className="d-flex flex-column border rounded p-4 w-25 align-self-center">
                                <h3 className='mb-4 text-center'>Lista de deseos</h3>
                                {listaDeseos.length > 0 ?
                                    <ul style={{ maxHeight: '25.7vh' }} className="list-group overflow-y-auto">
                                        {listaDeseos.map((x, index) =>
                                        (<li key={index} className="list-group-item border-secondary d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-0">{x.descripcion}</h6>
                                                <small><strong>Marca:</strong> {x.marca ? x.marca : "Ninguna"}</small>
                                            </div>
                                        </li>)
                                        )}
                                    </ul>
                                    :
                                    <p className='text-center'>{searchedUser.nombre} no tiene artículos en su lista de deseos</p>
                                }

                            </form>
                        </div>
                        : "El usuario solicitado no existe"
                    : "Debe estar autenticado para ver perfiles ajenos"
            }
        </>
    )
}

export default Page