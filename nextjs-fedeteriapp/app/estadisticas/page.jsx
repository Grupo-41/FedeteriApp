'use client'
import React, { useRef, useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { BiSolidFileExport } from "react-icons/bi";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const Page = () => {
    const refSucursal = useRef();
    const refPDF = useRef();
    const [sucursales, setSucursales] = useState([]);
    const [estadisticaVentas, setEstadisticaVentas] = useState([]);
    const [estadisticaSucursales, setEstadisticaSucursales] = useState([]);
    const [estadisticasDestacadas, setEstadisticasDestacadas] = useState([]);
    const [dataTrueques, setDataTrueques] = useState([]);
    const [trueques, setTrueques] = useState([]);
    const [startDate, setStartDate] = useState(dayjs('2024-01-01'));
    const [endDate, setEndDate] = useState(dayjs());


    const getTargetElement = () => refPDF.current;

    const dataVentas = estadisticaVentas.map(x => {
        return {
            name: x.sucursal.nombre + ` (${x.ventas.length})`,
            value: x.ventas.length
        }
    }).sort((a, b) => b.value - a.value);

    const dataMontos = estadisticaVentas.map(x => {
        const monto = x.montoTotal > 1000 ? ` ($${(x.montoTotal / 1000).toFixed(1)}k)` : ` ($${x.montoTotal})`

        return {
            name: x.sucursal.nombre + monto,
            value: x.montoTotal
        }
    }).sort((a, b) => b.value - a.value);

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

    const optionTrueques = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '2%',
            left: '2.5%',
            orient: 'vertical',
        },
        series: [
            {
                name: 'Trueques',
                type: 'pie',
                radius: ['50%', '100%'],
                center: ['85%', '97%'],
                startAngle: 180,
                endAngle: 90,
                label: {
                    show: false,
                    overflow: "show"
                },
                data: [
                    ...dataTrueques
                ]
            }
        ]
    };

    const options = {
        filename: "estadisticas.pdf",
        // default is `save`
        method: 'save',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.MEDIUM,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.MEDIUM,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'landscape',
        },
        canvas: {
            // default is 'image/jpeg' for better size performance
            mimeType: 'image/jpeg',
            qualityRatio: 1
        }
    };

    function updateData() {
        let URL = 'http://localhost:5000/api/Estadisticas/ventas-sucursal/';
        URL += startDate.isSame(endDate) ? '' : '?inicio=' + startDate.format('YYYY-MM-DD') + '&fin=' + endDate.format('YYYY-MM-DD');

        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setEstadisticaVentas(data)
            })

        URL = 'http://localhost:5000/api/Estadisticas/destacados/';
        URL += startDate.isSame(endDate) ? '' : '?inicio=' + startDate.format('YYYY-MM-DD') + '&fin=' + endDate.format('YYYY-MM-DD');

        fetch(URL)
            .then(data => data.json())
            .then(data => setEstadisticasDestacadas(data));
    }

    useEffect(() => {
        let URL = "http://localhost:5000/api/sucursales"

        fetch(URL)
            .then(data => data.json())
            .then(data => setSucursales(data))

        URL = 'http://localhost:5000/api/Calificaciones/sucursales'

        fetch(URL)
            .then(data => data.json())
            .then(data => setEstadisticaSucursales(data));


        URL = 'http://localhost:5000/api/Trueques/realizados'

        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setTrueques(data)
            });

        updateData();
    }, [])

    useEffect(() => {
        updateData();
    }, [startDate, endDate])

    useEffect(() => {
        let newDataTrueques = sucursales.map(x => {
            return {
                name: x.nombre,
                value: 0
            }
        })

        for (let i = 0; i < sucursales.length; i++) {
            newDataTrueques[i].value = trueques.filter(x => x.sucursal.id === sucursales[i].id && dayjs(x.fechaRealizacion).isAfter(startDate) && dayjs(x.fechaRealizacion).isBefore(endDate)).length;
            newDataTrueques[i].name = `${newDataTrueques[i].name} (${newDataTrueques[i].value})`
        }

        newDataTrueques = newDataTrueques.sort((a, b) => b.value - a.value);
        setDataTrueques(newDataTrueques);
    }, [trueques, startDate, endDate])

    return (
        <>
            <div style={{ marginLeft: '250px' }}>
                <div ref={refPDF} className='d-flex flex-column'>
                    <div className='d-flex flex-row gap-3' style={{ marginTop: '125px' }}>
                        <div className='d-flex flex-column gap-3 ps-4 pt-4' style={{ background: 'white', borderRadius: '5px', width: '530px', height: '585px' }}>
                            <h2 className='mb-4'>Ventas</h2>
                            <div className='ms-3'>
                                <ReactECharts style={{ height: '28vh', width: '675px' }} option={optionVentas} />
                                <ReactECharts style={{ height: '28vh', width: '675px', marginTop: '-35px' }} option={optionMontoPorVentas} />
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-center align-items-center gap-3'>
                            <div className='d-flex flex-column gap-3 p-4' style={{ background: 'white', borderRadius: '5px', width: '400px', height: '585px' }}>
                                <h2 className='mb-2'>Trueques concretados</h2>
                                <ReactECharts style={{ height: '60vh', width: '400px' }} option={optionTrueques} />
                            </div>
                            <div className='d-flex flex-column gap-3 justify-content-center h-100'>
                                <div className='d-flex flex-column gap-3 p-4' style={{ background: 'white', borderRadius: '5px', width: '400px' }}>
                                    <h2 className='mb-2'>Ferreterias</h2>
                                    <ul className="list-group">
                                        {estadisticaSucursales.map(x => {
                                            return (
                                                <li key={x.sucursal.id} className="list-group-item d-flex justify-content-between align-items-start">
                                                    {x.sucursal.nombre} - {x.votantes} votos
                                                    <span className="badge rounded-pill" style={{ background: '#a5a' }}>{x.rating.toFixed(1)} ⭐</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className='d-flex flex-column gap-3 p-4' style={{ background: 'white', borderRadius: '5px', width: '400px', height: 'min-content' }}>
                                    <h2 className='mb-2'>Publicaciones destacadas</h2>
                                    <div className="list-group">
                                        <p className='list-group-item' style={{ marginBottom: '0' }}><strong>Cantidad:</strong> {estadisticasDestacadas.count}</p>
                                        <p className='list-group-item' style={{ marginTop: '0' }} > <strong>Monto:</strong> ${estadisticasDestacadas.montoTotal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='align-self-center justify-self-center ms-4 mt-5'>
                        <small className='text-body-secondary' style={{pointerEvents: 'none', userSelect: 'none'}}>Rango de fecha: {startDate.format('DD/MM/YYYY')} - {endDate.format('DD/MM/YYYY')}</small>
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
                                <DatePicker minDate={dayjs('2023-01-01')} maxDate={dayjs()}
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='d-flex flex-column'>
                            <label className='mb-1' htmlFor='date2'>Fecha de fin</label>
                            <LocalizationProvider id="date2" dateAdapter={AdapterDayjs}>
                                <DatePicker minDate={dayjs('2024-01-01')} maxDate={dayjs()}
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => generatePDF(getTargetElement, options)} className='position-absolute bottom-0 end-0 me-3 btn btn-warning shadow' style={{ borderRadius: '32px', marginBottom: '55px' }}>Exportar PDF <BiSolidFileExport size={22} /></button>
        </>
    )
}

export default Page