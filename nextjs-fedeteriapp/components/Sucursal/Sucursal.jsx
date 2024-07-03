import React, { useState, useEffect } from 'react';

const Sucursal = ({ sucursal }) => {
  const [calificacionesSucursales, setCalificacionesSucursales] = useState([]);
  useEffect(() => {
    let URL = 'http://localhost:5000/api/Calificaciones/sucursales'

    fetch(URL)
      .then(data => data.json())
      .then(data => setCalificacionesSucursales(data));
  }, [])

  return (
    <div className="card" style={{ width: '20rem' }}>
      <div className="card-body">
        <span className="card-title h5 display-inline">{sucursal.nombre} </span>{calificacionesSucursales.filter(x => x.sucursal.nombre === sucursal.nombre).map(x => {
          return (
            <span key={x.sucursal.id} className="badge rounded-pill" style={{ background: '#a5a' }}>{x.rating.toFixed(1)} ⭐ {` ( ${x.votantes} ) `}</span>
          );
        })}
        <h6 className="card-subtitle mb-2 mt-2 text-body-secondary"><strong>Dirección:</strong> {sucursal.direccion}</h6>
        <p className="card-text">{sucursal.horariosAtencion}</p>
      </div>
    </div >
  )
}

export default Sucursal