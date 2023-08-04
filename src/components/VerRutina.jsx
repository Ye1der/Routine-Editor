import { useContext } from "react"
import { contextGlobal } from "../Context/Context"
import {AnimatePresence, motion} from 'framer-motion'
import { TiDelete } from "react-icons/ti"

export function VerRutina(){

  const {usuario, verRutina, setVerRutina} = useContext(contextGlobal)

  return(
    <div className='absolute z-20 flex items-center justify-center bg-black bg-opacity-80 w-full h-full'>
      <AnimatePresence>
      <motion.div className='bg-grayGym w-[350px] h-[440px] rounded-3xl relative' 
      initial={{scale: 0, opacity: 0, y:-500}} animate={{scale: 1, opacity: 1, y:0}} exit={{y: -500}}>

        <TiDelete className="absolute top-3 right-3 text-red-500 text-opacity-90 text-[33px] cursor-pointer hover:text-red-600 hover:rotate-90 hover:text-opacity-100 transition-all duration-300"
        onClick={()=>{setVerRutina(null)}}/>

        <h1 className="text-4xl font-bold text-yellow-600 ml-5 mt-10"> {usuario.rutines[verRutina].nombre} </h1>
        <p className="text-2xl w-[80%] text-opacity-80 font-bold text-white ml-5 mt-3"> {usuario.rutines[verRutina].descripcion} </p>

        <div className=" h-[50%] mt-6 ml-5 mr-2 text-xl overflow-auto justify-center scrollbar-thin scrollbar-track-gray-500 scrollbar-track-rounded-full scrollbar-thumb-transparent ">
        {usuario.rutines[verRutina].ejercicios.map( (rutine, index) => {
          return(
            <div key={index} className="flex mb-2">
              <h1 className="w-32 font-bold text-white text-opacity-80"> {rutine.ejercicio} </h1>
              <h1 className="w-24 mr-2 text-white font-bold text-opacity-50 flex"> Reps: <span className="text-white text-opacity-80 ml-1">{rutine.reps}</span> </h1>
              <h1 className="text-white font-bold text-opacity-50 flex "> Kg: <span className={`${rutine.kg > 99 ? 'text-yellow-600' : 'text-white'} ml-1 text-opacity-80 ml-`}>{rutine.kg}</span> </h1>
            </div>
          )
        })}
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
  )
}