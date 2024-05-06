import React from 'react'

const Sucursal = ({ sucursal }) => {
  return (
    <div className="card" style={{width: '18rem'}}>
        <div className="card-body">
            <h5 className="card-title">{sucursal.nombre}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary"><strong>Dirección:</strong> {sucursal.direccion}</h6>
            <p className="card-text">{sucursal.horariosAtencion}</p>
        </div>
    </div>
  )
}

export default Sucursal