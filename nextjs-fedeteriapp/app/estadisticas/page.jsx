'use client'
import React, { useRef, useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

const Page = () => {
    const refSucursal = useRef();
    const [sucursales, setSucursales] = useState([]);
    const [estadisticaVentas, setEstadisticaVentas] = useState([]);
    const [ventasPorSucursal, setVentasPorSucursal] = useState([]);

    const dataVentas = estadisticaVentas.map(x => {
        return {
            name: x.sucursal.nombre,
            value: x.ventas.length
        }
    })

    const dataMontos = estadisticaVentas.map(x => {
        return {
            name: x.sucursal.nombre,
            value: x.montoTotal
        }
    })

    const optionVentas = {
        title: {
            text: 'Cantidad de ventas',
            subtext: 'Por sucursal',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Ventas',
                type: 'pie',
                radius: '50%',
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
        series: [
            {
                name: 'Ventas',
                type: 'pie',
                radius: '50%',
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
    }, [])

    return (
        <>
            <ReactECharts style={{ height: '50vh', width: '50vh' }} option={optionVentas} />
            <ReactECharts style={{ height: '50vh', width: '50vh' }} option={optionMontoPorVentas} />
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
                <div>
                    <h3 className='mb-3'>Filtrar por sucursal</h3>
                    <div className="mb-3 w-75">
                        <label htmlFor="sucursal-choice" className="form-label">Sucursal:</label>
                        <select id="sucursal-list" ref={refSucursal} className='form-control form-select' style={{ borderColor: '#C4C4C4' }} required >
                            <option value={-1}>Todas las sucursales</option>
                            {sucursales.map(x =>
                                <option key={x.id} value={x.id}>{x.nombre}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page