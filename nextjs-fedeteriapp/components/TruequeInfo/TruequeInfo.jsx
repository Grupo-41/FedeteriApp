import React from 'react'

const TruequeInfo = ({ user1, user2, articulo1, articulo2, sucursal }) => {
  return (
    <div className='text-center'>{sucursal.nombre} <br />
        {user1.nombre} - {user2.nombre} | {articulo1.descripcion} - {articulo2.descripcion}</div>
  )
}

export default TruequeInfo