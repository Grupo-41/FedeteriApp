'use client'
import styles from "./page.module.css";
import Image from "next/image";
import Publicacion from "@/components/Publicacion/Publicacion";
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import TruequeInfo from "@/components/TruequeInfo/TruequeInfo";

export default function Home() {
  const [user, setUser, removeUser] = useLocalStorage('user', null);
  const [trueques, setTrueques] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articulosUsuario, setArticulosUsuario] = useState([]);

  useEffect(() => {
    const URL = 'http://localhost:5000/api/Trueques'

    fetch(URL).then(data => data.json()).then(data => {
      setTrueques(data)
    });
  }, [])

  useEffect(() => {
    const URL = 'http://localhost:5000/api/Articulos/tasados'

    fetch(URL).then(data => data.json()).then(data => {
      setArticulos(user ? data.filter(x => x.usuario.id !== user.id) : data)
      
      if(user)
        setArticulosUsuario(data.filter(x => x.usuario.id === user.id));
    });
  }, [])

  return (
    <>
      <div className="mt-5 d-flex flex-column gap-5 align-items-center justify-content-center">
        <div>
          { articulos.length > 0 &&
            <>
              <h2 className="ms-4 ps-2 mb-3">Historial de trueques</h2>
              <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: '29vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                {trueques.map(x => <TruequeInfo trueque={x} />)}
              </div>
            </>
          }
        </div>
        <div>
          { articulos.length > 0 &&
            <>
              <h2 className="ms-4 ps-2 mb-3">Publicaciones</h2>
              <div style={{minWidth: '350px', maxWidth: '55rem', maxHeight: user ? '40vh' : '34vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                {articulos.map(x => <Publicacion key={x.id} item={x} truequeable={user !== null} articulosUsuario={articulosUsuario} />)}
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}
