import React from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import toast from 'react-hot-toast';

const Publicacion = ({ item: x, removeItem = null, own, url = null }) => {
    function onClickArticle() {
        if (typeof (window) !== 'undefined' && url)
            window.location.href = url
    }

    function onClickEdit(e){
        e.stopPropagation();
    }

    function onClickRemove(e){
        e.stopPropagation();

        const URL = 'http://localhost:5000/api/Articulos/' + x.id;

        fetch(URL, {
            method: 'DELETE'
        })
        .then(() => {
            toast.success('Artículo eliminado con éxito')

            if(removeItem)
                removeItem(x.id);
        })
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
                        <div class="btn-group-vertical position-absolute top-0 end-0 mt-2 me-2">
                            <button onClick={(e) => onClickEdit(e)} type="button" class="btn btn-warning p-1 pt-0 pb-1"><MdEdit size={16} /></button>
                            <button onClick={(e) => onClickRemove(e)} type="button" class="btn btn-danger p-2 pt-0 pb-1"><BsFillTrashFill size={16} /></button>
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
            <small className='card-footer text-center text-truncate'>{own ? x.tasado ? <em>Artículo publicado</em> : <em>Artículo a la espera de ser tasado</em> :
                <>Publicado por <a href={`/profile/${x.usuario.id}`}>{x.usuario.nombre + " " + x.usuario.apellido}</a></>}</small>
        </div>
    )
}

export default Publicacion