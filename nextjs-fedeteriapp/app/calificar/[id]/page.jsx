'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { Rating, Box } from '@mui/material'
import toast from 'react-hot-toast'

const Page = ({ params }) => {
    const truequeID = params.id;
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [ratingSucursal, setRatingSucursal] = useState(0);
    const [hoverSucursal, setHoverSucursal] = React.useState(-1);
    const [ratingUsuario, setRatingUsuario] = useState(0);
    const [hoverUsuario, setHoverUsuario] = React.useState(-1);
    const [trueque, setTrueque] = useState({});
    const [usuario, setUsuario] = useState({});
    const refDescripcionSucursal = useRef();
    const refDescripcionUsuario = useRef();

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

    function postCalificacionSucursal() {
        const URL = 'http://localhost:5000/api/Calificaciones/calificar-sucursal/'

        if (ratingSucursal === 0) {
            toast.error("Debes especificar un puntaje para la sucursal.")
            return;
        }

        const calificacion = {
            "rating": ratingSucursal,
            "descripcion": refDescripcionSucursal.current.value,
            "truequeID": truequeID,
            "usuarioID": user.id,
            "sucursalCalificadaID": trueque.sucursal.id
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(calificacion)
        }).then(() => toast.success("Calificación enviada correctamente. Gracias!"))
    }

    function postCalificacionUsuario() {
        const URL = 'http://localhost:5000/api/Calificaciones/calificar-usuario/'

        if (ratingUsuario === 0) {
            toast.error("Debes especificar un puntaje para el usuario.")
            return;
        }

        const calificacion = {
            "rating": ratingUsuario,
            "descripcion": refDescripcionUsuario.current.value,
            "truequeID": truequeID,
            "usuarioID": user.id,
            "usuarioCalificadoID": usuario.id
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(calificacion)
        }).then(() => toast.success("Calificación enviada correctamente. Gracias!"))
    }

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Trueques/' + truequeID;

        fetch(URL).then(data => data.json()).then(data => {
            setTrueque(data);

            if (data.articuloSolicitado.usuario.id == user.id)
                setUsuario(data.articuloOfrecido.usuario);
            else
                setUsuario(data.articuloSolicitado.usuario);
        });
    }, [])

    return (
        <div style={{ width: 'fit-content' }} className="mt-5 d-flex gap-5 flex-column flex-nowrap align-items-center justify-content-center">
            {trueque.sucursal &&
                <form style={{ background: 'white', width: '100%', maxHeight: '40vh' }} className="d-flex flex-column justify-content-center align-items-center border rounded gap-3 p-4">
                    <h2>Calificar sucursal - {trueque.sucursal.nombre}</h2>
                    <textarea ref={refDescripcionSucursal} className="form-control" placeholder={`Comenta qué te pareció el trato recibido en nuestra sucursal ${trueque.sucursal.nombre}...`} id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <div className='d-flex flex-row justify-content-between w-100 m-0'>
                        <div className='d-flex flex-row justify-content-between align-items-center m-0' style={{ width: '221px' }}>
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
                            <p className='text-left m-0' style={{ width: '90px' }}>{labels[hoverSucursal !== -1 ? hoverSucursal : ratingSucursal]}</p>
                        </div>
                        <input type='button' onClick={postCalificacionSucursal} className='btn' style={{ background: '#e7ab12' }} value="Enviar calificación" />
                    </div>
                </form>
            }
            {usuario.nombre &&
                <form style={{ background: 'white', width: '100%', maxHeight: '40vh' }} className="d-flex flex-column justify-content-center align-items-center border rounded gap-3 p-4">
                    <h2>Calificar usuario - {usuario.nombre}</h2>
                    <textarea ref={refDescripcionUsuario} className="form-control" placeholder={`Comenta tu opinión acerca del trato recibido por ${usuario.nombre}...`} id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                    <div className='d-flex flex-row justify-content-between w-100 m-0'>
                        <div className='d-flex flex-row justify-content-between align-items-center m-0' style={{ width: '221px' }}>
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
                            <p className='text-left m-0' style={{ width: '90px' }}>{labels[hoverUsuario !== -1 ? hoverUsuario : ratingUsuario]}</p>
                        </div>
                        <input type='button' onClick={postCalificacionUsuario} className='btn' style={{ background: '#e7ab12' }} value="Enviar calificación"/>
                    </div>
                </form>
            }
        </div>
    )
}

export default Page