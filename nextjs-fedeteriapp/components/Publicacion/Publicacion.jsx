import React, {useRef, useEffect, useState, useContext} from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import toast from 'react-hot-toast';
import { useLocalStorage } from 'react-use';
import { FiUpload } from "react-icons/fi";

const Publicacion = ({item: x, own, clickable = false, truequeable = false, articulosUsuario}) => {
    const refDescripcion = useRef();
    const refEstado = useRef();
    const refMarca = useRef();
    const refImg = useRef();
    const [user, setUser, removeUser] = useLocalStorage('user', null)

    console.log(articulosUsuario);

    function tasarArticulo(){
        if(typeof(window) !== 'undefined')
            window.location.href = '/tasar-articulos/' + x.id
    }

    async function postArticulo(){
        const URL = 'http://localhost:5000/api/Articulos/' + user.id

        if(await checkInputs())
            return

        const data = new FormData();
        data.append("Descripcion", refDescripcion.current.value);
        data.append("Estado", refEstado.current.value);
        data.append("Marca", refMarca.current.value || 'Ninguna');
        for (var file of refImg.current.files) {
            data.append('Images', file, file.name)
        }
        data.append( "articuloAsociado", x.id);

        await fetch(URL, ({
            method: 'POST',
            body: data
        }))
        .then(() => {
            toast.success('Artículo enviado a la espera de ser tasado por un empleado.')
        })
    }
    async function postTrueque(itemID){
        const URL = 'http://localhost:5000/api/Trueques/'

        const trueque = {
            articuloSolicitadoID: x.id,
            articuloOfrecidoID: itemID,
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trueque)
        }).then(() =>{
            toast.success('Articulo ofrecido con exito')
        })
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
    <div key={x.id} className="card" style={{width: '16rem'}}>
        <div onClick={clickable ? tasarArticulo : null} style={{cursor: clickable ? 'pointer' : 'default'}}>
            <div className='position-relative card-img-top'>
                <div className='d-flex justify-content-center'>
                    { clickable ? 
                        <img height={175} style={{maxWidth: '100%', objectFit: 'contain'}} src={`http://localhost:5000/api/Images/${x.imageNames[0]}`} />
                        :
                        <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true} width={175}>
                        { x.imageNames.map((image, index) => 
                            <img key={index} height={175} style={{objectFit: 'contain'}} src={`http://localhost:5000/api/Images/${image}`} />
                        )}
                        </Carousel>
                    }
                </div>
                {
                    own && 
                    <div class="btn-group-vertical position-absolute top-0 end-0 mt-2 me-2">
                        <button type="button" class="btn btn-warning p-1 pt-0 pb-1"><MdEdit size={16}/></button>
                        <button type="button" class="btn btn-danger p-2 pt-0 pb-1"><BsFillTrashFill size={16}/></button>
                    </div>
                }
            </div>

            {truequeable &&
            <div className="d-flex justify-content-center align-items-center card-footer">
                
                    <div className="btn-group align-self-center dropdown-center">
                        <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{background: '#e7ab12 '}}>
                            Proponer trueque
                        </button>
                        <ul className="dropdown-menu">
                            {articulosUsuario && articulosUsuario.length > 0 ?
                                articulosUsuario.map(item => {
                                    return (
                                        <li key={item.id}><a onClick={()=>postTrueque(item.id)} className="dropdown-item">{item.descripcion}</a></li>
                                    )
                                })
                                :
                                <li className='dropdown-item disabled'><span >No tienes artículos publicados</span></li>
                            }
                            <li><hr className="dropdown-divider"/></li>
                            <li><a type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">Cargar artículo<FiUpload className='ms-2'/></a></li>
                        </ul>
                    </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title text-center" id="exampleModalLabel">Nuevo artículo</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-1">
                                <div className="d-flex justify-content-center w-100">
                                    <form style={{minWidth: '400px', background: 'white'}} className="rounded p-4 align-self-center">
                                        <div className="mb-3">
                                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                                            <input ref={refDescripcion} type="text" placeholder="Ingrese una descripción" className="form-control border border-dark" id="descripcion" required/>
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
                                                <input ref={refMarca} type="text" placeholder="Ingrese la marca" className="form-control border border-dark" id="marca" required/>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="img" className="form-label">Imágenes</label>
                                            <input ref={refImg} type="file" accept="image/png, image/jpeg" multiple className="form-control border border-dark" id="img" required/>
                                            <div id="imgHelp" className="form-text">
                                                Debe adjuntar entre 1 y 10 imágenes de su artículo.
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input onClick={postArticulo} type='button' className="btn" style={{background: '#e7ab12'}} value="Publicar artículo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            <div className="card-footer d-flex flex-column" >
                <h5 className="card-title">{x.descripcion}</h5>
                <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{x.estado}</p>
                <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{x.marca}</p>
                <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{x.categoria || "Sin definir"}</p>

            </div>
            
        </div>
        <small className='card-footer text-center text-truncate'>{own ? x.tasado ? <em>Artículo publicado</em> : <em>Artículo a la espera de ser tasado</em> :
                                        <>Publicado por <a href={`/profile/${x.usuario.id}`}>{x.usuario.nombre + " " + x.usuario.apellido}</a></>}</small>
    </div>
  )
}

export default Publicacion