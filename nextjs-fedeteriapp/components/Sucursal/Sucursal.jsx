import React from 'react'

const Sucursal = ({ sucursal }) => {
  return (
    <div class="card" style={{width: '18rem'}}>
        <div class="card-body">
            <h5 class="card-title">{sucursal.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary"><strong>Dirección:</strong> {sucursal.direccion}</h6>
            <p class="card-text">{sucursal.horariosAtencion}</p>
        </div>
    </div>
  )
}

export default Sucursal