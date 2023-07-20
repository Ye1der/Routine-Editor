import {BsFillPersonFill} from 'react-icons/bs'
import { Boton } from './Boton'
import { useState } from 'react'

export function Navegacion(){

    const [boton1, setBoton1] = useState(false)
    const [boton2, setBoton2] = useState(false)
    const [boton3, setBoton3] = useState(false)
    
    return (
        <div className="w-72 h-screen bg-grayGym bg-opacity-50 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full">
            <div className='flex items-center mb-12'>
                <BsFillPersonFill className='m-3 p-2 w-14 h-14 border-2 border-white border-opacity-80 rounded-full text-white text-opacity-80' />
                <h1 className='ml-4 text-white text-2xl text-opacity-90 font-bold' > ¡Hola Yeider! </h1>
            </div>

            <div onClick={()=>{boton1 ? setBoton1(false) : setBoton1(true)}}><Boton> Rutinas </Boton></div>
                {boton1 ? <Boton hijos={boton1}> Rutinas Predefinidas </Boton> : ''}
                {boton1 ? <Boton hijos={boton1}> Crear rutinas </Boton> : ''}
                {boton1 ? <Boton hijos={boton1}> Marcas </Boton> : ''}
                {boton1 ? <Boton hijos={boton1}> Ejercicios </Boton> : ''}

            <div onClick={()=>{boton2 ? setBoton2(false) : setBoton2(true)}}><Boton> Alimentacion </Boton></div>
                {boton2 ? <Boton hijos={boton2}> Calculadora </Boton> : ''}
                {boton2 ? <Boton hijos={boton2}> Recetas </Boton> : ''}
                {boton2 ? <Boton hijos={boton2}> Alimentos </Boton> : ''}

            <Boton> Seguimeinto </Boton>
        </div>
    )
}