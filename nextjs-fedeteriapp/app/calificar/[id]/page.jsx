'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { Rating, Box } from '@mui/material'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [ratingSucursal, setRatingSucursal] = useState(0);
    const [hoverSucursal, setHoverSucursal] = React.useState(-1);
    const [ratingUsuario, setRatingUsuario] = useState(0);
    const [hoverUsuario, setHoverUsuario] = React.useState(-1);

    const labels = {
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

    }, [])

    return (
        <div style={{ width: 'fit-content' }} className="mt-5 d-flex gap-5 flex-column flex-nowrap align-items-center justify-content-center">
            <form style={{ background: 'white', width: '100%', maxHeight: '40vh' }} className="d-flex flex-column justify-content-center align-items-center border rounded gap-3 p-4">
                <h2>Calificar sucursal - SUCURSAL.NOMBRE</h2>
                <textarea class="form-control" placeholder={`Comenta qué te pareció el trato recibido en nuestra sucursal sucursal.nombre...`} id="floatingTextarea2" style={{height: '100px'}}></textarea>
                <div className='d-flex flex-row justify-content-between w-100 m-0'>
                    <div className='d-flex flex-row justify-content-between align-items-center w-50 m-0'>
                        <Rating
                            name="simple-controlled"
                            value={ratingSucursal}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setRatingSucursal(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHoverSucursal(newHover);
                            }}
                        />
                        <p className='text-left m-0' style={{width: '90px'}}>{labels[hoverSucursal !== -1 ? hoverSucursal : ratingSucursal]}</p>
                    </div>
                    <button className='btn btn-warning'>Calificar sucursal</button>
                </div>
            </form>
            <form style={{ background: 'white', width: '100%', maxHeight: '40vh' }} className="d-flex flex-column justify-content-center align-items-center border rounded gap-3 p-4">
                <h2>Calificar usuario - USUARIO.NOMBRE</h2>
                <textarea class="form-control" placeholder={`Comenta tu opinión acerca del trato recibido por usuario.nombre...`} id="floatingTextarea2" style={{height: '100px'}}></textarea>
                <div className='d-flex flex-row justify-content-between w-100 m-0'>
                    <div className='d-flex flex-row justify-content-between align-items-center w-50 m-0'>
                        <Rating
                            name="simple-controlled"
                            value={ratingUsuario}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setRatingUsuario(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHoverUsuario(newHover);
                            }}
                        />
                        <p className='text-left m-0' style={{width: '90px'}}>{labels[hoverUsuario !== -1 ? hoverUsuario : ratingUsuario]}</p>
                    </div>
                    <button className='btn btn-warning'>Calificar usuario</button>
                </div>
            </form>
        </div>
    )
}

export default Page