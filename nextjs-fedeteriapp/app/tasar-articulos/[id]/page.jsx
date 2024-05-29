'use client'
import React, { useEffect, useRef, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import toast from 'react-hot-toast';

const Page = ({params}) => {
    const id = params.id;
    const [articulo, setArticulo] = useState({});
    const refPrecioEstimado = useRef();

    function clickTasarArticulo(){
        const URL = `http://localhost:5000/api/Articulos/tasar/${articulo.id}`;

        if(!refPrecioEstimado.current.value){
            toast.error('Debe ingresar un precio estimado para tasar el artículo.')
            return;
        }

        fetch(URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: refPrecioEstimado.current.value
        }).then(() => {
            refreshArticulo();
            toast.success('Artículo tasado correctamente.')
            setTimeout(() => {
                window.location.href = '/tasar-articulos'
            }, 1250)
        })
    }

    useEffect(() => {
        refreshArticulo();
    }, []);

    function refreshArticulo(){
        const URL = 'http://localhost:5000/api/Articulos/' + id;
        
        fetch(URL)
        .then(data => data.json())
        .then(data => setArticulo(data));
    }

    return (
        <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
            <form style={{minWidth: '400px', background: 'white'}} className="d-flex flex-column justify-content-center align-items-center border rounded p-4 align-self-center">
                <h3 className='text-center m-0'>Tasando artículo: {articulo.descripcion}</h3>
                { articulo.usuario &&
                    <small className='mt-1'><em>Publicado por: <a href={'/profile/' + articulo.usuario.id}>{articulo.usuario.nombre} {articulo.usuario.apellido}</a></em></small>
                }
                <div className={'d-flex mt-4 align-items-center gap-4'}>
                    <div style={{width: '180px'}}>
                        {articulo.imageNames &&
                            <Carousel showIndicators={articulo.imageNames.length > 1} showStatus={false} showThumbs={false} infiniteLoop={true}>
                                {articulo.imageNames.map((image, index) => 
                                    <img key={index} src={`http://localhost:5000/api/Images/${image}`} height={'180px'} style={{borderRadius: '15px', objectFit: 'contain'}} alt="" />
                                )}
                            </Carousel>
                        }
                    </div>
                    <div>
                        <div className='d-flex flex-row gap-3'>
                            <div className="mb-3 w-50">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <select id="estado" value={articulo.estado} disabled className='form-control form-select border border-dark' >
                                    <option value="">Seleccione un estado</option>
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Usado">Usado</option>
                                    <option value="Reacondicionado">Reacondicionado</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="marca" className="form-label">Marca</label>
                                <input type="text" value={articulo.marca} disabled className="form-control border border-dark" id="marca"/>
                            </div>
                        </div>
                        {
                            articulo.tasado ?
                            <>
                                <label className="form-label">Categoría designada</label>
                                <div className="d-flex flex-row gap-3 align-items-end">
                                    <div class="input-group mb-3 w-75" id='categoria'>
                                        <input disabled value={"Categoría " + articulo.categoria} type="text" class="form-control border border-dark" />
                                    </div>
                                    <input onClick={clickTasarArticulo} disabled type='button' className="btn align-self-start" style={{background: '#e7ab12'}} value="Confirmar tasación"/>
                                </div>
                            </>
                            :
                            <>
                                <label className="form-label">Precio</label>
                                <div className="d-flex flex-row gap-3 align-items-end">
                                    <div class="input-group mb-3 w-75" id='precio'>
                                        <span class="input-group-text border border-dark">$</span>
                                        <input ref={refPrecioEstimado} type="number" class="form-control border border-dark" placeholder='Ingrese el precio a tasar' />
                                    </div>
                                    <input onClick={clickTasarArticulo} type='button' className="btn align-self-start" style={{background: '#e7ab12'}} value="Confirmar tasación"/>
                                </div>
                            </>
                        }
                        </div>
                    </div>
            </form>
        </div>
  )
}

export default Page