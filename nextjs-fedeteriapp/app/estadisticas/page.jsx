'use client'
import React, { useRef, useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { BiSolidFileExport } from "react-icons/bi";


const Page = () => {
    const refSucursal = useRef();
    const [sucursales, setSucursales] = useState([]);
    const [estadisticaVentas, setEstadisticaVentas] = useState([]);
    const [estadisticaSucursales, setEstadisticaSucursales] = useState([]);

    const dataVentas = estadisticaVentas.map(x => {
        return {
            name: x.sucursal.nombre + ` (${x.ventas.length})`,
            value: x.ventas.length
        }
    })


    const dataMontos = estadisticaVentas.map(x => {
        const monto = x.montoTotal > 1000 ? ` ($${(x.montoTotal / 1000).toFixed(1)}k)`: ` ($${x.montoTotal})`

        return {
            name: x.sucursal.nombre + monto,
            value: x.montoTotal
        }
    })

    const optionVentas = {
        title: {
            text: 'Cantidad de ventas',
            subtext: 'Por sucursal',
            left: 'center'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Ventas',
                type: 'pie',
                radius: '50%',
                label: {
                    show: false,
                    overflow: "show"
                },
                data: [
                    ...dataVentas
                ]
            }
        ]
    };

    const optionMontoPorVentas = {
        title: {
            text: 'Monto total de ventas',
            subtext: 'Por sucursal',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Ventas',
                type: 'pie',
                radius: '50%',
                label: {
                    show: false,
                    overflow: "show"
                },
                data: [
                    ...dataMontos
                ]
            }
        ]
    };

    useEffect(() => {
        let URL = "http://localhost:5000/api/sucursales"

        fetch(URL)
            .then(data => data.json())
            .then(data => setSucursales(data))

        URL = 'http://localhost:5000/api/Estadisticas/ventas-sucursal/'

        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setEstadisticaVentas(data)
            })

        URL = 'http://localhost:5000/api/Calificaciones/sucursales'

        fetch(URL)
            .then(data => data.json())
            .then(data => setEstadisticaSucursales(data));
    }, [])

    return (
        <>
            <div className='d-flex flex-row gap-4' style={{ marginTop: '75px' }}>
                <div className='d-flex flex-column gap-3 ps-4 pt-4' style={{ background: 'white', borderRadius: '5px', width: '530px', height: '74vh' }}>
                    <h2 className='mb-3'>Ventas</h2>
                    <div className='ms-3'>
                        <ReactECharts style={{ height: '35vh', width: '675px' }} option={optionVentas} />
                        <ReactECharts style={{ height: '35vh', width: '675px', marginTop: '-35px' }} option={optionMontoPorVentas} />
                    </div>
                </div>
                <div>
                    <div className='d-flex flex-column gap-3 p-4' style={{ background: 'white', borderRadius: '5px', width: '400px' }}>
                        <h2 className='mb-2'>Calificación de ferreterías</h2>
                        <ul className="list-group">
                            {estadisticaSucursales.map(x => {
                                return (
                                    <li className="list-group-item d-flex justify-content-between align-items-start">
                                        {x.sucursal.nombre} - {x.votantes} votos
                                        <span className="badge rounded-pill" style={{background: '#509'}}>{x.rating} ⭐</span>
                                    </li>
                                );
                            })}

                        </ul>
                    </div>
                </div>

            </div>
            <div className="position-absolute shadow d-flex flex-column justify-content-center start-0 gap-5 ps-5 top-0 bg-white border-end border-secondary-subtle" style={{ minWidth: '330px', paddingTop: '75px', height: '100vh' }}>
                <div>
                    <h3 className='mb-3'>Filtrar por fecha</h3>
                    <div className='d-flex flex-column gap-3 w-75'>
                        <div className='d-flex flex-column'>
                            <label className='mb-1' htmlFor='date1'>Fecha de inicio</label>
                            <LocalizationProvider id="date1" dateAdapter={AdapterDayjs}>
                                <DatePicker minDate={dayjs('2024-01-01')} maxDate={dayjs()} defaultValue={dayjs('2024-01-01')} />
                            </LocalizationProvider>
                        </div>
                        <div className='d-flex flex-column'>
                            <label className='mb-1' htmlFor='date2'>Fecha de fin</label>
                            <LocalizationProvider id="date2" dateAdapter={AdapterDayjs}>
                                <DatePicker minDate={dayjs('2024-01-01')} maxDate={dayjs()} defaultValue={dayjs()} />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
            <button className='position-absolute bottom-0 end-0 me-3 btn btn-warning shadow' style={{borderRadius: '32px', marginBottom: '55px'}}>Exportar PDF <BiSolidFileExport size={22}/></button>
        </>
    )
}

export default Page