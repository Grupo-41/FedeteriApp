'use client'
import styles from "./page.module.css";
import Image from "next/image";
import Logo from '../public/Fedeteria_Horizontal.png'
import Publicacion from "@/components/Publicacion/Publicacion";
import { useState, useEffect } from "react";

export default function Home() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const URL = 'http://localhost:5000/api/Articulos'

    fetch(URL).then(data => data.json()).then(data => setArticulos(data));
  }, [])

  return (
    <>
      <div className="d-flex flex-column gap-5 align-items-center">
        <div className="mb-5">
          { articulos.length > 0 &&
            <>
              <h2 className="mb-3">Publicaciones</h2>
              <div style={{minWidth: '400px', maxWidth: '58rem', paddingRight: '17px', maxHeight: '35vh', overflow: 'auto'}} className="d-flex flex-row justify-content-center flex-wrap gap-3 align-self-center">
                {articulos.map(x => <Publicacion key={x.id} item={x} />)}
              </div>
            </>
          }
        </div>
        <div style={articulos.length > 0 ? {position:'relative', bottom: '-100px', zoom: 0.75} : {}}>
          <Image width={400} src={Logo} />
          <h3 className="mt-5 text-center">Work in progress...</h3>
        </div>
      </div>
    </>
  );
}
