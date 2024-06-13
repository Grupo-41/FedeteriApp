'use client'
import Publicacion from '@/components/Publicacion/Publicacion'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

const Page = ({ params }) => {
    const [user, setUser, removeUser] = useLocalStorage('user', {});
    const query = params.query;
    const [articulos, setArticulos] = useState([])
    const [filtrosMarca, setFiltrosMarca] = useState([])
    const [filtrosEstado, setFiltrosEstado] = useState([])

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    function articulosFiltrados(){
        let res = [...articulos];

        if(filtrosEstado.length > 0)
            res = res.filter(x => filtrosEstado.includes(x.estado));
        
        if(filtrosMarca.length > 0)
            res = res.filter(x => filtrosMarca.includes(x.marca))

        return res;
    }

    function addFilter(filtro, array, setter){
        const newArray = [...array, filtro];
        setter(newArray);
    }

    function removeFilter(filtro, array, setter){
        setter(array.filter(x => x !== filtro));
    }

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Articulos/publicados'

        fetch(URL)
            .then(data => data.json())
            .then(data => {
                let resFilter = data.filter(x => x.descripcion.toLowerCase().includes(query.toLowerCase()) || x.marca.toLowerCase().includes(query.toLowerCase())).filter(x => x.usuario.id !== user.id);

                setArticulos(resFilter);
            })
    }, [])

    return (
        <div style={{ marginLeft: '200px', marginTop: '100px', marginBottom: '25px' }} className="d-flex flex-column align-items-center justify-content-center w-100">
            <h1>Resultados de la búsqueda: &quot;{query}&quot;</h1>
            <div style={{ minWidth: '400px', maxWidth: '58rem' }} className="mt-4 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
                {articulos && articulos.length > 0 ?
                    articulosFiltrados().length > 0 ?
                    articulosFiltrados().map(x => <Publicacion key={x.id} item={x}
                        own={false} url={`/publicacion/${x.id}`} />)
                    :
                    <p>No se han encontrado artículos que cumplan con su búsqueda</p> :
                    <p>No hay artículos para mostrar</p>
                }
            </div>
            <div className="position-absolute shadow d-flex flex-column justify-content-center start-0 ps-5 gap-5 top-0 bg-white border-end border-secondary-subtle" style={{ minWidth: '260px', paddingTop: '75px', height: '100vh' }}>
                <div>
                    <h3>Marca</h3>
                    {
                        articulos.map(x => x.marca).filter(onlyUnique).sort().map((y, index) => {
                            return (
                                <div key={index} className="form-check">
                                    <input className="form-check-input" onInput={(e) => {
                                        if(e.target.checked){
                                            addFilter(y, filtrosMarca, setFiltrosMarca)
                                        }
                                        else{
                                            removeFilter(y, filtrosMarca, setFiltrosMarca)
                                        }
                                    }} type="checkbox" value={y} id={`checkMarca${index}`} />
                                    <label className="form-check-label" htmlFor={`checkMarca${index}`}>
                                        {y}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <h3>Estado</h3>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onInput={(e) => {
                                        if(e.target.checked){
                                            addFilter("Nuevo", filtrosEstado, setFiltrosEstado)
                                        }
                                        else{
                                            removeFilter("Nuevo", filtrosEstado, setFiltrosEstado)
                                        }}} value="" id="checkStatus1" />
                        <label className="form-check-label" htmlFor="checkStatus1">
                            Nuevo
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onInput={(e) => {
                                        if(e.target.checked){
                                            addFilter("Usado", filtrosEstado, setFiltrosEstado)
                                        }
                                        else{
                                            removeFilter("Usado", filtrosEstado, setFiltrosEstado)
                                        }}} value="" id="checkStatus2" />
                        <label className="form-check-label" htmlFor="checkStatus2">
                            Usado
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onInput={(e) => {
                                        if(e.target.checked){
                                            addFilter("Reacondicionado", filtrosEstado, setFiltrosEstado)
                                        }
                                        else{
                                            removeFilter("Reacondicionado", filtrosEstado, setFiltrosEstado)
                                        }}} value="" id="checkStatus3" />
                        <label className="form-check-label" htmlFor="checkStatus3">
                            Reacondicionado
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page