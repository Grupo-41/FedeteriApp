'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { TbArrowsExchange2 } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";


const TruequeInfo = ({ trueque }) => {
  const user1 = trueque.usuarioSolicitante;
  const user2 = trueque.usuarioSolicitado;
  const articulo1 = trueque.articuloOfrecido;
  const articulo2 = trueque.articuloSolicitado;
  const sucursal = trueque.sucursal;

  return (
    <>
      <div className="card mb-3" style={{maxWidth: '800px', width: 'fit-content'}}>
        <div className="d-flex mx-3 flex-row justify-content-center align-items-center">
          <div>
            <Carousel showThumbs={false} showStatus={false}>
              <img src={`http://localhost:5000/api/Images/${articulo1.imageNames[0]}`} />
            </Carousel>
          </div>
          <div className='w-75'>
            <div className="card-body">
              <h5 className="card-title">{user1.nombre} {user1.apellido}</h5>
              <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{articulo1.estado}</p>
              <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{articulo1.marca}</p>
              <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{articulo1.categoria || "Indefinida"}</p>
            </div>
          </div>
          <div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <TbArrowsExchange2 className='mb-4' size={36} />
              <div className='d-flex flex-row gap-3 position-absolute bottom-0 mb-3'>
                <FaCheck size={24} />
                <TiCancel size={24} />
              </div>
            </div>
          </div>
          <div className='w-75'>
            <div className="card-body text-end">
              <h5 className="card-title">{user2.nombre} {user2.apellido}</h5>
              <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{articulo2.estado}</p>
              <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{articulo2.marca}</p>
              <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{articulo2.categoria || "Indefinida"}</p>
            </div>
          </div>
          <div>
            <Carousel showThumbs={false} showStatus={false}>
              <img src={`http://localhost:5000/api/Images/${articulo1.imageNames[0]}`} />
            </Carousel>
          </div>
      </div>
</div>
    </>
  )
}

export default TruequeInfo