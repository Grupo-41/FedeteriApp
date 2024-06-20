'use client'
import React, { useEffect, useRef, useState } from 'react'
import { RiExchangeDollarFill } from "react-icons/ri";
import { useLocalStorage } from 'react-use';
import styles from './page.module.css'
import toast from 'react-hot-toast';

const Page = () => {
    const [user, setUser, removeUser] = useLocalStorage('user', null);
    const [puntos, setPuntos] = useState(0);
    const [value, setValue] = useState(null);
    const [cupones, setCupones] = useState([])
    const refPuntos = useRef();

    useEffect(() => {
        refreshPoints();
    }, [])

    function refreshPoints(){
        const URL = 'http://localhost:5000/api/Usuarios/' + user.id + '/puntos';
        fetch(URL).then(data => data.json()).then(data => setPuntos(data));
    }

    function inputPuntos(e){
        if(e.target.value.length > 5){
            e.target.value = e.target.value.substring(0, 5)
        }

        let num = Number(e.target.value);
        updateMoney(num);
    }

    function canjearPuntos(){
        if(!refPuntos.current.value)
            return;
        if(refPuntos.current.value < 100){
            toast.error("No se pueden canjear menos de 100 puntos")
            return;
        }
        if(refPuntos.current.value > puntos){
            toast.error("No tienes suficientes puntos")
            return;
        }

        const URL = `http://localhost:5000/api/Usuarios/${user.id}/canjear-puntos/${refPuntos.current.value}`

        const myPromise = fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        myPromise.then(() => refreshPoints())

        toast.promise(myPromise, {
            loading: 'Canjeando cupón...',
            success: 'Canjeaste tus puntos exitosamente. Revisa tu email!',
            error: 'Hubo un error al canjear tus puntos, vuelva a intentarlo más tarde.'
        })
    }

    function clickMaxButton(){
        refPuntos.current.value = puntos;
        updateMoney(puntos);
    }

    function updateMoney(num){
        if(num && num >= 100)
            setValue(Math.round(num / 2));
        else
            setValue(null);
    }

    return (
        <div className="mt-5 d-flex flex-column gap-5 justify-content-center w-100">
            <form style={{ minWidth: '475px', background: 'white' }} className="border rounded p-4 w-25 align-self-center">
                <h2 className='text-center mb-2'>Canjear puntos</h2>
                <p>Canjeá tus puntos por dinero para comprar productos en nuestras sucursales!</p>
                <div className='d-flex flex-row gap-2'>
                    <div className="w-50 mb-3">
                        <label htmlFor="puntos" className="form-label">Puntos a canjear</label>
                        <div className='position-relative'>
                            <input type="number" onInput={(e) => inputPuntos(e)} ref={refPuntos} className="form-control border border-dark" id="puntos" placeholder='Min. 100 puntos' />
                            <span onClick={clickMaxButton} className={`position-absolute end-0 top-0 ${styles.btnMax}`}>MAX</span>
                        </div>
                    </div>
                    <RiExchangeDollarFill size={32} color='#333' className='align-self-center mt-3 mx-1' />
                    <div className="w-50 mb-3 d-flex flex-column">
                        <label htmlFor="dinero" className="form-label">Dinero equivalente</label>
                        <div className='input-group'>
                            <span className="input-group-text border-dark">$</span>
                            <input type="number" className="form-control border border-dark" id="dinero" value={value ? value : ""} placeholder='100 puntos = $50' disabled />
                        </div>
                    </div>
                </div>
                <div className='w-100 mt-2 d-flex flex-column justify-content-center'>
                    <input onClick={canjearPuntos} type='button' className="btn px-3 w-100" style={{ background: '#e7ab12' }} value="Canjear puntos" />
                    <div id="emailHelp" className="form-text mt-2">Se te enviará al mail un código que podrás canjear en cualquiera de nuestras sucursales.</div>
                </div>
            </form>
            {
                cupones.length > 0 &&
                <form style={{ minWidth: '475px', background: 'white' }} className="border rounded p-4 w-25 align-self-center">
                    <h2 className='text-center'>Mis cupones</h2>
                </form>
            }
        </div>
    )
}

export default Page