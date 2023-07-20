
import { useState } from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {TiDeleteOutline} from 'react-icons/ti'

export function BotonCyC(){

  const [clickCrear, setClickCrear] = useState(false);
  const [clickCancelar, setClickCancelar] = useState(false)
  const [render, setRender] = useState(true);

  function ClickFunc(){
    if(render){
      setClickCrear(true)

      setTimeout(()=>{
        setRender(false)
        setClickCancelar(true)
      }, 300)

    } else {
      setClickCancelar(false)

      setTimeout(()=>{
        setRender(true)
        setClickCrear(false)
      }, 300)
    }
  }

  return (
    <div>
      {render ? 

      <button className={` ${ clickCrear ? 'scale-0' : 'scale-100' } w-[180px] h-[50px] mt-8 transition-all ease-in-out dutarion-300 cursor-pointer text-white hover:text-blueGym rounded-3xl flex items-center justify-center bg-grayGym`} 
      onClick={ClickFunc}>
         <h1 className='text-[20px] '> Crear Rutina </h1>
         <BiMessageSquareAdd className='text-[25px]  ml-2'/> 
      </button>
      : 
      <button className={` ${ clickCancelar ? 'scale-100' : 'scale-0' } w-[140px] h-[50px] mt-8 transition-all ease-in-out dutarion-300 cursor-pointer text-white hover:text-orangeGym rounded-3xl flex items-center justify-center bg-grayGym`} 
      onClick={ClickFunc}>
         <h1 className='text-[20px] '> Cancelar </h1>
         <TiDeleteOutline className='text-[28px]  ml-1'/> 
      </button>
      }
    </div>
  )
}