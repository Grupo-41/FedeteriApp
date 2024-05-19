'use client'
import React from 'react'

const Page = () => {
  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1 className='mb-4'>Trueques pendientes</h1>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {articulos && articulos.length > 0 ?
                articulos.map(x => {
                    return (
                        <TruequeInfo key={x.id} 
                        user1={x.usuarioSolicitado}
                        user2={x.usuarioSolicitante}
                        articulo1={x.articuloSolicitado}
                        articulo2={x.articuloOfrecido}
                        sucursal={x.sucursal} />
                    )
                })
                :
                <p>Usted no posee publicaciones</p>
        }
        </div>
    </div>
  )
}

export default Page