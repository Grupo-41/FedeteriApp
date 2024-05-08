'use client'
import { UserContext } from '@/components/ContextProvider/ContextProvider';
import React, {useRef, useEffect, useState, useContext} from 'react'
import { useLocalStorage } from 'react-use';
import toast from 'react-hot-toast';

const Page = () => {
    const refDescripcion = useRef();
    const refEstado = useRef();
    const refMarca = useRef();
    const refPrecioEstimado = useRef();
    const refImg = useRef();
    const [user, setUser, removeUser] = useLocalStorage('user', null)

    async function postArticulo(){
        const URL = 'http://localhost:5000/api/Articulos/' + user.id

        if(await checkInputs())
            return

        const data = new FormData();
        data.append("Descripcion", refDescripcion.current.value);
        data.append("Estado", refEstado.current.value);
        data.append("Marca", refMarca.current.value);
        data.append("PrecioEstimado", refPrecioEstimado.current.value);

        for (var file of refImg.current.files) {
            data.append('Images', file, file.name)
        }

        await fetch(URL, ({
            method: 'POST',
            body: data
        }))
    }

    async function checkInputs(){
        if(!refDescripcion.current.value){
            toast.error('La descripción del artículo no puede estar vacía.')
            return true;
        }
        if(!refEstado.current.value){
            toast.error('Debe especificar el estado de su artículo.')
            return true;
        }
        if(refImg.current.files.length < 1){
            toast.error("Debe incluir como mínimo una foto de su artículo.")
            return true;
        }
        if(refImg.current.files.length > 10){
            toast.error("El artículo no debe incluir más de 10 fotos.")
            return true;
        }

        return false;
    }

  return (
    <div className="mt-5 d-flex justify-content-center w-100">
        <form style={{minWidth: '400px', background: 'white'}} className="border rounded p-4 w-25 align-self-center">
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <input ref={refDescripcion} type="text" placeholder="Ingrese una descripción" className="form-control border border-dark" id="descripcion" required/>
            </div>
            <div className='d-flex flex-row gap-3'>
                <div className="mb-3 w-50">
                    <label htmlFor="estado" className="form-label">Estado:</label>
                    <select id="estado" ref={refEstado} className='form-control form-select border border-dark' required >
                        <option value="">Seleccione un estado</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                        <option value="Reacondicionado">Reacondicionado</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <input ref={refMarca} type="text" placeholder="Ingrese la marca" className="form-control border border-dark" id="marca" required/>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio estimado</label>
                <div id='precio' class="input-group mb-3">
                    <span class="input-group-text border border-dark">$</span>
                    <input ref={refPrecioEstimado} type="text" placeholder="Ingrese el precio estimado" class="form-control border border-dark" />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="img" className="form-label">Imágenes</label>
                <input ref={refImg} type="file" accept="image/png, image/jpeg" multiple className="form-control border border-dark" id="img" required/>
                <div id="imgHelp" className="form-text">
                    Debe adjuntar entre 1 y 10 imágenes de su artículo.
                </div>
            </div>
            <input onClick={postArticulo} type='button' className="btn" style={{background: '#e7ab12'}} value="Publicar artículo"/>
        </form>
    </div>
  )
}

export default Page