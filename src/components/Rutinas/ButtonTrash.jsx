import { useContext } from 'react'
import {FiTrash2} from 'react-icons/fi'
import {TiDeleteOutline} from 'react-icons/ti'
import { contextGlobal } from '../../Context/Context'

export function ButtonTrash(){

  const {renderTrash, setRenderTrash, setClickCrear, clickTrash} = useContext(contextGlobal)

  function ClickPapelera(){
    if(!renderTrash){
      setClickCrear(true)

      setTimeout(()=>{
        setRenderTrash(true)
      }, 100)

    } else {
      setRenderTrash(false)

      setTimeout(()=>{
        setClickCrear(false)
      }, 50)
    }
  }

  return(
      <div onClick={ClickPapelera} className={` ${clickTrash ? 'translate-y-96 opacity-0 scale-0' : ' translate-y-0 opacity-100' } ${renderTrash ? 'left-[50%] -translate-x-[50%]' : 'left-10'} absolute mt-8 transition-all duration-300`}>
        {renderTrash ? 

          <button className='text-white bg-grayGym px-5 h-[50px] flex justify-center items-center rounded-full hover:text-yellow-500 transition-all duration-300'>
            <h1 className='text-[20px]'>Papelera</h1>
            <TiDeleteOutline className='text-2xl ml-2'/>
          </button>
          :
          <button className='text-white bg-grayGym h-[50px] w-[50px] flex justify-center items-center rounded-full text-[0px] hover:text-yellow-500 hover:text-[20px] hover:gap-2 hover:w-[140px] transition-all duration-150'>
            <h1> Papelera </h1>
            <FiTrash2 className='text-xl'/>
          </button>
        }
      </div>
  )
}