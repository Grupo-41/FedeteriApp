'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import TruequeInfo from '@/components/TruequeInfo/TruequeInfo'

const Page = () => {
    const [trueques, setTrueques] = useState({});
    
    useEffect(() => {
        const URL = 'http://localhost:5000/api/Trueques'

        fetch(URL)
        .then(data => data.json())
        .then(data => setTrueques(data))
    }, [])

  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1 className='mb-4'>Trueques pendientes</h1>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {trueques && trueques.length > 0 ?
                trueques.map(x => {
                    return (
                        <TruequeInfo key={x.id} 
                        trueque={x} />
                    )
                })
                :
                <p>No hay trueques pendientes</p>
        }
        </div>
    </div>
  )
}

export default Page