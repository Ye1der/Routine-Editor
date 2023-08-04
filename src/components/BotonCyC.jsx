
import { useContext, useState } from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {TiDeleteOutline} from 'react-icons/ti'
import { contextGlobal } from '../Context/Context';

export function BotonCyC(){

  const {render, clickCancelar, clickCrear, ClickFunc, renderTrash} = useContext(contextGlobal)

  if(render === true && renderTrash === false){
    return (
      <div>
        <button className={` ${ clickCrear ? 'scale-0' : 'scale-100' } w-[180px] h-[50px] mt-8 transition-all ease-in-out duration-300 cursor-pointer text-white hover:text-yellow-500 rounded-3xl flex items-center justify-center bg-grayGym`} 
      onClick={ClickFunc}>
        <h1 className='text-[20px] '> Crear Rutina </h1>
        <BiMessageSquareAdd className='text-[20px] ml-2'/> 
      </button>
      </div>
    )
  }

  if(render === false && renderTrash === false){
    return (
      <div>
        <button className={` ${ clickCancelar ? 'scale-100' : 'scale-0' } w-[140px] h-[50px] mt-8 transition-all ease-in-out duration-300 cursor-pointer text-white hover:text-orangeGym rounded-3xl flex items-center justify-center bg-grayGym`} 
        onClick={ClickFunc}>
           <h1 className='text-[20px] '> Cancelar </h1>
           <TiDeleteOutline className='text-[25px]  ml-1'/>
      </button>
      </div>
    )
  }
}