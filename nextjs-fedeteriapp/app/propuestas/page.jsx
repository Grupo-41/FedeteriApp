'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import TruequeInfo from '@/components/TruequeInfo/TruequeInfo'

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [propuestas, setPropuestas] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        if (user === null && typeof window !== "undefined")
            window.location.href = "/"
    }, [user])

    useEffect(() => {
        let URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/propuestas'

        fetch(URL).then((data) => data.json())
            .then(data => setPropuestas(data));

        URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/solicitudes'

        fetch(URL).then((data) => data.json())
            .then(data => setSolicitudes(data));
    }, [])

    function removeTrueque(id, arr, setArr) {
        let newPropuestas = arr.filter(x => x.id !== id);
        setArr(newPropuestas);
    }

    return (
        <div className="mt-5 d-flex flex-column align-items-center gap-5 justify-content-center w-100">
            {
                propuestas && propuestas.length > 0 &&
                <div className='mb-3'>
                    <h2 className='text-center'>Tus propuestas pendientes</h2>
                    <div style={{ minWidth: '400px', maxWidth: '58rem' }} className="mt-2 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
                        {propuestas && propuestas.length > 0 &&
                            propuestas.map(x => {
                                return (
                                    <TruequeInfo key={x.id}
                                        trueque={x}
                                        removeTrueque={(id) => removeTrueque(id, propuestas, setPropuestas)}
                                        toValidate={false}
                                        toAccept={true} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                solicitudes && solicitudes.length > 0 &&
                <div>
                    <h2 className='mb-3 text-center'>Tus solicitudes pendientes</h2>
                    <div style={{ minWidth: '400px', maxWidth: '58rem' }} className="mt-2 d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
                        {solicitudes && solicitudes.length > 0 &&
                            solicitudes.map(x => {
                                return (
                                    <TruequeInfo key={x.id}
                                        trueque={x}
                                        removeTrueque={(id) => removeTrueque(id, solicitudes, setSolicitudes)}
                                        toValidate={false}
                                        cancelable={true} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                propuestas.length === 0 && solicitudes.length === 0 &&
                <p>Usted no posee propuestas pendientes</p>
            }
        </div>
    )
}

export default Page