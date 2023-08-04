import { useContext, useState } from "react"
import { contextGlobal } from "../Context/Context"
import {HiOutlineTrash} from 'react-icons/hi'
import { motion } from 'framer-motion'
import { updateUser } from "../firebase/firebase"

export function Rutinas(){

  const {eliminarRutina, clickCrear, usuario, activeEfect, setActiveEfect, focus, setFocus, setVerRutina, setEditar} = useContext(contextGlobal)

  async function papeleraFunc(index){
    const rutines = usuario.rutines
    const rutineTrash = rutines[index]
    const trash = usuario.rutinesTrash
    const filter = rutines.filter(rutine => (rutine != rutines[index]))
    
    await updateUser({...usuario, rutines: filter, rutinesTrash: [...trash, rutineTrash] })
    
    activeEfect ? setActiveEfect(false) : setActiveEfect(true)
  }

  return(
    <section className=' h-[78%] mt-10 flex flex-wrap overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full'>
      <div className={`${ clickCrear ? ' opacity-0 -translate-y-96' : ' opacity-100' } transition-all duration-300 flex justify-center flex-wrap h-full w-full`}>

        {usuario.rutines.map((e, index) => {

          return(
            <motion.div className='bg-grayGym w-[200px] h-[260px] rounded-3xl m-5 relative'
            key={index} initial={{opacity: 0, y: -500}} animate={{opacity: 1, y: 0}}> 

              <button onClick={()=>{papeleraFunc(index)}} className="transition-all duration-300 absolute top-3 right-3 text-xl text-red-400 hover:text-red-500" > <HiOutlineTrash/> </button>

              <h1 className="mt-9 ml-3 text-3xl text-white text-opacity-80 font-bold "> {e.nombre} </h1>
              <p className="text-white text-lg font-bold text-opacity-50 mr-4 mt-3 ml-3"> {e.descripcion} </p>

              <button className="transition-all duration-300 absolute bg-yellow-600 w-full h-10 bottom-0 rounded-b-3xl flex items-center justify-center text-lg hover:bg-yellow-500 z-10 focus:h-full focus:rounded-3xl focus:cursor-default focus:hover:bg-yellow-600" 
              onFocus={()=>{setFocus(index)}} onBlur={()=>{setTimeout(()=>{setFocus(null)}, 120)}}>

                {focus === index ? 
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className={`transition-all duration-300 grid grid-cols-1`}>

                      <div onClick={()=>{setEditar(index)}} className="font-bold text-lg my-2 hover:text-white transition-all duration-300 cursor-pointer"> Editar </div>
                      <div onClick={()=>{setVerRutina(index)}} className="font-bold text-lg my-2 hover:text-white transition-all duration-300 cursor-pointer"> Ver Rutina </div>
                      <div onClick={()=>{eliminarRutina(index, 'rutines')}} className="font-bold text-lg my-2 hover:text-white transition-all duration-300 cursor-pointer"> Eliminar </div>

                    </motion.div>
                    :
                    <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} className={`transition-all duration-300 font-bold text-lg`}>
                        Opciones 
                    </motion.h1>
                  }
              </button>
            </motion.div>
          )})}

      </div>
    </section>
  )
}