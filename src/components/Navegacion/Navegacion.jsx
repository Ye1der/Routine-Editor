import React, { useContext, useEffect } from 'react'
import { Boton } from './Boton'
import logo from '../../img/logo.webp'
import { CerrarSesion } from './CerrarSesion'
import { useNavigate } from 'react-router'
import { contextGlobal } from '../../Context/Context'

export function Navegacion(){

    const navigate = useNavigate()
    const {setPage} = useContext(contextGlobal);

    const url = window.location.href
    
    useEffect(()=>{
        url.includes('rutines') && setPage('rutines')
        url.includes('food') && setPage('food')
        url.includes('records') && setPage('records')
    }, [url])
    
    return (
        <div className="w-72 relative h-screen bg-grayGym bg-opacity-50 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full">
            <CerrarSesion></CerrarSesion>

            <div className='my-10'>
                <img src={logo} alt="Logo" className='rounded-full'></img>
            </div>

            <Boton focus={'rutines'}> Rutinas </Boton>
            <Boton focus={'food'}> Alimentacion </Boton>
            <Boton focus={'records'}> Records </Boton>
        </div>
    )
}