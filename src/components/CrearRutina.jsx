import { useState } from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {IoMdAddCircle} from 'react-icons/io'
import {IoMdRemoveCircle} from 'react-icons/io'
import './css/styles.css'

export function CrearRutina(){

  const [ejercicios, setEejercicios] = useState([1,2,3,4])

  return(
    <div className='bg-grayGym w-[400px] h-[400px] rounded-3xl m-5 relative'> 
      <form action="" className='flex flex-col overflow-auto w-[90%] m-auto'>

        <input className='text-white text-4xl font-bold text-opacity-85 my-3 w-4/5 outline-none bg-transparent ml-4 transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70' 
        type="text" placeholder='Nombre'/>
        
        <textarea className='text-white text-2xl font-bold text-opacity-75 mb-4 w-[90%] h-30 resize-none outline-none bg-transparent ml-4 transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full'
        type="text" placeholder='Descripcion' spellCheck={false}/>
        
        
          <div className=' max-h-[152px] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full'>
            {ejercicios.map((e) => {
              return <div className='flex w-[90%] mx-auto py-1'>
              <input className='text-white text-xl font-bold text-opacity-75 outline-none bg-transparent w-[40%] transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70'
              type="text" placeholder={`Ejercicio ${e}`} spellCheck={false}/>

              <div className='w-[25%] flex ml-3'>
                <label htmlFor={`reps ${e}`}> <h1 className='font-bold text-white text-opacity-30 text-xl' >Reps:</h1> </label>
                <input className='my-reps text-white font-bold text-opacity-80 mt-1 transition-all duration-200 w-[40px] bg-transparent outline-none text-center ml-2 caret-transparent border-b-2 border-transparent hover:border-white focus:border-white' 
                id={`reps ${e}`} placeholder='-' type="number" min={0}/>
              </div>

              <div className='w-[25%] flex ml-6'>
                <label htmlFor={`kg ${e}`}> <h1 className='font-bold text-white text-opacity-30 text-xl' >Kg:</h1> </label>
                <input className='my-kg text-white font-bold text-opacity-80 mt-1 transition-all duration-200 w-[40px] bg-transparent outline-none text-center ml-2 caret-transparent  border-b-2 border-transparent hover:border-white focus:border-white' 
                id={`kg ${e}`} placeholder='-' type="number" min={0}/>
              </div>
              </div>
            })}
          </div>

          
          <div className='flex'>
            <IoMdAddCircle className='text-green-400 text-opacity-70 text-2xl hover:text-opacity-95 transition-all duration-200 cursor-pointer mt-2 ml-4'
            onClick={()=>{setEejercicios([...ejercicios, ejercicios.length + 1])}}/> 

            <IoMdRemoveCircle className='text-red-400 mt-2 ml-1 text-opacity-70 text-2xl hover:text-opacity-95 transition-all duration-200 cursor-pointer'
            onClick={()=>{if(ejercicios.length != 1){setEejercicios(ejercicios.filter(e => (e != ejercicios.length)))}}}/>
          </div>
          
          <button className='select-none'> <h1 className='flex items-center justify-center absolute right-3 bottom-3 font-bold text-white px-3 py-1 text-xl rounded-3xl text-opacity-80 hover:text-orangeGym transition-all duration-200'> Crear <BiMessageSquareAdd className='ml-1'/> </h1></button>
      </form>
    </div>
  )
}