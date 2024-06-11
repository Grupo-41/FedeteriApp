'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import Publicacion from '@/components/Publicacion/Publicacion';

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
      if(!user)
        return

      const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/articulos';
      
      fetch(URL)
      .then(data => data.json())
      .then(data => setArticulos(data));
    }, [])

    useEffect(() => {
        if(user === null && typeof window !== "undefined")
            window.location.href = "/"
    }, [user])

    function removeItem(itemID){
      const newArray = articulos.filter(x => x.id !== itemID);
      setArticulos(newArray);
    }

  return (
    <div className="mt-5 d-flex flex-column align-items-center justify-content-center w-100">
        <h1 className='mb-4'>Tus publicaciones</h1>
        <div style={{minWidth: '400px', maxWidth: '58rem'}} className="d-flex flex-row justify-content-center flex-wrap gap-4 align-self-center">
            {articulos && articulos.length > 0 ?
                articulos.filter(x => !x.truequeado).map(x => {
                    return (
                        <Publicacion key={x.id} item={x} url={`/publicacion/${x.id}`} removeItem={removeItem} own={true}/>
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