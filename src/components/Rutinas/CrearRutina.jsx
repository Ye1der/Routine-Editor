import { useContext, useEffect, useRef, useState } from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'
import {IoMdAddCircle} from 'react-icons/io'
import {IoMdRemoveCircle} from 'react-icons/io'
import {useForm} from 'react-hook-form'
import { contextGlobal } from '../../Context/Context'
import { updateUser } from '../../firebase/firebase'
import {motion, useAnimation} from 'framer-motion'
import { VscLoading } from 'react-icons/vsc'
import { BiRightArrowAlt } from 'react-icons/bi'
import './styles.css'

export function CrearRutina(){

  const [ejercicios, setEejercicios] = useState([1,2,3,4]) //Ejercicios que contiene el formulario
  const formularioRef = useRef(null) //Referencia el div que contiene los ejercicios
  const {usuario, ClickFunc, loading, setLoading} = useContext(contextGlobal)
  const {register, formState: {errors},handleSubmit} = useForm() //Hook useForm para retornar un objeto con los valores del formulario

  
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

    const date = new Date();
    const fecha = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`

    const Dia = daySelected.charAt(0).toUpperCase() + daySelected.slice(1) // Convierte la primer letra a mayucula

    const objectRutine = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      ejercicios: arrayEjercicios,
      fecha: fecha,
      dia: Dia
    }

    const cambio = await updateUser({...usuario, rutines: [...usuario.rutines, {...objectRutine, progreso: [objectRutine]}]})

    cambio ? ClickFunc() : ''
    setLoading(null)
  }

  const stylesDays = "text-xl text-white font-bold hover:text-opacity-100 cursor-pointer transition-all duration-300" // estilos de los 7 dias de la semana
  const [daySelected, setDaySelected] = useState('')
  const daysAnimation = useAnimation()
  const daysAnimationSmall = useAnimation()
  const [showDaysVerify, setShowDaysVerify] = useState(true);
  
  async function showDays(verify){
    setShowDaysVerify(!showDaysVerify)

    if(window.innerWidth > 767){
      verify && await daysAnimation.start({x: 420, scale: 1})
      !verify && await daysAnimation.start({x: 0, scale: 0})
    } else {
      verify && await daysAnimationSmall.start({y: 230, scale: 1})
      !verify && await daysAnimationSmall.start({y: 0, scale: 0})
    }
  }

  function selectDay(dia){
    daySelected == dia ? setDaySelected('') : setDaySelected(dia)
  }

  return(
    <main className='flex items-center relative w-[400px] h-[440px]'>
      <motion.div className=''
      initial={{opacity: 0, y: -500, scale: 0}} animate={{opacity: 1, y: 0, scale: 1}}> 

        <div className='bg-grayGym w-[400px] h-[440px] rounded-3xl relative z-10 scale-[0.88] md:scale-95'>
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

              <button type='submit' className='select-none absolute right-3 bottom-3'> 

                {!loading && // boton de crear rutina
                  <h1 className={` hover:text-yellow-500 flex items-center justify-center font-bold text-white px-3 py-1 text-xl rounded-3xl text-opacity-80 transition-all duration-200`}> Crear <BiMessageSquareAdd className='ml-1'/></h1>
                } 

                {loading && // animacion de rueda cargando
                  <motion.div initial={{scale: 0}} animate={{scale: 1}} className='mr-10 mb-2'>
                    <motion.div initial={{rotate: 0}} animate={{rotate: 3000}} transition={{duration: 4}} >
                      <VscLoading style={{strokeWidth: '1px'}} className="text-xl text-white"/>
                    </motion.div>
                  </motion.div>
                }
              </button>

              <button type='button' onClick={async()=>{await showDays(showDaysVerify)}}
              className={` ${!showDaysVerify && 'bg-opacity-10'} absolute left-7 bottom-3 flex items-center px-3 py-1 rounded-xl bg-white bg-opacity-0 text-xl text-white text-opacity-80 font-bold transition-all duration-200 hover:bg-opacity-10 hover:text-opacity-100`}>
                Dia de la semana <BiRightArrowAlt/>
              </button>
          </form>
        </div>

      </motion.div>

      <motion.section initial={{scale: 0}} animate={daysAnimation}
       className='absolute left-0 bg-grayGym w-[130px] h-[280px] pl-4 rounded-3xl flex flex-col gap-2 justify-center'>
        <h1 onClick={()=>{selectDay('lunes')}} className={`${stylesDays} ${daySelected == "lunes" ? 'text-opacity-100' : 'text-opacity-50'}`}> Lunes </h1>
        <h1 onClick={()=>{selectDay('martes')}} className={`${stylesDays} ${daySelected == "martes" ? 'text-opacity-100' : 'text-opacity-50'}`}> Martes </h1>
        <h1 onClick={()=>{selectDay('miercoles')}} className={`${stylesDays} ${daySelected == "miercoles" ? 'text-opacity-100' : 'text-opacity-50'}`}> Miercoles </h1>
        <h1 onClick={()=>{selectDay('jueves')}} className={`${stylesDays} ${daySelected == "jueves" ? 'text-opacity-100' : 'text-opacity-50'}`}> Jueves </h1>
        <h1 onClick={()=>{selectDay('viernes')}} className={`${stylesDays} ${daySelected == "viernes" ? 'text-opacity-100' : 'text-opacity-50'}`}> Viernes </h1>
        <h1 onClick={()=>{selectDay('sabado')}} className={`${stylesDays} ${daySelected == "sabado" ? 'text-opacity-100' : 'text-opacity-50'}`}> Sabado </h1>
        <h1 onClick={()=>{selectDay('domingo')}} className={`${stylesDays} ${daySelected == "domingo" ? 'text-opacity-100' : 'text-opacity-50'}`}> Domingo </h1>
      </motion.section>

      <motion.section className='absolute w-full grid place-content-center' 
      initial={{scale: 0}} animate={daysAnimationSmall}>
        
      <div className='bg-grayGym scale-[0.85] w-[360px] h-[60px] px-4 rounded-2xl flex items-center '>
        <div className='pb-2 flex items-center gap-8 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#FFFFFF50] scrollbar-thumb-rounded-full'>
          <h1 onClick={()=>{selectDay('lunes')}} className={`${stylesDays} ${daySelected == "lunes" ? 'text-opacity-100' : 'text-opacity-50'}`}> Lunes </h1>
          <h1 onClick={()=>{selectDay('martes')}} className={`${stylesDays} ${daySelected == "martes" ? 'text-opacity-100' : 'text-opacity-50'}`}> Martes </h1>
          <h1 onClick={()=>{selectDay('miercoles')}} className={`${stylesDays} ${daySelected == "miercoles" ? 'text-opacity-100' : 'text-opacity-50'}`}> Miercoles </h1>
          <h1 onClick={()=>{selectDay('jueves')}} className={`${stylesDays} ${daySelected == "jueves" ? 'text-opacity-100' : 'text-opacity-50'}`}> Jueves </h1>
          <h1 onClick={()=>{selectDay('viernes')}} className={`${stylesDays} ${daySelected == "viernes" ? 'text-opacity-100' : 'text-opacity-50'}`}> Viernes </h1>
          <h1 onClick={()=>{selectDay('sabado')}} className={`${stylesDays} ${daySelected == "sabado" ? 'text-opacity-100' : 'text-opacity-50'}`}> Sabado </h1>
          <h1 onClick={()=>{selectDay('domingo')}} className={`${stylesDays} ${daySelected == "domingo" ? 'text-opacity-100' : 'text-opacity-50'}`}> Domingo </h1>
        </div>
      </div>

      </motion.section>
    </main>
  )
}