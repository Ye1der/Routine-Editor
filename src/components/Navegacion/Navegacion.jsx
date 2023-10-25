import React, { useContext, useEffect, useState } from 'react'
import { Boton } from './Boton'
import logo from '../../img/logo.webp'
import { CerrarSesion } from './CerrarSesion'
import { useNavigate } from 'react-router'
import { contextGlobal } from '../../Context/Context'
import { motion } from 'framer-motion'
import { FaBars } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export function Navegacion(){

    const navigate = useNavigate()
    const {setPage, renderTrash} = useContext(contextGlobal);

    const url = window.location.href
    
    useEffect(()=>{
        url.includes('rutines') && setPage('rutines')
        url.includes('food') && setPage('food')
        url.includes('records') && setPage('records')
    }, [url])

    const [hide, setHide] = useState(true)
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    
    return (
        <div>
            <div className={`${hide ? '-translate-x-[290px]' : '-translate-x-[0px]'} lg:translate-x-0 w-72 z-50 absolute left-0 h-screen bg-[#101010] overflow-auto scrollbar-none transition-all duration-200`} >
                <div className='relative w-full h-full pt-14 flex flex-col gap-8'>
                    <CerrarSesion/>

                    <button className='absolute top-4 right-3 bg-grayGym p-2 rounded-full text-white lg:scale-0'
                    onClick={()=>{setHide(true)}}>
                        <IoMdClose className='text-2xl'/>
                    </button>

                    <div className=''>
                        <img src={logo} alt="Logo" className='rounded-full'></img>
                    </div>
                    
                    <div>
                        <Boton focus={'rutines'}> Rutinas </Boton>
                        <Boton focus={'food'}> Alimentacion </Boton>
                        <Boton focus={'records'}> Records </Boton>
                    </div>
                </div>
            </div>

            <button className={`${hide ? 'translate-y-0' : '-translate-y-20'} z-20 absolute top-9 ${renderTrash ? 'left-5': 'right-5'} bg-grayGym p-3 rounded-full text-white lg:scale-0 transition-all duration-200`}
            onClick={()=>{setHide(false)}}>
                <FaBars/>
            </button>

        </div>
    )
}