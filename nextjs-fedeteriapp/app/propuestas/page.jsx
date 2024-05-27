'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import TruequeInfo from '@/components/TruequeInfo/TruequeInfo'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [propuestas, setPropuestas] = useState({});

    useEffect(() => {
        if(user === null && typeof window !== "undefined")
            window.location.href = "/"
    }, [user])

    useEffect(() => {
        const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/propuestas'

        fetch(URL).then((data) => data.json())
        .then(data => setPropuestas(data));
    }, [])

    function removeTrueque(id){
        let newPropuestas = propuestas.filter(x => x.id !== id);
        setPropuestas(newPropuestas);
    }

    return (
        <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
            <h1>Tus propuestas</h1>
            <div style={{minWidth: '400px', maxWidth: '58rem'}} className="mt-4 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
                {propuestas && propuestas.length > 0 ?
                    propuestas.map(x => {
                        return (
                            <TruequeInfo key={x.id} 
                            trueque={x}
                            removeTrueque={(id) => removeTrueque(id)}
                            toValidate={false}
                            toAccept={true}/>
                        )
                    })
                    :
                    <p>Usted no posee propuestas pendientes</p>
            }
            </div>
        </div>
      )
}

export default Page