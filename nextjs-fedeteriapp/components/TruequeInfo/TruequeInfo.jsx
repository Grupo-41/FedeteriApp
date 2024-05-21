'use client'
import React from 'react'
import style from './TruequeInfo.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { TbArrowsExchange2 } from "react-icons/tb";
import { FaBan, FaCheck } from "react-icons/fa";


const TruequeInfo = ({ trueque }) => {
  const user1 = trueque.usuarioSolicitante;
  const user2 = trueque.usuarioSolicitado;
  const articulo1 = trueque.articuloOfrecido;
  const articulo2 = trueque.articuloSolicitado;
  const sucursal = trueque.sucursal;

  return (
    <>
      <div className="card" style={{maxWidth: '800px', width: 'fit-content'}}>
        <div className="d-flex mx-2 flex-row justify-content-center align-items-center">
          <div style={{width: '20.5%'}}>
            <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true}>
              { articulo1.imageNames.map(image => 
                  <img height={'100px'} style={{borderRadius: '10px', objectFit: 'contain'}} src={`http://localhost:5000/api/Images/${image}`} />
              )}
            </Carousel>
          </div>
          <div className='w-50'>
            <div className="card-body">
              <h5 className="card-title">{user1.nombre} {user1.apellido}</h5>
              <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{articulo1.estado}</p>
              <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{articulo1.marca}</p>
              <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{articulo1.categoria || "Indefinida"}</p>
            </div>
          </div>
          <div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <TbArrowsExchange2 className='mb-4' size={42} />
              <div className='d-flex flex-row gap-3 position-absolute bottom-0 mb-3'>
                <button className={style.button}><FaCheck size={20} fill='#1a5' /></button>
                <button className={style.button}><FaBan size={20} fill='#e12' /></button>
              </div>
            </div>
          </div>
          <div className='w-50'>
            <div className="card-body text-end">
              <h5 className="card-title">{user2.nombre} {user2.apellido}</h5>
              <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{articulo2.estado}</p>
              <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{articulo2.marca}</p>
              <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{articulo2.categoria || "Indefinida"}</p>
            </div>
          </div>
          <div style={{width: '20.5%'}}>
            <Carousel showThumbs={false} showStatus={false} showIndicators={false} infiniteLoop={true}>
              { articulo2.imageNames.map(image => 
                  <img height={'100px'} style={{borderRadius: '10px', objectFit: 'contain'}} src={`http://localhost:5000/api/Images/${image}`} />
              )}
            </Carousel>
          </div>
      </div>
</div>
    </>
  )
}

export default TruequeInfo