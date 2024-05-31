'use client'
import Publicacion from '@/components/Publicacion/Publicacion'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

const Page = ({params}) => {
    const [user, setUser, removeUser] = useLocalStorage('user', {});
    const query = params.query;
    const [articulos, setArticulos] = useState([])
    const [articulosUsuario, setArticulosUsuario] = useState([])

    function removeItem(id){
        const newArray = articulos.filter(x => x.id !== id);
        setArticulos(newArray);
    }

    function removeArticulosUsuario(id){
        const newArray = articulosUsuario.filter(x => x.id !== id);
        setArticulosUsuario(newArray);
    }

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Articulos/publicados'

        fetch(URL)
        .then(data => data.json())
        .then(data => {
            let resFilter = data.filter(x => x.descripcion.toLowerCase().includes(query.toLowerCase()) || x.marca.toLowerCase().includes(query.toLowerCase())).filter(x => x.usuario.id !== user.id);
            let usuarioFilter = data.filter(x => x.usuario.id === user.id);

            setArticulos(resFilter);
            setArticulosUsuario(usuarioFilter);
        })
    }, [])

    return (
        <div style={{marginTop: '100px', marginBottom: '25px'}} className="d-flex flex-column align-items-center justify-content-center w-100">
        <h1>Resultados de la búsqueda: &quot;{query}&quot;</h1>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="mt-4 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {articulos && articulos.length > 0 ?
                articulos.map(x => <Publicacion key={x.id} item={x} removeItem={removeItem} 
                    own={false} truequeable={true} 
                    articulosUsuario={articulosUsuario.filter(y => y.categoria === x.categoria)} 
                    removeArticulosUsuario={removeArticulosUsuario} />)
                :
                <p>No hay artículos para mostrar</p>
            }
        </div>
    </div>
    )
}

export default Page