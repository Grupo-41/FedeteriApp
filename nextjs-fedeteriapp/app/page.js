'use client'
import styles from "./page.module.css";
import Image from "next/image";
import Publicacion from "@/components/Publicacion/Publicacion";
import Logo from '../public/Fedeteria_Horizontal.png'
import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import TruequeInfo from "@/components/TruequeInfo/TruequeInfo";

export default function Home() {
  const [user, setUser, removeUser] = useLocalStorage('user', null);
  const [sucursales, setSucursales, removeSucursales] = useLocalStorage('sucursales', []);
  const [trueques, setTrueques] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosUsuario, setArticulosUsuario] = useState([]);

  useEffect(() => {
    if(sucursales.length > 0)
      return

    const URL = 'http://localhost:5000/api/Sucursales'

    fetch(URL).then(data => data.json()).then(data => setSucursales(data));
  }, [])

  useEffect(() => {
    const URL = 'http://localhost:5000/api/Trueques/realizados'

    fetch(URL).then(data => data.json()).then(data => {
      setTrueques(data)
    });
  }, [])

  useEffect(() => {
    const URL = 'http://localhost:5000/api/Articulos/publicados'

    fetch(URL).then(data => data.json()).then(data => {
      setArticulos(user ? data.filter(x => x.usuario.id !== user.id) : data)
      
      if(user)
        setArticulosUsuario(data.filter(x => x.usuario.id === user.id));
    });
  }, [])

  function removeItem(id){
    const newArray = articulos.filter(x => x.id !== id);
    setArticulos(newArray);
  }

  function removeArticulosUsuario(id){
    const newArray = articulosUsuario.filter(x => x.id !== id);
    setArticulosUsuario(newArray);
  }

  return (
    <>
      <div style={{marginTop: '100px', paddingBottom: '50px'}} className="d-flex flex-column gap-5 align-items-center justify-content-center">
        { trueques.length > 0 &&
          <div>
              <h2 className="text-center mb-3">Historial de trueques</h2>
              <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: '29vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                {trueques.map(x => <TruequeInfo key={x.id} trueque={x} />)}
              </div>          
          </div>
        }
        { articulos.length > 0 &&
          <div>
              <h2 className="text-center mb-3">Publicaciones</h2>
              <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: '35vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                {articulos.map(x => <Publicacion key={x.id} item={x} url={`/publicacion/${x.id}`}/>)}
              </div>
          </div>
        }
        {
          (articulos.length === 0 || trueques.length === 0) &&
          <div className="mt-5">
            <div style={articulos.length === 0 && trueques.length === 0 ? {} : {zoom: 0.75}}>
              <Image width={400} src={Logo} />
              <h3 className="mt-5 text-center">Work in progress...</h3>
            </div>
          </div> 
        }
      </div>
    </>
  );
}
