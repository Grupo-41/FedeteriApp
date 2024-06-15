'use client'
import React, { useEffect, useState } from 'react'
import Publicacion from '@/components/Publicacion/Publicacion';

const Page = ({ params }) => {
    const id = params.id;
    const [usuario, setUsuario] = useState({});
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        let URL = "http://localhost:5000/api/Usuarios/" + id;
        fetch(URL).then(data => data.json()).then(data => setUsuario(data))

        URL = "http://localhost:5000/api/Articulos/publicados"
        fetch(URL).then(data => data.json()).then(data => setArticulos(data.filter(x => x.usuario.id == id)))
    }, [])

    return (
        <div className="mt-5 p-5 d-flex flex-column gap-3 align-items-center justify-content-center">
            <h2>Publicaciones de {usuario.nombre} {usuario.apellido}</h2>
            { articulos && articulos.length > 0 ? 
                <div style={{ minWidth: '350px', maxWidth: '55rem', maxHeight: '71vh', overflow: 'auto' }} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                    {articulos.map(x => <Publicacion key={x.id} item={x} url={`/publicacion/${x.id}`} hideOwner={true} />)}
                </div>
                : "Este usuario no posee artículos publicados"
            }
        </div>
    )
}

export default Page