'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use';
import TruequeInfo from '@/components/TruequeInfo/TruequeInfo';

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [trueques, setTrueques] = useState({});

    useEffect(() => {
        if(user === null && typeof window !== "undefined")
        window.location.href = "/"

        const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/trueques-pendientes';
    
        fetch(URL).then(data => data.json()).then(data => {
          setTrueques(data)
        });
    }, []);

    return (
    <div className="mt-5 p-5 d-flex flex-column gap-5 align-items-center justify-content-center">
        <div>
        { trueques.length > 0 ?
            <>
            {
                trueques.filter(x => x.realizado).length > 0 &&
                <div className='mb-5'>
                    <h2 className="ps-2 mb-3 text-center">Trueques realizados</h2>
                    <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: '29vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                        {trueques.filter(x => x.realizado).map(x => <TruequeInfo key={x.id} trueque={x} />)}
                    </div>
                </div>
            }
            {
                trueques.filter(x => x.realizado === null).length > 0 &&
                <div className='mb-5'>
                    <h2 className="ps-2 mb-3 text-center">Trueques pendientes</h2>
                    <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: '29vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                        {trueques.filter(x => x.realizado === null).map(x => <TruequeInfo key={x.id} trueque={x} showSucursalInput={true} />)}
                    </div>
                </div>
            }
            {
                trueques.filter(x => x.realizado === false).length > 0 &&
                <>
                    <h2 className="ps-2 mb-3 text-center">Trueques no realizados</h2>
                    <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: '29vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                        {trueques.filter(x => x.realizado === false).map(x => <TruequeInfo key={x.id} trueque={x} />)}
                    </div>
                </>
            }
            </>
            : 
            <div className='text-center'>
                <h2 className='mb-4'>Historial de trueques</h2>
                <p>Todavía no realizaste ningún trueque</p>
            </div>
        }
        </div>
    </div>
  )
}

export default Page