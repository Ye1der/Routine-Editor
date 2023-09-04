import {motion} from 'framer-motion'
import { useContext } from 'react'
import { contextGlobal } from '../../Context/Context'
import { updateUser } from '../../firebase/firebase'
import { VscLoading } from 'react-icons/vsc'


export function RutinesTrash(){

  const {usuario, focus, setFocus, eliminarRutina, activeEfect, setActiveEfect, eliminar, setEliminar, loading, setLoading} = useContext(contextGlobal)

  async function reestablecer(index){

    setLoading(true)

    const rutinaReestablecida = usuario.rutinesTrash[index]
    const trash = usuario.rutinesTrash
    trash.splice(index, 1)

    await updateUser({...usuario, rutines: [...usuario.rutines, rutinaReestablecida] }) //Actualiza el usuario con la rutina de la peñera ya eliminada

    await activeEfect ? setActiveEfect(false) : setActiveEfect(true)
    setFocus(null)
    setLoading(false)

  }

  return(
    <section className=' h-[78%] w-full mt-32'>
      <div className={`transition-all duration-300 flex justify-center flex-wrap h-full w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full`}>

      {usuario.rutinesTrash.map((e, index) => {

        return (
          <motion.div className='bg-grayGym w-[200px] h-[260px] m-5 rounded-3xl relative'
          key={index} initial={{opacity: 0, y: 200}} animate={{opacity: 1, y:0}} exit={{opacity: 0, y: 200}}> 

            <h1 className="mt-9 ml-3 text-3xl text-white text-opacity-80 font-bold "> {e.nombre} </h1>
            <p className="text-white text-lg font-bold text-opacity-50 mr-4 mt-3 ml-3"> {e.descripcion} </p>

            <button className="transition-all duration-300 absolute bg-red-600 w-full h-10 bottom-0 rounded-b-3xl flex items-center justify-center text-lg hover:bg-red-700 z-10 focus:h-full focus:rounded-3xl focus:cursor-default focus:hover:bg-red-600" 
            onFocus={()=>{setFocus(index)}} onBlur={()=>{setFocus(null), setEliminar(false)}}>

              {focus === index && eliminar === false &&
                <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} className={`grid grid-cols-1`}>

                  <div onClick={()=>{reestablecer(index)}} className="font-bold text-lg my-2 hover:text-white animation-all duration-300 cursor-pointer">
                    {loading !== index && <h1> Reestablecer </h1>}

                    {loading === index && 
                      <motion.div initial={{scale: 0}} animate={{scale: 1}} className='mr-1'>
                        <motion.div initial={{rotate: 0}} animate={{rotate: 6000}} transition={{duration: 8, repeat: Infinity}}>
                          <VscLoading style={{strokeWidth: '1px'}} className="text-base text-white"/>
                        </motion.div>
                      </motion.div>
                    }
                  </div>

                  <div onClick={()=>{setEliminar(true)}} className="font-bold text-lg my-2 hover:text-white animation-all duration-300 cursor-pointer"> Eliminar </div>
                </motion.div>
              }

              {focus != index &&
                <motion.h1 initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} className={`font-bold text-lg`}>
                  Opciones 
                </motion.h1>
              }

              {focus === index && eliminar === true && 
                <motion.div className="text-lg font-bold"
                initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}}>
    
                  {loading != index && 
                    <div>
                      <h1> Seguro? </h1>

                      <h1 className="flex gap-10 mt-4">
                          <span onClick={()=>{setLoading(index); eliminarRutina(index, 'rutinesTrash')}} className="hover:text-white transition-all duration-300 cursor-pointer">Si</span>  
                          <span onClick={()=>{setEliminar(false)}} className="hover:text-white transition-all duration-300 cursor-pointer">No</span> 
                      </h1>
                    </div>
                  }

                  {loading === index && 
                    <motion.div initial={{rotate: 0}} animate={{rotate: 3000, scale: 0.7}} transition={{duration: 3}} >
                      <VscLoading className="font-bold text-4xl"/>
                    </motion.div>
                  }
                </motion.div>
              }
            </button>
          </motion.div>
        )
      })}

      </div>
    </section>
  )
}