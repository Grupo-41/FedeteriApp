'use client'
import { UserContext } from '@/components/ContextProvider/ContextProvider';
import React, {useRef, useEffect, useState, useContext} from 'react'

const Page = () => {
    const refDescripcion = useRef();
    const refEstado = useRef();
    const refMarca = useRef();
    const refPrecioEstimado = useRef();

    useEffect(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            setData(storedData);
        }
    }, []);

    function postArticulo(){
        const URL = 'http://localhost:5000/api/Articulos/' + data.json().id

        const articulo = {
            descripcion: refDescripcion.current.value,
            estado: refEstado.current.value,
            marca: refMarca.current.value,
            precioEstimado: refPrecioEstimado.current.value,
        }

        fetch(URL ({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
        })).then(() =>{
            window.location.href = 'publicar';
        })
    }

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
        <form onSubmit={postArticulo} style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <input ref={refDescripcion} type="text" placeholder="Ingrese una descripción" className="form-control border border-dark" id="descripcion" required/>
            </div>
            <div className='d-flex flex-row gap-3'>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <input ref={refEstado} type="text" placeholder="Ingrese el estado"className="form-control border border-dark" id="estado" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input ref={refMarca} type="text" placeholder="Ingrese la marca" className="form-control border border-dark" id="marca" required/>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio estimado</label>
                <input ref={refPrecioEstimado} type="text" placeholder="Ingrese el precio estimado"className="form-control border border-dark" id="precio" required/>
            </div>
            <input type='submit' className="btn btn-primary" value="Publicar artículo"/>
        </form>
    </div>
  )
}

export default Page