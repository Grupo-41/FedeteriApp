'use client'
import React, { useRef, useState } from 'react'
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { MdQuestionAnswer } from "react-icons/md";
import { FaArrowTurnUp } from "react-icons/fa6";
import toast from 'react-hot-toast';

const Comentario = ({ item, id, articuloId, responsible = false }) => {
  const refResponse = useRef();
  const [comentario, setComentario] = useState(item);
  const [responsibleState, setResponsibleState] = useState(responsible);

  function postResponse(){
    const URL = 'http://localhost:5000/api/Articulos/' + articuloId + "/responder/" + id;

    if(!refResponse.current.value){
      toast.error("No puedes enviar una respuesta vacía")
      return;
    }

    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(refResponse.current.value)
    }).then(() => {
      item.respuesta = refResponse.current.value;
      setComentario(item);
      setResponsibleState(false);
    })
  }

  function keyDown(e){
    if (e.key === 'Enter' || e.keyCode === 13) {
      postResponse();
    }
  }

  return (
    <div className='w-100'>
      <div>
        <BiSolidMessageSquareDots style={{transform: 'scaleX(-1)'}} fill='#115' className='mb-1 me-2' />
        {comentario.texto}
      </div>
      { comentario.respuesta && 
        <>
          <FaArrowTurnUp size={16} fill='#115' style={{transform: 'rotate(90deg)'}} className='ms-2 mb-1 me-2' />
          <span className='text-body-secondary'>{comentario.respuesta}</span>
        </>
      }
      { !comentario.respuesta && responsibleState && 
        <div className='ms-1 mt-1'>
          <FaArrowTurnUp size={16} fill='#115' style={{transform: 'rotate(90deg)'}} className='mb-1 me-2' />
          <input onKeyDown={e => keyDown(e)} ref={refResponse} placeholder='Respondé a este comentario...' className='ms-1 px-2 py-1 w-75 bg-white text-secondary border rounded'></input>
          <input onClick={postResponse} className='btn py-1 px-2 mb-1 ms-3' style={{ background: '#e7ab12' }} type='button' value="Responder"></input>
        </div>
      }
    </div>
  )
}

export default Comentario