import React, { useRef } from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { LuArrowBigUpDash } from "react-icons/lu";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';

const Publicacion = ({ item: x, removeItem = null, own, url = null }) => {
    const refDescripcion = useRef();
    const refEstado = useRef();
    const refMarca = useRef();
    const refImg = useRef();
    const refCloseModal = useRef();

    async function updateArticulo(){
        const URL = 'http://localhost:5000/api/Articulos/' + x.id;

        if(await checkInputs())
            return

        const data = new FormData();
        data.append("Descripcion", refDescripcion.current.value);
        data.append("Estado", refEstado.current.value);
        data.append("Marca", refMarca.current.value || 'Ninguna');

        for (var file of refImg.current.files) {
            data.append('Images', file, file.name)
        }

        await fetch(URL, ({
            method: 'PUT',
            body: data
        }))
        .then(() => {
            toast.success('Artículo modificado con éxito.')
            window.location.reload();
        })

        refCloseModal.current.click();
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

    function onClickArticle() {
        if (typeof (window) !== 'undefined' && url)
            window.location.href = url
    }

    function onClickEdit(e) {
        e.stopPropagation();
        refDescripcion.current.value = x.descripcion;
        refEstado.current.value = x.estado;
        refMarca.current.value = x.marca;
    }

    function onClickRemove(e) {
        e.stopPropagation();

        const URL = 'http://localhost:5000/api/Articulos/' + x.id;

        fetch(URL, {
            method: 'DELETE'
        })
            .then(() => {
                toast.success('Artículo eliminado con éxito')

                if (removeItem)
                    removeItem(x.id);
            })
    }

    function onClickUpgrade(e) {
        e.stopPropagation();
    }

    return (
        <div key={x.id} className="card" style={{ width: '16rem' }}>
            <div onClick={url ? onClickArticle : null} style={{ cursor: url ? 'pointer' : 'default' }}>
                <div className='position-relative card-img-top'>
                    <div className='p-1 d-flex justify-content-center'>
                        {url ?
                            <img height={175} style={{ maxWidth: '100%', objectFit: 'contain' }} src={`http://localhost:5000/api/Images/${x.imageNames[0]}`} />
                            :
                            <Carousel showThumbs={false} showIndicators={false} showStatus={false} infiniteLoop={true} width={175}>
                                {x.imageNames.map((image, index) =>
                                    <img key={index} height={175} style={{ objectFit: 'contain' }} src={`http://localhost:5000/api/Images/${image}`} />
                                )}
                            </Carousel>
                        }
                    </div>
                    {
                        own &&
                        <div class="btn-group-vertical rounded position-absolute top-0 end-0 mt-2 me-2">
                            {x.tasado &&
                                <button onClick={(e) => onClickUpgrade(e)} id='btnUpgrade' type="button" class="btn btn-success p-1 pt-0 pb-1"><LuArrowBigUpDash color='white' fill='white' size={18} /></button>
                            }
                            <button onClick={(e) => onClickEdit(e)} data-bs-toggle="modal" data-bs-target={"#articuloModal" + x.id} id='btnEdit' type="button" class="btn btn-warning p-1 pt-0 pb-1"><MdEdit size={16} /></button>
                            <button onClick={(e) => onClickRemove(e)} id='btnRemove' type="button" class="rounded rounded-top-0 btn btn-danger p-1 pt-0 pb-1"><BsFillTrashFill size={16} /></button>
                            <Tooltip anchorSelect='#btnUpgrade' place='right'>Destacar publicación</Tooltip>
                            <Tooltip anchorSelect='#btnEdit' place='right'>Editar</Tooltip>
                            <Tooltip anchorSelect='#btnRemove' place='right'>Eliminar</Tooltip>
                        </div>
                    }
                </div>
                <div className="card-footer d-flex flex-column" >
                    <h5 className="card-title text-truncate pb-1 mb-1">{x.descripcion}</h5>
                    <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{x.estado}</p>
                    <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{x.marca}</p>
                    <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{x.categoria || "Sin definir"}</p>
                </div>
            </div>
            <small className='card-footer text-center text-truncate'>{
                own ?
                    x.tasado ?
                        x.destacado ? <em>Artículo destacado ({x.destacado})</em>
                            : <em>Artículo publicado</em>
                        : <em>Artículo a la espera de ser tasado</em>
                    : <>Publicado por <a href={`/profile/${x.usuario.id}`}>{x.usuario.nombre + " " + x.usuario.apellido}</a></>}
            </small>
            <div className="modal fade" id={"articuloModal" + x.id} tabIndex="-1" aria-labelledby={"articuloModalLabel" + x.id} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title text-center" id={"articuloModalLabel" + x.id}>Editar artículo</h3>
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
                                    { x.tasado && 
                                        <div className='alert alert-danger py-2 mt-4 mb-0 text-center'>Este artículo ya ha sido tasado <br/>Si lo modifica, tendrá que volver a tasarse</div>
                                    }
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input onClick={updateArticulo} type='button' className="btn" style={{ background: '#e7ab12' }} value="Actualizar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Publicacion