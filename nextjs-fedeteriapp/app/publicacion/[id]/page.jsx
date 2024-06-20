'use client'
import React, { useEffect, useRef, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FiUpload } from 'react-icons/fi';
import { useLocalStorage } from 'react-use';
import Comentario from '@/components/Comentario/Comentario';
import toast from 'react-hot-toast';

const Page = ({ params }) => {
  const id = params.id;
  const [user, setUser, removeUser] = useLocalStorage('user', null);
  const [articulo, setArticulo] = useState({});
  const [articulosUsuario, setArticulosUsuario] = useState([]);
  const refComentario = useRef();
  const refCloseModal = useRef();
  const refDescripcion = useRef();
  const refEstado = useRef();
  const refMarca = useRef();
  const refImg = useRef();

  useEffect(() => {
    const URL = 'http://localhost:5000/api/Articulos/publicados'

    fetch(URL).then(data => data.json()).then(data => {
      if (user)
        setArticulosUsuario(data.filter(x => (x.usuario.id === user.id)));
    });
  }, [user])

  useEffect(() => {
    refreshArticulo();
  }, [])

  function refreshArticulo(){
    const URL = 'http://localhost:5000/api/Articulos/' + id;

    fetch(URL)
      .then(data => data.json())
      .then(data => setArticulo(data));
  }

  async function postArticulo() {
    const URL = 'http://localhost:5000/api/Articulos/' + user.id

    if (await checkInputs())
      return

    const data = new FormData();
    data.append("Descripcion", refDescripcion.current.value);
    data.append("Estado", refEstado.current.value);
    data.append("Marca", refMarca.current.value || 'Ninguna');
    for (var file of refImg.current.files) {
      data.append('Images', file, file.name)
    }
    data.append("articuloAsociado", id);

    await fetch(URL, ({
      method: 'POST',
      body: data
    }))
      .then(() => {
        toast.success('Artículo enviado a la espera de ser tasado por un empleado.')
        refCloseModal.current.click();
      })
  }

  async function postTrueque(itemID) {
    const URL = 'http://localhost:5000/api/Trueques/'

    const trueque = {
      articuloSolicitadoID: id,
      articuloOfrecidoID: itemID,
    }

    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trueque)
    }).then((data) => data.json())
      .then(data => {
        if (data) {
          toast.success('Articulo ofrecido con exito')
          removeArticuloUsuario(itemID)
        }
        else
          toast.error('Ya ofreciste este artículo en esta publicación.')
      })
  }

  function removeArticuloUsuario(itemID) {
    const newArray = articulosUsuario.filter(x => x.id !== itemID);
    setArticulosUsuario(newArray);
  }

  function postComentario(){
    if(!refComentario.current || !refComentario.current.value){
      toast.error("El comentario no puede estar vacío")
      return;
    }

    const URL = 'http://localhost:5000/api/Articulos/' + articulo.id + '/comentar';

    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(refComentario.current.value)
    }).then(() => {
      refreshArticulo();
      refComentario.current.value = "";
    })
  }

  async function checkInputs() {
    if (!refDescripcion.current.value) {
      toast.error('La descripción del artículo no puede estar vacía.')
      return true;
    }
    if (!refEstado.current.value) {
      toast.error('Debe especificar el estado de su artículo.')
      return true;
    }
    if (refImg.current.files.length < 1) {
      toast.error("Debe incluir como mínimo una foto de su artículo.")
      return true;
    }
    if (refImg.current.files.length > 10) {
      toast.error("El artículo no debe incluir más de 10 fotos.")
      return true;
    }

    return false;
  }

  if(articulo.truequeado)
    return "Esta publicación ya no está disponible."

  return (
    <div style={{width: 'fit-content'}} className="mt-5 d-flex gap-4 flex-column flex-nowrap align-items-center justify-content-center">
      <form style={{ background: 'white' }} className="d-flex flex-column justify-content-center align-items-center border rounded p-4 align-self-center">
        <h3 className='text-center m-0'>{articulo.descripcion}</h3>
        {articulo.usuario &&
          <small className='mt-1'><em>Publicado por: <a href={'/profile/' + articulo.usuario.id}>{articulo.usuario.nombre} {articulo.usuario.apellido}</a></em></small>
        }
        <div className={'d-flex mt-4 align-items-center gap-4'}>
          <div style={{ width: '180px' }}>
            {articulo.imageNames &&
              <Carousel showIndicators={articulo.imageNames.length > 1} showStatus={false} showThumbs={false} infiniteLoop={true}>
                {articulo.imageNames.map((image, index) =>
                  <img key={index} src={`http://localhost:5000/api/Images/${image}`} height={'180px'} style={{ borderRadius: '15px', objectFit: 'contain' }} alt="" />
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
                <input type="text" value={articulo.marca} disabled className="form-control border border-dark" id="marca" />
              </div>
            </div>
            {
              articulo.tasado &&
              <>
                <label className="form-label">Categoría designada</label>
                <div className="d-flex flex-row gap-3 align-items-end">
                  <div className="input-group mb-3 w-50" id='categoria'>
                    <input disabled value={"Categoría " + articulo.categoria} type="text" className="form-control border border-dark" />
                  </div>
                  <div className="w-50 btn-group align-self-start dropdown-center">
                    <button type="button" disabled={articulo.usuario.id === user.id} className="btn dropdown-toggle d-flex flex-row align-items-center justify-content-between px-3" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: '#e7ab12 ' }}>
                      Proponer trueque
                    </button>
                    <ul className="dropdown-menu">
                      {articulosUsuario && articulosUsuario.filter(x => x.categoria === articulo.categoria).length > 0 ?
                        articulosUsuario.filter(x => x.categoria === articulo.categoria).map(item => {
                          return (
                            <li key={item.id}><a onClick={() => postTrueque(item.id)} className="dropdown-item">{item.descripcion} ({item.categoria})</a></li>
                          )
                        })
                        :
                        <li className='dropdown-item disabled'><span >No tienes artículos publicados</span></li>
                      }
                      <li><hr className="dropdown-divider" /></li>
                      <li><a type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#articuloModal">Cargar artículo<FiUpload className='ms-2' /></a></li>
                    </ul>
                  </div>
                  <div className="modal fade" id="articuloModal" tabIndex="-1" aria-labelledby="articuloModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h3 className="modal-title text-center" id="articuloModalLabel">Nuevo artículo</h3>
                          <button type="button" ref={refCloseModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-1">
                          <div className="d-flex justify-content-center w-100">
                            <form style={{ minWidth: '400px', background: 'white' }} className="rounded p-4 align-self-center">
                              <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripción</label>
                                <input ref={refDescripcion} type="text" placeholder="Ingrese una descripción" className="form-control border border-dark" id="descripcion" required />
                              </div>
                              <div className='d-flex flex-row gap-3'>
                                <div className="mb-3 w-50">
                                  <label htmlFor="estado" className="form-label">Estado</label>
                                  <select id="estado" ref={refEstado} className='form-control form-select border border-dark' required >
                                    <option value="">Seleccione un estado</option>
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Usado">Usado</option>
                                    <option value="Reacondicionado">Reacondicionado</option>
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="marca" className="form-label">Marca</label>
                                  <input ref={refMarca} type="text" placeholder="Ingrese la marca" className="form-control border border-dark" id="marca" required />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="img" className="form-label">Imágenes</label>
                                <input ref={refImg} type="file" accept="image/png, image/jpeg" multiple className="form-control border border-dark" id="img" required />
                                <div id="imgHelp" className="form-text">
                                  Debe adjuntar entre 1 y 10 imágenes de su artículo.
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <input onClick={postArticulo} type='button' className="btn" style={{ background: '#e7ab12' }} value="Publicar artículo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </form>
      <form onSubmit={e => { e.preventDefault(); postComentario(); }} style={{ background: 'white', width: '100%', maxHeight: '40vh' }} className="d-flex flex-column justify-content-center align-items-center border rounded gap-3 p-4">
        <h3 className='text-center m-0'>Comentarios</h3>
        {
          articulo.comentarios && articulo.comentarios.length > 0 ?
          <div style={{maxHeight: '170px'}} className='w-100 px-2 m-0 d-flex flex-column gap-2 overflow-auto'>
            {articulo.comentarios.map((x, index) => <Comentario key={index} id={index} 
                                                                articuloId={articulo.id} item={x}
                                                                responsible={articulo.usuario.id === user.id}/>)}
          </div>
          :
          <small className='text-body-secondary my-3'><em>Esta publicación aún no tiene comentarios. Sé el primero en comentar!</em> </small>
        }
        <div className='w-100 d-flex flex-row gap-2'>
          <input ref={refComentario} className='form-control' placeholder='Comentá o consultá algo sobre esta publicación...' type="text" />
          <input onClick={postComentario} type='button' className="btn" style={{ background: '#e7ab12' }} value="Comentar" />
        </div>
      </form>
    </div>
  )
}

export default Page