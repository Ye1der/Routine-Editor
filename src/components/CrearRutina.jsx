import { useContext, useEffect, useRef, useState } from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {IoMdAddCircle} from 'react-icons/io'
import {IoMdRemoveCircle} from 'react-icons/io'
import {useForm} from 'react-hook-form'
import './css/styles.css'
import { contextGlobal } from '../Context/Context'
import { updateUser } from '../firebase/firebase'
import {motion} from 'framer-motion'

export function CrearRutina(){

  const [ejercicios, setEejercicios] = useState([1,2,3,4]) //Ejercicios que contiene el formulario
  const formularioRef = useRef(null) //Referencia el div que contiene los ejercicios
  const {usuario, ClickFunc} = useContext(contextGlobal)
  const {register, formState: {errors},handleSubmit} = useForm() //Hook useForm para retornar un objeto con los valores del formulario

  useEffect(()=>{
    const formularioDiv = formularioRef.current // Crea una constante con el div
    formularioDiv.scrollTop = formularioDiv.scrollHeight // Cambia el estado del scroll abajo 
  }, [ejercicios])


  async function onSubmit(data){ // La funcion handleSubmit ya le proporciona el parametro data
    
    const arrayEjercicios = ejercicios.map((e) => { //Crea un arreglo de objetos con los atributos de los ejercicios
      return (
        { // Al poner los corchetes se hace referencia a poner una variable o codigo y los mismo reemplzan el punto
          ejercicio: data[`ejercicio${e}`], 
          reps: data[`reps${e}`],
          kg: data[`kg${e}`]
        }
      )
    })

    const objectRutine = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        ejercicios: arrayEjercicios
    }

    const cambio = await updateUser({...usuario, rutines: [...usuario.rutines, objectRutine]})

    cambio ? ClickFunc() : ''
  }

  return(
    <motion.div className='bg-grayGym w-[400px] h-[440px] rounded-3xl relative'
    initial={{opacity: 0, y: -500, scale: 0}} animate={{opacity: 1, y: 0, scale: 0.9}}> 
      <form className='flex flex-col overflow-auto w-[90%] m-auto'
        onSubmit={handleSubmit(onSubmit)}>

          <input className='text-white text-4xl font-bold text-opacity-85 my-3 w-4/5 outline-none bg-transparent ml-4 transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70' 
          type="text" placeholder='Nombre' autoComplete='off' 
          {...register('nombre', {required: true})}/>
        
          <textarea className='text-white text-2xl font-bold text-opacity-75 mb-5 w-[90%] h-30 resize-none outline-none bg-transparent ml-4 transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full'
          type="text" placeholder='Descripcion' autoComplete='off' spellCheck={false} 
          {...register('descripcion',{required: true})}/>
        
        
          <div ref={formularioRef} className='max-h-[152px] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full'>

            {ejercicios.map((e) => {
              return (
              <div className='flex w-[90%] mx-auto py-1' key={e}>

                <input className='text-white text-xl font-bold text-opacity-75 outline-none bg-transparent w-[40%] transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70'
                type="text" autoComplete='off' placeholder={`Ejercicio ${e}`} spellCheck={false} {...register(`ejercicio${e}`, {required: true})}/>

                <div className='w-[25%] flex ml-3'>
                  <label htmlFor={`reps ${e}`}> <h1 className='font-bold text-white text-opacity-30 text-xl' >Reps:</h1> </label>

                  <input className='my-reps text-white font-bold text-opacity-80 mt-1 transition-all duration-200 w-[40px] bg-transparent outline-none text-center ml-2 caret-transparent border-b-2 border-transparent hover:border-white focus:border-white' 
                  id={`reps ${e}`} placeholder='-' type="number" min={0} autoComplete='off'
                  {...register(`reps${e}`, {required: true})}/>
                </div>

                <div className='w-[25%] flex ml-6'>
                  <label htmlFor={`kg ${e}`}> <h1 className='font-bold text-white text-opacity-30 text-xl select-none' >Kg:</h1> </label>

                  <input className='my-kg text-white font-bold text-opacity-80 mt-1 transition-all duration-200 w-[40px] bg-transparent outline-none text-center ml-2 caret-transparent  border-b-2 border-transparent hover:border-white focus:border-white select-none' 
                  id={`kg ${e}`} placeholder='-' type="number" min={0} autoComplete='off'
                  {...register(`kg${e}`, {required: true})}/>
                </div>

              </div>
            )})}

          </div>

          
          <div className='flex'>
            <IoMdAddCircle className='text-green-400 text-opacity-70 text-2xl hover:text-opacity-95 transition-all duration-200 cursor-pointer mt-2 ml-4'
            onClick={()=>{setEejercicios([...ejercicios, ejercicios.length + 1])}}/> 

            <IoMdRemoveCircle className='text-red-400 mt-2 ml-1 text-opacity-70 text-2xl hover:text-opacity-95 transition-all duration-200 cursor-pointer'
            onClick={()=>{if(ejercicios.length != 1){setEejercicios(ejercicios.filter(e => (e != ejercicios.length)))}}}/>
          </div>
          
          {ejercicios.length > 12 && ejercicios.length < 20 ? <h1 className='font-bold absolute left-10 bottom-16 text-yellow-300 select-none'> No se recomienda hacer mas de 12 ejercicios </h1> : ''}
          {ejercicios.length > 19 ? <h1 className='font-bold absolute left-10 bottom-16 text-red-500 select-none'> Estas loco... </h1> : ''}  

          <button type='submit' className='select-none absolute right-3 bottom-3'> <h1 className={` hover:text-yellow-500 flex items-center justify-center font-bold text-white px-3 py-1 text-xl rounded-3xl text-opacity-80 transition-all duration-200`}> Crear <BiMessageSquareAdd className='ml-1'/> </h1></button>
      </form>
    </motion.div>
  )
}