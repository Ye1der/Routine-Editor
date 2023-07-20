
import { useState } from 'react'
// import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

export function Boton({children, hijos}){

    const [validador, setValidador] = useState(false)

    const handleClick = ()=>{
        validador ? setValidador(false) : setValidador(true); 
    }

    if(hijos){
        return(
            <div onClick={handleClick} className={`transition-all duration-200 relative flex items-center ${validador ? 'bg-grayGym' : 'hover:bg-grayGym'} w-11/12 mb-3 rounded-r-2xl cursor-pointer`} >
            <button className="text-white text-lg text-opacity-80 ml-10 p-2 font-bold " > {children} </button>
            </div>
        )
    }

    return (
        <div onClick={handleClick} className={`transition-all duration-200 relative flex items-center ${validador ? 'bg-orangeGym bg-opacity-80' : 'hover:bg-grayGym'} w-11/12 mb-3 rounded-r-2xl cursor-pointer`} >
            <button className="text-white text-xl text-opacity-80 ml-5 p-2 font-bold " > {children} </button>
            <MdOutlineKeyboardArrowRight className={`${validador ? 'rotate-90' : ''} transition-all duration-200 absolute right-2 text-2xl text-white text-opacity-80`}/> 
        </div>
    )
}