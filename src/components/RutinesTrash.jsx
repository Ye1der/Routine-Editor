import {motion} from 'framer-motion'
import { useContext } from 'react'
import { contextGlobal } from '../Context/Context'
import { updateUser } from '../firebase/firebase'


export function RutinesTrash(){

  const {usuario, focus, setFocus, eliminarRutina, activeEfect, setActiveEfect} = useContext(contextGlobal)

  async function reestablecer(index){

    const rutinaReestablecida = usuario.rutinesTrash[index]
    const trash = usuario.rutinesTrash
    trash.splice(index, 1)

    await updateUser({...usuario, rutines: [...usuario.rutines, rutinaReestablecida] }) //Actualiza el usuario con la rutina de la peñera ya eliminada

    await activeEfect ? setActiveEfect(false) : setActiveEfect(true)
    setFocus(null)

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
            onFocus={()=>{setFocus(index)}} onBlur={()=>{setFocus(null)}}>

              {focus === index ? 
                  <motion.div initial={{opacity: 0}} exit={{opacity: 0}} animate={{opacity: 1}} className={`transition-all duration-300 grid grid-cols-1`}>
                    <div onClick={()=>{reestablecer(index)}} className="font-bold text-lg my-2 hover:text-white animation-all duration-300 cursor-pointer"> Restablecer </div>
                    <div onClick={()=>{eliminarRutina(index, 'rutinesTrash')}} className="font-bold text-lg my-2 hover:text-white animation-all duration-300 cursor-pointer"> Eliminar </div>
                  </motion.div>
                  :
                  <motion.h1 initial={{opacity: 0}} exit={{opacity: 0}} animate={{opacity: 1}} className={`transition-all duration-300 font-bold text-lg`}>
                      Opciones 
                  </motion.h1>
                }
            </button>
          </motion.div>
        )
      })}

      </div>
    </section>
  )
}