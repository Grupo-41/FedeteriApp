import React from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const Publicacion = ({item: x, own, clickable = false}) => {
    function tasarArticulo(){
        if(typeof(window) !== 'undefined')
            window.location.href = '/tasar-articulos/' + x.id
    }

  return (
    <div key={x.id} className="card" style={{width: '18rem'}}>
        <div onClick={clickable ? tasarArticulo : null} style={{cursor: clickable ? 'pointer' : 'default'}}>
            <div className='position-relative card-img-top'>
                <img src={`http://localhost:5000/api/Images/${x.imageNames[0]}`} height={175} style={{objectFit: 'contain'}} alt="" className="w-100 p-2" />
                {
                    own && 
                    <div class="btn-group-vertical position-absolute top-0 end-0 mt-2 me-2">
                        <button type="button" class="btn btn-warning p-1 pt-0 pb-1"><MdEdit size={16}/></button>
                        <button type="button" class="btn btn-danger p-2 pt-0 pb-1"><BsFillTrashFill size={16}/></button>
                    </div>
                }
            </div>
            
            <div className="card-footer" >
                <h5 className="card-title">{x.descripcion}</h5>
                <p className='card-subtitle text-body-secondary'><strong>Estado: </strong>{x.estado}</p>
                <p className='card-subtitle text-body-secondary'><strong>Marca: </strong>{x.marca}</p>
                <p className="card-subtitle text-body-secondary"><strong>Categoría: </strong>{x.categoria || "Aún sin definir"}</p>
            </div>
        </div>
        <div className='card-footer text-truncate'>{own ? x.tasado ? "Artículo publicado" : "Artículo a la espera de ser tasado" :
                                        <>Publicado por <a href={`/profile/${x.usuario.id}`}>{x.usuario.nombre + " " + x.usuario.apellido}</a></>}</div>
    </div>
  )
}

export default Publicacion