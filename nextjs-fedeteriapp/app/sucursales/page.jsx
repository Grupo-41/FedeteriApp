'use client'
import React, { useEffect, useState } from 'react'
import Sucursal from '@/components/Sucursal/Sucursal';
import styles from './page.module.css'

const Page = () => {
    const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const URL = "http://localhost:5000/api/sucursales"

    fetch(URL)
    .then(data => data.json())
    .then(data => setSucursales(data))
  }, [])
  
  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <div>
            <h1 className='mb-4'>Nuestras sucursales</h1>
            <div className={styles.sucursalesContainer}>
                {sucursales.map(x => 
                    <Sucursal sucursal={x} key={x.nombre}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default Page
