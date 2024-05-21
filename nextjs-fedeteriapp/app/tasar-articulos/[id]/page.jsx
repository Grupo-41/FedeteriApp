'use client'
import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './page.module.css'

const Page = ({params}) => {
    const id = params.id;
    const [articulo, setArticulo] = useState({});

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Articulos/' + id;

        fetch(URL)
        .then(data => data.json())
        .then(data => setArticulo(data));
    }, []);

    return (
        <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
            <form style={{minWidth: '400px', background: 'white'}} className="d-flex flex-column justify-content-center align-items-center border rounded p-4 align-self-center">
                <h3 className='text-center mb-3'>Tasando artículo: {articulo.descripcion}</h3>
                <div className={'d-flex align-items-center gap-4'}>
                    <div style={{width: '180px'}}>
                        {articulo.imageNames &&
                            <Carousel showIndicators={articulo.imageNames.length > 1} showStatus={false} showThumbs={false} infiniteLoop={true}>
                                {articulo.imageNames.map(image => 
                                    <img src={`http://localhost:5000/api/Images/${image}`} height={'180px'} style={{borderRadius: '15px', objectFit: 'contain'}} alt="" />
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
                        <label className="form-label">Precio</label>
                        <div className="d-flex flex-row gap-3 align-items-end">
                            <div class="input-group mb-3 w-75" id='precio'>
                                <span class="input-group-text border border-dark">$</span>
                                <input type="number" class="form-control border border-dark" placeholder='Ingrese el precio a tasar' />
                            </div>
                            <input type='button' className="btn align-self-start" style={{background: '#e7ab12'}} value="Confirmar tasación"/>
                        </div>
                        </div>
                    </div>
            </form>
        </div>
  )
}

export default Page