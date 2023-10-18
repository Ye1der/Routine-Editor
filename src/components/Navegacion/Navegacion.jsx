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
    const {setPage} = useContext(contextGlobal);

    const url = window.location.href
    
    useEffect(()=>{
        url.includes('rutines') && setPage('rutines')
        url.includes('food') && setPage('food')
        url.includes('records') && setPage('records')
    }, [url])

    const [hide, setHide] = useState('290px')
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    
    return (
        <div>
            <motion.div className={` -translate-x-[${hide}] lg:translate-x-0 w-72 z-50 absolute left-0 h-screen bg-[#101010] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full transition-all duration-200`} >
                <div className='relative'>
                    <CerrarSesion/>

                    <div className='my-10'>
                        <img src={logo} alt="Logo" className='rounded-full'></img>
                    </div>

                    <Boton focus={'rutines'}> Rutinas </Boton>
                    <Boton focus={'food'}> Alimentacion </Boton>
                    <Boton focus={'records'}> Records </Boton>
                </div>
            </motion.div>

            {hide === '290px' &&
                <button className='z-20 absolute top-9 right-3 bg-grayGym p-3 rounded-full text-white lg:scale-0'
                onClick={()=>{setHide('0px')}}>
                    <FaBars/>
                </button>
            }

            {hide === '0px' &&
                <button className='z-20 absolute top-9 right-3 bg-grayGym p-2 rounded-full text-white lg:scale-0'
                onClick={()=>{setHide('290px')}}>
                    <IoMdClose className='text-2xl'/>
                </button>
            }
        </div>
    )
}