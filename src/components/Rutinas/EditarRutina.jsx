import { useContext, useEffect, useRef, useState } from 'react'
import {IoMdAddCircle} from 'react-icons/io'
import {IoMdRemoveCircle} from 'react-icons/io'
import {useForm} from 'react-hook-form'
import { contextGlobal } from '../../Context/Context'
import { updateUser } from '../../firebase/firebase'
import {motion} from 'framer-motion'
import {MdUpgrade} from 'react-icons/md'
import {MdClose} from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import {FaRegEye} from 'react-icons/fa'
import { VscLoading } from 'react-icons/vsc'

export function EditarRutina(){
  const refDiv = useRef(null)

  const {usuario, setEditar, editar, setVerRutina} = useContext(contextGlobal)

  const arrayEjercicios = usuario.rutines[editar].ejercicios.map((e, index) => {return (index + 1)})

  const [ejercicios, setEejercicios] = useState(arrayEjercicios) //Ejercicios que contiene el formulario
  const formularioRef = useRef(null) //Referencia el div que contiene los ejercicios
  const {register, formState: {errors}, handleSubmit} = useForm() //Hook useForm para retornar un objeto con los valores del formulario
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const formularioDiv = formularioRef.current // Crea una constante con el div
    formularioDiv.scrollTop = formularioDiv.scrollHeight // Cambia el estado del scroll abajo 
  }, [ejercicios])


  async function onSubmit(data){ // La funcion handleSubmit ya le proporciona el parametro data
    setLoading(true)

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

    const progreso = usuario.rutines[editar].progreso

    const spliceArray = usuario.rutines
    spliceArray.splice(editar, 1, {...objectRutine, progreso: [...progreso, objectRutine]})


    const cambio = await updateUser({...usuario, rutines: spliceArray,})

    cambio ? setEditar(null) : ''
    setLoading(false)
  }

  const objectRutine = usuario.rutines[editar]

  return(
    <div className='absolute z-20 flex items-center justify-center bg-black bg-opacity-80 w-full h-full'>
      <motion.div className='bg-grayGym w-[370px] h-[440px] rounded-3xl relative'
      ref={refDiv} initial={{opacity: 0, y: -500, scale: 0}} animate={{opacity: 1, y: 0, scale: 1}} exit={{opacity: 0, y: -500}}> 
      <form className='flex flex-col overflow-auto w-[90%] m-auto'
        onSubmit={handleSubmit(onSubmit)}>

          <TiDelete onClick={()=>{setEditar(null)}} className="absolute top-3 right-3 text-red-500 text-opacity-90 text-[33px] cursor-pointer hover:text-red-600 hover:rotate-180 hover:text-opacity-100 transition-all duration-300" />
          <div onClick={()=>{setEditar(null); setVerRutina(editar)}} className='absolute right-14 top-[17px] p-[3px] cursor-pointer bg-yellow-600 rounded-full hover:bg-yellow-500 transition-all duration-300 '> <FaRegEye/> </div>

          <input className='text-white text-4xl font-bold text-opacity-85 mt-8 mb-3 w-4/5 outline-none bg-transparent ml-4 transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70' // Input para el nombre de la rutina
          type="text" placeholder='Nombre' autoComplete='off' defaultValue={objectRutine.nombre}
          {...register('nombre', {required: true})}/>
        
          <textarea className='text-white text-2xl font-bold text-opacity-75 mb-5 w-[90%] h-30 resize-none outline-none bg-transparent ml-4 transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white focus:placeholder:opacity-70 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full' // Input para la descripcion de la rutina
          type="text" placeholder='Descripcion' autoComplete='off' spellCheck={false} defaultValue={objectRutine.descripcion}
          {...register('descripcion', {required: true})}/>
        
        
          <div ref={formularioRef} className='max-h-[152px] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full'>

            {ejercicios.map((e, index) => {
              return (
              <div className='flex mx-4 py-1' key={e}>

                <input className='text-white text-xl font-bold text-opacity-75 outline-none bg-transparent w-[40%] transition-all duration-200 placeholder:opacity-40 placeholder:font-bold caret-white cursor-text focus:placeholder:opacity-70'
                type="text" autoComplete='off' placeholder={`Ejercicio ${e}`} spellCheck={false} 
                {...register(`ejercicio${e}`, {required: true})} defaultValue={ (index + 1) <= objectRutine.ejercicios.length ? objectRutine.ejercicios[index].ejercicio : ''}/>

                <div className='w-[25%] flex ml-3'>
                  <label htmlFor={`reps ${e}`}> <h1 className='font-bold text-white text-opacity-30 text-xl' >Reps:</h1> </label>

                  <input className='my-reps text-white font-bold text-opacity-80 mt-1 transition-all duration-200 w-[40px] bg-transparent outline-none text-center ml-1 caret-transparent border-b-2 border-transparent hover:border-white focus:border-white' 
                  id={`reps ${e}`} placeholder='-' type="number" min={0} autoComplete='off'
                  {...register(`reps${e}`, {required: true})} defaultValue={ (index + 1) <= objectRutine.ejercicios.length && objectRutine.ejercicios[index].reps}/>
                </div>

                <div className='w-[25%] flex ml-7'>
                  <label htmlFor={`kg ${e}`}> <h1 className='font-bold text-white text-opacity-30 text-xl select-none' >Kg:</h1> </label>

                  <input className='my-kg text-white font-bold text-opacity-80 mt-1 transition-all duration-200 w-[40px] bg-transparent outline-none text-center ml-1 caret-transparent  border-b-2 border-transparent hover:border-white focus:border-white select-none' 
                  id={`kg ${e}`} placeholder='-' type="number" min={0} autoComplete='off'
                  {...register(`kg${e}`, {required: true})} defaultValue={ (index + 1) <= objectRutine.ejercicios.length && objectRutine.ejercicios[index].kg}/>
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
          
          {ejercicios.length > 12 && ejercicios.length < 20 ? <h1 className='font-bold absolute left-9 bottom-8 text-yellow-300 select-none'> No se recomienda hacer mas de 12 ejercicios </h1> : ''}
          {ejercicios.length > 19 ? <h1 className='font-bold absolute left-10 bottom-12 text-red-500 select-none'> Estas loco... </h1> : ''}  

          {!loading && 
            <button type='submit' className='select-none absolute right-3 bottom-3'> <h1 className={` hover:text-yellow-500 flex items-center justify-center font-bold text-white px-3 py-1 text-xl rounded-3xl text-opacity-80 transition-all duration-200`}> Actualizar <MdUpgrade className='ml-1 text-2xl font-bold'/> </h1></button>
          }

          {loading && 
              <motion.div initial={{scale: 0}} animate={{scale: 1}} className='absolute right-14 bottom-5'>
                <motion.div initial={{rotate: 0}} animate={{rotate: 3000}} transition={{duration: 4}} >
                  <VscLoading style={{strokeWidth: '1px'}} className="text-xl text-white"/>
                </motion.div>
              </motion.div>
          }

      </form>
    </motion.div>
    </div>
  )
}