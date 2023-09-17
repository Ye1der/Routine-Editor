import { useContext, useRef, useState } from "react"
import { contextGlobal } from "../../Context/Context"
import {HiOutlineTrash} from 'react-icons/hi'
import { motion } from 'framer-motion'
import { updateUser } from "../../firebase/firebase"
import {VscLoading} from 'react-icons/vsc'

export function Rutinas(){

  const {progreso, setProgreso, eliminarRutina, loading, setLoading, clickCrear, usuario, activeEfect, setActiveEfect, focus, setFocus, setVerRutina, setEditar, eliminar, setEliminar, papelera, setPapelera} = useContext(contextGlobal)
  const focusRefEliminar = useRef(null)

  async function papeleraFunc(index){
    setLoading(index)

    const eliminado = await usuario.rutines.splice(index, 1) //Elimina el elemento del arreglo rutines
    await usuario.rutinesTrash.push(eliminado[0]) //Agrega el elemento en el arreglo rutinesTrash
  
    await updateUser(usuario) //Actualiza el usuario con los nuevos cambios

    setLoading(null)
  }

  return(
    <section className=' h-[78%] mt-10 flex flex-wrap overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full'>
      <div className={`${ clickCrear ? ' opacity-0 -translate-y-96' : ' opacity-100' } transition-all duration-300 flex justify-center flex-wrap h-full w-full`}>

        {usuario.rutines.map((e, index) => {

          return(
            <motion.div className='bg-grayGym w-[200px] h-[260px] rounded-3xl m-5 relative'
            key={index} initial={{opacity: 0, y: -500}} animate={{opacity: 1, y: 0}}> 

              <button onClick={()=>{papeleraFunc(index)}} className="transition-all z-10 duration-300 absolute top-3 right-3 text-xl text-red-400 hover:text-red-500" > 
                {loading !== index && <HiOutlineTrash/>}

                {loading === index && 
                  <motion.div initial={{scale: 0}} animate={{scale: 1}} className='mr-1'>
                    <motion.div initial={{rotate: 0}} animate={{rotate: 6000}} transition={{duration: 8, repeat: Infinity}}>
                      <VscLoading style={{strokeWidth: '1px'}} className="text-base text-red-500"/>
                    </motion.div>
                  </motion.div>
                }
              </button>

              <div onClick={()=>{setVerRutina(index)}} className="transition-all duration-300 h-56 cursor-pointer absolute top-0 w-full rounded-t-3xl">
                <h1 className="mt-9 ml-3 text-3xl text-white text-opacity-80 font-bold "> {e.nombre}  </h1>
                <p className="text-white text-lg font-bold text-opacity-50 mr-4 mt-3 ml-3"> {e.descripcion} </p>
              </div>

              <button className="transition-all duration-300 absolute bg-yellow-600 w-full h-10 bottom-0 rounded-b-3xl flex items-center justify-center text-lg hover:bg-yellow-500 z-20 focus:h-full focus:rounded-3xl focus:cursor-default focus:hover:bg-yellow-600" 
              onFocus={()=>{setFocus(index)}} onBlur={()=>{setFocus(null); setEliminar(false)}}>

                {focus === index && eliminar === false && // Menu de opciones de cada rutina
                  <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} className={`grid grid-cols-1`}>

                    <div onClick={()=>{setEditar(index)}} className="font-bold text-lg my-2 hover:text-white transition-all duration-300 cursor-pointer"> Actualizar </div>
                    <div onClick={()=>{setProgreso(index)}}  className="font-bold text-lg my-2 hover:text-white transition-all duration-300 cursor-pointer"> progreso </div>
                    <div onClick={()=>{setVerRutina(index)}} className="font-bold text-lg my-2 hover:text-white transition-all duration-300 cursor-pointer"> Ver Rutina </div>
                    

                  </motion.div>
                }

                {focus != index && // Abre el menu de opciones
                  <motion.h1 initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} className={`font-bold text-lg`}>
                    Opciones 
                  </motion.h1>
                }

                {focus == index && eliminar === true && // Pregunta si realmente quiere eliminar la rutina
                  <motion.div className="text-lg font-bold"
                  initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}}>
                        <h1> Seguro? </h1>

                        <h1 className="flex gap-10 mt-4">
                            <span className="hover:text-white transition-all duration-300 cursor-pointer"
                              onClick={()=>{
                                eliminarRutina(index, 'rutines')
                                focusRefEliminar.current.focus()
                              }}
                            > Si </span>  

                            <span onClick={()=>{setEliminar(false)}} className="hover:text-white transition-all duration-300 cursor-pointer">No</span> 
                        </h1>
                  </motion.div>
                }
              </button>
            </motion.div>
          )})}

          <button ref={focusRefEliminar} className="scale-0 opacity-0"></button> {/*Maneja el desenfoque del boton opciones*/}

      </div>
    </section>
  )
}