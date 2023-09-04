
import { useContext, useState } from 'react'
// import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import { contextGlobal } from '../../Context/Context'
import { useNavigate } from 'react-router'

export function Boton({children, focus}){

    const navigate = useNavigate()

    const {page, setPage} = useContext(contextGlobal)

    async function handleClick(){
        await setPage(focus)
        navigate(`/main/${focus}`)
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div onClick={handleClick} className={`transition-all duration-300 relative text-white text-center flex items-center justify-center ${page === focus ? 'bg-red-500' : 'hover:bg-grayGym'} w-[85%] mb-3 rounded-2xl cursor-pointer`} >
                <h1 className={` ${page === focus && 'text-black'} transition-all duration-300 text-xl p-2 font-bold `} > {children} </h1>
            </div>
        </div>
    )
}