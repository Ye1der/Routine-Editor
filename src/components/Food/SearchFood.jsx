import { useContext, useRef, useState } from 'react'
import {BiArrowBack, BiSearchAlt, BiSearchAlt2} from 'react-icons/bi'
import {motion, AnimatePresence, easeInOut} from 'framer-motion'
import { contextGlobal } from '../../Context/Context'

export function SearchFood(){

  const [focus, setFocus] = useState(null)
  const {searchFood, setSearchFood} = useContext(contextGlobal);

  return(

      <div className='flex items-center'>
        <button onClick={()=>{setFocus(true)}} onBlur={()=>{setFocus(false)}}  className={`scale-90 md:scale-100 text-xl mt-8 w-[140px] h-[50px] transition-all duration-300 ease-in-out cursor-pointer text-white hover:text-yellow-600 rounded-3xl flex items-center justify-center bg-grayGym ${focus && 'w-[250px] md:w-[350px]'}`}>
          
          {!focus && 
            <motion.span key="button" exit={{scale: 0, opacity: 0}} initial={{scale: 0}} animate={{scale: 1}} transition={{duration: 0.3, ease: easeInOut}}  className='flex items-center justify-center'>
              <h1> Buscar </h1>
              <BiSearchAlt className='text-2xl ml-2 '></BiSearchAlt>
            </motion.span>
          }

          {focus && 
            <motion.div className='text-white flex items-center rounded-full justify-center relative w-full'
            key="search" exit={{scale: 0, opacity: 0}} initial={{scale: 0}} animate={{scale: 1}} transition={{duration: 0.3, ease: easeInOut}}>
              <input onChange={()=>{setSearchFood(event.target.value)}} onFocus={()=>{setFocus(true)}} autoFocus type="text" placeholder='Buscar' defaultValue={searchFood} className='bg-transparent caret-white outline-none text-white text-opacity-75 text-center w-full h-[50px] font-bold placeholder:font-thin'/>
            </motion.div>
          }
          
        </button>

        <AnimatePresence>
          {focus && 
            <motion.button key="exitFocus" initial={{opacity: 0, x: -400}} animate={{opacity: 1, x: 0}} exit={{opacity: 0}} className='text-white absolute hover:text-yellow-600 ml-2 md:ml-0 text-xl h-[50px] w-[50px] rounded-full mt-8 flex items-center justify-center'>
              <BiArrowBack/>
            </motion.button>
          }
        </AnimatePresence>

      </div>
  )
}