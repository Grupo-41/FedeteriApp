'use client'
import React, { useEffect, useRef, useState } from 'react'
import style from './TruequeInfo.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { TbArrowsExchange2 } from "react-icons/tb";
import { FaBan, FaCheck } from "react-icons/fa";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import toast from 'react-hot-toast';
import { useLocalStorage } from 'react-use';


const TruequeInfo = ({ trueque, removeTrueque, articulosFedeteria = [], toValidate = false, toAccept = false, showSucursalInput = false, showSucursal = false }) => {
  const [sucursales, setSucursales, removeSucursales] = useLocalStorage('sucursales', []);
  const [articuloVenta, setArticuloVenta] = useState({ descripcion: 'Artículo a cargar', 
                                                        image: 'Placeholder.png'})
  const refSucursal = useRef();
  const user1 = trueque.articuloOfrecido.usuario;
  const user2 = trueque.articuloSolicitado.usuario;
  const articulo1 = trueque.articuloOfrecido;
  const articulo2 = trueque.articuloSolicitado;
  const sucursal = trueque.sucursal;
  const refCodigoProducto = useRef();

  useEffect(() => {
    if (showSucursalInput && sucursal)
      refSucursal.current.value = sucursal.id;
  }, [])

  function chargeArticle(){
    if(refCodigoProducto.current && refCodigoProducto.current.value && (refCodigoProducto.current.value >= 0 && refCodigoProducto.current.value < articulosFedeteria.length))
      setArticuloVenta(articulosFedeteria[Number(refCodigoProducto.current.value)]);
    else{
      if(refCodigoProducto.current.value >= 0 && refCodigoProducto.current.value < articulosFedeteria.length)
        setArticuloVenta({ descripcion: 'Artículo a cargar', 
                            image: 'Placeholder.png'})
      else
        setArticuloVenta({ descripcion: 'El artículo ingresado no existe', image: 'Placeholder.png'})
        
    }
  }

  function validateTrueque(realizado) {
    let URL = 'http://localhost:5000/api/Trueques/'
    URL += realizado ? 'validar-trueque/' : 'invalidar-trueque/'
    URL += trueque.id
/*
    fetch(URL, {
      method: 'PUT'
    }).then(() => {
      toast.success(realizado ? 'Trueque validado con éxito.' : 'Trueque invalidado con éxito.')
    });*/
  }

  function acceptTrueque(accept) { 
    let URL = 'http://localhost:5000/api/Trueques/'
    URL += accept ? 'aceptar-trueque/' : 'rechazar-trueque/'
    URL += trueque.id

    fetch(URL, {
      method: 'PUT'
    }).then(() => {
      toast.success(accept ? 'Trueque aceptado con éxito.' : 'Trueque rechazado con éxito.')

      if(removeTrueque)
        removeTrueque(trueque.id);
    }); 
  }

  function updateSucursal() {
    if (!refSucursal.current.value)
      return

    const URL = 'http://localhost:5000/api/Trueques/' + trueque.id + '/sucursal/' + refSucursal.current.value;

    fetch(URL, {
      method: 'PUT'
    }).then(() => {
      toast.success('Sucursal establecida con éxito. \n¡Te esperamos!')
    })
  }

  async function postVenta(usuario) {
    const URL = 'http://localhost:5000/api/Ventas/' + refCodigoProducto.current.value

    if (await checkInputs())
      return

    const data = {
      "usuarioID": usuario.id,
      "truequeID": trueque.id
    }

    await fetch(URL, ({
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }))
      .then((data) => {
        if (data.status === 200) {
          toast.success('Venta registrada.')
        }
        else
          toast.error('El código de producto ingresado no existe.')
      })
  }

  async function checkInputs() {
    if (!refCodigoProducto.current.value) {
      toast.error('Es necesario ingresar un código de producto.')
      return true;
    }
    return false;
  }

  return (
    <>
      <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="d-flex mx-3 flex-row justify-content-center align-items-center">
          <div style={{ width: '20.5%' }}>
            <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true}>
              {articulo1.imageNames.map((image, index) =>
                <img key={index} height={'100px'} style={{ borderRadius: '10px', objectFit: 'contain' }} src={`http://localhost:5000/api/Images/${image}`} />
              )}
            </Carousel>
          </div>
          <div className='w-50'>
            <div className="card-body">
              <h5 className="card-title"><a className='text-black text-decoration-none' href={'/profile/' + user1.id}>{user1.nombre} {user1.apellido}</a></h5>
              <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{articulo1.estado}</p>
              <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{articulo1.marca}</p>
              <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{articulo1.categoria || "Indefinida"}</p>
            </div>
          </div>
          <div>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <TbArrowsExchange2 style={(toValidate || toAccept || showSucursalInput || trueque.fechaRealizacion) && (showSucursal ? { marginBottom: '8px' } : { marginBottom: '25px' })} size={42} />
              {
                toValidate &&
                <div className='d-flex flex-row gap-3 position-absolute bottom-0 mb-3'>
                  <button onClick={() => validateTrueque(true)} className={style.button} id="btnValidate" data-bs-toggle="modal" data-bs-target="#ventaModal"><FaCheck size={20} fill='#1a5' /></button>
                  <button onClick={() => validateTrueque(false)} className={style.button} id="btnUnvalidate" data-bs-toggle="modal" data-bs-target="#ventaModal"><FaBan size={20} fill='#e12' /></button>
                  <Tooltip anchorSelect='#btnValidate' place='bottom'>Marcar trueque como realizado</Tooltip>
                  <Tooltip anchorSelect='#btnUnvalidate' place='bottom'>Marcar trueque como no realizado</Tooltip>
                </div>
              }
              {
                toAccept &&
                <div className='d-flex flex-row gap-3 position-absolute bottom-0 mb-3'>
                  <button onClick={() => acceptTrueque(true)} className={style.button} id="btnAccept"><FaCheck size={20} fill='#1a5' /></button>
                  <button onClick={() => acceptTrueque(false)} className={style.button} id="btnReject"><FaBan size={20} fill='#e12' /></button>
                  <Tooltip anchorSelect='#btnAccept' place='bottom'>Aceptar propuesta</Tooltip>
                  <Tooltip anchorSelect='#btnReject' place='bottom'>Rechazar propuesta</Tooltip>
                </div>
              }
              {
                showSucursalInput &&
                <div className='position-absolute bottom-0 mb-3' style={{ zoom: '0.8' }}>
                  <select onInput={updateSucursal} id="sucursal-list" ref={refSucursal} className='py-1 form-control form-select border border-secondary' required >
                    {!sucursal && <option value="">Seleccione una sucursal</option>}
                    {sucursales.map(x =>
                      <option key={x.id} value={x.id}>{x.nombre}</option>
                    )}
                  </select>
                </div>
              }
              {
                showSucursal && trueque && trueque.sucursal &&
                <div className='position-absolute top-0 mt-3' style={{ zoom: '0.8' }}>
                  <em>{trueque.sucursal.nombre}</em>
                </div>
              }
              { trueque && trueque.fechaRealizacion &&
                <div className='position-absolute bottom-0 mb-4' style={{ zoom: '0.8' }}>
                  <span className="card-subtitle text-body-secondary ms-1">{trueque.fechaRealizacion.split("-").reverse().join("/")}</span>
                </div>
              }
            </div>
          </div>
          <div className="modal fade" id="ventaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="ventaModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title text-center" id="ventaModalLabel">Registrar ventas</h3>
                  <button type="button" onClick={{/*() => removeTrueque(trueque.id)*/}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-1">
                  <div className="d-flex justify-content-center w-100">
                    <form style={{ minWidth: '400px', background: 'white' }} className="rounded p-4 align-self-center">
                      <div className="mb-3">
                        <label htmlFor="codigoProducto" className="form-label">Código de producto</label>
                        <input onInput={chargeArticle} list='fedeteriaArticles' type="number" placeholder="Ingrese el código de producto" className="form-control border border-dark" id="codigoProducto" ref={refCodigoProducto} required />
                        <datalist id='fedeteriaArticles'>
                          {
                            articulosFedeteria.map(x => <option key={x.id} value={x.id}>{x.descripcion}</option>)
                          }
                        </datalist>
                      </div>
                      <div className='mt-5 d-flex flex-column align-items-center justify-content-center'>
                        <img className='rounded rounded-4 border border-black p-2' height={175} src={'http://localhost:5000/api/Images/' + articuloVenta.image} alt={articuloVenta.descripcion} />
                        <p className='mt-3'>{articuloVenta.descripcion} {articuloVenta.precio && <span>(${articuloVenta.precio})</span>}</p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <input type='button' onClick={() => postVenta(user1)} className="btn" style={{ background: '#e7ab12' }} value={"Registrar venta a " + user1.nombre} />
                  <input type='button' onClick={() => postVenta(user2)} className="btn" style={{ background: '#e7ab12' }} value={"Registrar venta a " + user2.nombre} />
                </div>
              </div>
            </div>
          </div>
          <div className='w-50'>
            <div className="card-body text-end">
              <h5 className="card-title"><a className='text-black text-decoration-none' href={'/profile/' + user2.id}>{user2.nombre} {user2.apellido}</a></h5>
              <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{articulo2.estado}</p>
              <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{articulo2.marca}</p>
              <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{articulo2.categoria || "Indefinida"}</p>
            </div>
          </div>
          <div style={{ width: '20.5%' }}>
            <Carousel showThumbs={false} showStatus={false} showIndicators={false} infiniteLoop={true}>
              {articulo2.imageNames.map((image, index) =>
                <img key={index} height={'100px'} style={{ borderRadius: '10px', objectFit: 'contain' }} src={`http://localhost:5000/api/Images/${image}`} />
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  )
}

export default TruequeInfo