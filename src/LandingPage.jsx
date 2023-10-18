import logo from './img/logo.webp'
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from 'react-router'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import { motion, useAnimation } from 'framer-motion'

export function LandingPage(){

  const navigate = useNavigate()
  const leftAnimate = useAnimation()
  const rightAnimate = useAnimation()

  const animacion = () => {
    return new Promise((resolve, reject) => {
      resolve(
        leftAnimate.start({translateX: '-200%'})
      )

      resolve(
        rightAnimate.start({translateX: '200%'})
      )
    })
  }

  async function start(){
    animacion().then(()=>{
      navigate("/login")
    })
  }

  return(
    <main className='relative flex items-center justify-center h-screen w-full overflow-auto scrollbar-none'>

      <motion.div className='absolute right-5 top-5 ' animate={rightAnimate} transition={{duration: 0.3, ease: 'backIn'}}>
        <button className='flex items-center justify-center text-lg font-bold bg-red-600 py-1 px-3 rounded-2xl hover:text-white transition-all duration-300' onClick={()=>{start()}} animate={rightAnimate}> 
          <h1> Iniciar sesión </h1> 
        </button>
      </motion.div>

      <motion.div animate={leftAnimate} transition={{duration: 0.3, ease: 'backIn'}} className='w-[340px]'>
        <h1 className='text-[60px] text-white font-bold leading-[70px]'> <span className='text-yellow-500'> Crea</span>, edita y <span className='text-yellow-500'> gestiona </span> tus rutinas </h1>
        <h1 className='text-xl text-white text-opacity-50 font-bold mt-5'> Organiza tus rutinas, alimentos y marcas personales </h1>

        <button className='flex items-center justify-center text-xl font-bold mt-7 bg-red-600 py-2 px-3 rounded-2xl hover:text-white transition-all duration-300' onClick={()=>{start()}}> 
          <h1> Comenzar </h1>
          <BiArrowBack className='-scale-x-100 mt-1 ml-2'/>  
        </button>
      </motion.div>
      
      <motion.div className='md:-mr-20' animate={rightAnimate} transition={{duration: 0.3, ease: 'backIn'}}>
        <img className='w-0  md:w-[400px]   lg:w-auto' src={logo} alt="Logo" />
      </motion.div>

      <motion.div animate={leftAnimate} transition={{duration: 0.3, ease: 'backIn'}} className='absolute left-10 top-5 gap-4 flex text-2xl'>
        <a href="https://www.linkedin.com/in/yeider-pe%C3%B1a-640311230/" target='_blank'>
          <AiFillLinkedin className='text-opacity-60 text-white hover:text-opacity-100 cursor-pointer transition-all duration-200'/>
        </a>
        
        <a href="https://github.com/Ye1der" target='_blank'>
          <AiFillGithub className='text-opacity-60 text-white hover:text-opacity-100 cursor-pointer transition-all duration-200'/>
        </a>

        <a href="https://twitter.com/Y117536434" target='_blank'>
         <AiOutlineTwitter className='text-opacity-60 text-white hover:text-opacity-100 cursor-pointer transition-all duration-200'/>
        </a>
      </motion.div>


    </main>
  )
}