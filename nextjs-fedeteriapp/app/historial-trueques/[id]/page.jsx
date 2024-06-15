'use client'
import React, { useEffect, useState } from 'react'
import TruequeInfo from '@/components/TruequeInfo/TruequeInfo';

const Page = ({ params }) => {
    const id = params.id;
    const [usuario, setUsuario] = useState({});
    const [trueques, setTrueques] = useState([]);

    useEffect(() => {
        let URL = "http://localhost:5000/api/Usuarios/" + id;
        fetch(URL).then(data => data.json()).then(data => setUsuario(data))

        URL += "/trueques" 
        fetch(URL).then(data => data.json()).then(data => setTrueques(data.filter(x => x.realizado)))
    }, [])

    if(!usuario.nombre)
        return "El usuario solicitado no existe"

    return (
        <div className="mt-5 p-5 d-flex flex-column gap-3 align-items-center justify-content-center">
            <h2>Trueques de {usuario.nombre} {usuario.apellido}</h2>
            { trueques && trueques.length > 0 ? 
                <div style={{ minWidth: '350px', maxWidth: '55rem', maxHeight: '71vh', overflow: 'auto' }} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                    {trueques.map(x => <TruequeInfo key={x.id} trueque={x} />)}
                </div>
                : "Este usuario no ha realizado ningún trueque aún"
            }
        </div>
    )
}

export default Page