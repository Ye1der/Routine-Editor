import {FiTrash} from 'react-icons/fi'
import {AnimatePresence, motion} from 'framer-motion'
import { useContext, useRef } from 'react'
import { contextGlobal } from '../../Context/Context'
import {CgCheckO} from 'react-icons/cg'
import {TiDeleteOutline} from 'react-icons/ti'
import { updateUser } from '../../firebase/firebase'
import { VscLoading } from 'react-icons/vsc'


export function ButtonVoidTrash(){

  const {voidTrash, setVoidTrash, loading, setLoading, usuario, setActiveEfect, activeEfect} = useContext(contextGlobal)

  const focusRef = useRef(null)

  async function vaciarPapelera(){
    if(usuario.rutinesTrash.length > 0 ){
    
      setLoading(true)

      await updateUser({...usuario, rutinesTrash: []})

      setActiveEfect(!activeEfect)
      setLoading(false)
    }

    focusRef.current.blur()
  }

  return (
      <motion.button className="absolute right-10 top-8"
      onFocus={()=>{setVoidTrash(true)}} onBlur={()=>{setVoidTrash(false)}} ref={focusRef}
      initial={{x: 200, opacity: 0}} exit={{x: 200, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease: 'linear', duration: 0.2}}>
        
        {!voidTrash && 
          <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}}>
            <div className='text-white bg-grayGym h-[50px] px-4 flex justify-center items-center rounded-full transition-all duration-300 hover:text-yellow-500'>
              <h1 className="text-xl flex justify-center items-center"> Vaciar Papelera <FiTrash className='ml-2'/> </h1>
            </div>
          </motion.div>
        }

        {voidTrash && 
          <motion.div className='text-white text-xl bg-grayGym h-[50px] px-4 flex justify-center items-center rounded-full'
          initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}}>

            <h1> Seguro? </h1>

            {!loading && 
              <div className='flex items-center justify-center'>
                <h1 onClick={vaciarPapelera} className='ml-5 hover:text-yellow-600 transition-all duration-300'> <CgCheckO/> </h1>
                <h1 onClick={()=>{focusRef.current.blur()}} className='ml-3 text-2xl hover:text-red-500 transition-all duration-300'> <TiDeleteOutline/> </h1>
              </div>
            }

            {loading && 
              <motion.div initial={{scale: 0}} animate={{scale: 1}} className='mx-5'>
                <motion.div initial={{rotate: 0}} animate={{rotate: 3000}} transition={{duration: 4}} >
                  <VscLoading style={{strokeWidth: '1px'}} className="text-base text-white"/>
                </motion.div>
              </motion.div>
            }
          </motion.div>
        }

      </motion.button>
  )
}