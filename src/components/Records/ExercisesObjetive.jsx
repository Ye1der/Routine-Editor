import { motion, useAnimation } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import {RiCloseFill} from 'react-icons/ri'
import {HiOutlineBadgeCheck} from 'react-icons/hi'
import { contextGlobal } from "../../Context/Context";
import {VscLoading} from 'react-icons/vsc'
import {FaBoxOpen} from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { updateUser } from "../../firebase/firebase";
import {BiCheck} from 'react-icons/bi'
import {GiBiceps} from 'react-icons/gi'

export function ExercisesObjetive(){

  const [swich, setSwich] = useState('list');
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [indexComplete, setIndexComplete] = useState(null);
  const {usuario, setUsuario} = useContext(contextGlobal);
  const {register, handleSubmit, reset} = useForm()
  const animateContainer = useAnimation()
  const finishGoal = useAnimation();
  const [indexAnimate, setIndexAnimate] = useState(null);

  async function onSubmit(data){
    setLoading(true)

    const object = {
      nombre: data.nombre,
      peso: data.peso
    }
    
    setUsuario({...usuario, objectiveExercises: [...usuario.objectiveExercises, object]})
  }

  useEffect(()=>{
    updateUser(usuario).then(()=>{
      setLoading(false)
      animateContainer.start({height: 192})
      setSwich('list')
      reset()
    })

  }, [usuario])

  async function goalComplete(index){

    setTimeout(()=>{
      setIndexAnimate(index)
    }, 800)
    
    setTimeout(async ()=>{
      setIndexAnimate(null)
      setIndexComplete(null)
      setComplete(false)

      setUsuario({...usuario, 
        objectiveExercises: usuario.objectiveExercises.slice(0, index)
        .concat(usuario.objectiveExercises.slice(index + 1))
      })
    }, 1100)

  }

  return(
    <motion.div initial={{scale: 0}} animate={{scale: 1}} className="w-[400px]">

      <h1 className=" text-xl text-white font-semibold mb-4 "> Ejercicios | Marcas a alcanzar </h1>

      <main className="h-[192px] flex items-center">

        <motion.section initial={{height: 192}} animate={animateContainer} className={`w-[240px] bg-grayGym rounded-2xl p-5 relative overflow-auto scrollbar-none`}>

          {usuario === null && swich === 'list' &&
            <div className="h-full w-full grid place-content-center">
              <motion.div initial={{rotate: 0}} animate={{rotate: 720}} transition={{duration: 1, ease: "linear", repeat: Infinity}}>
                <VscLoading style={{strokeWidth: '1px'}} className="text-2xl text-opacity-50 text-white"/>
              </motion.div>
            </div>
          }

          {usuario != null && usuario.objectiveExercises.length === 0 && swich === 'list' && 
            <motion.div initial={{scale: 0}} animate={{scale: 1}} className="h-full w-full flex flex-col items-center justify-center">
              <h1 className={`text-white font-bold text-xl text-opacity-30 transition-all`}> ¡Vacio! </h1>
              <FaBoxOpen className="text-white text-opacity-30 text-[70px]"/>
            </motion.div>
          }

          {usuario != null && usuario.objectiveExercises.length > 0 && swich === 'list' &&
            usuario.objectiveExercises.map((obj, index) => {
              return(
              <motion.div className={`${indexAnimate === index && '-translate-x-80'} transition-all duration-300`}>
              <motion.section initial={{opacity: 0}} animate={{opacity: 1}} className="bg-black py-2 mb-3 bg-opacity-30 rounded-2xl flex items-center justify-center transition-all duration-300 overflow-auto scrollbar-none">
                {indexComplete != index &&
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex items-center justify-center">
                    <div className="h-11 w-[140px] grid place-content-center border-r-2 border-white border-opacity-70 text-white text-opacity-70 font-bold">
                      <h1 className="text-lg text-center cursor-default"> {obj.nombre} </h1>
                      <h1 className="text-lg text-center cursor-default"> {obj.peso} Kgs </h1>
                    </div>

                    <HiOutlineBadgeCheck onClick={async () => {
                      setIndexComplete(index)
                      setComplete(false)
                    }} className="text-2xl text-white text-opacity-80 ml-3 cursor-pointer hover:text-yellow-500 transition-all duration-300"/>

                  </motion.div>
                }

                {indexComplete === index && complete === false && 
                  <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="h-11 flex items-center justify-center">
                    <h1 className="pr-2 text-lg text-opacity-70 text-white font-bold border-r-2 border-white border-opacity-70"> ¿Completado? </h1>

                    <BiCheck onClick={async ()=>{
                      setComplete(true); 
                      await goalComplete(index)
                    }} className="text-white text-xl text-opacity-70 ml-2 cursor-pointer hover:text-yellow-500 hover:text-opacity-100 transition-all duration-300"/>

                    <RiCloseFill onClick={async ()=>{
                      setIndexComplete(null)
                    }} className="text-white text-xl text-opacity-70 m-1 cursor-pointer hover:text-yellow-500 hover:text-opacity-100 transition-all duration-300"/>
                  </motion.div>
                }

                {indexComplete === index && complete === true &&
                  <motion.div initial={{scale: 0}} animate={{scale: 1}} className="h-11 flex items-center justify-center">
                    <GiBiceps className="text-xl text-yellow-500 mr-1 -scale-x-100"/>
                    <h1 className="text-xl text-yellow-500 font-bold cursor-default"> ¡Felicitaciones! </h1>
                    <GiBiceps className="text-xl text-yellow-500 ml-1"/>
                  </motion.div>
                }
              </motion.section>
              </motion.div>
            )})
          }

          {swich === 'create' && 
            <motion.div className="h-full w-full relative" initial={{opacity: 0}} animate={{opacity: 1}}>
              <form onSubmit={handleSubmit(onSubmit)}>

                <RiCloseFill onClick={async ()=>{
                  setSwich('list');
                  await animateContainer.start({height: 192})
                  reset()
                }} className="absolute -right-3 -top-3 text-2xl text-white text-opacity-50 cursor-pointer hover:text-opacity-100 hover:rotate-90 transition-all duration-300"/>

                <input className="text-white ml-3 text-xl font-bold bg-transparent mb-1 mt-1 outline-none cursor-pointer focus:placeholder:text-opacity-70 placeholder:font-bold placeholder:text-white placeholder:text-opacity-40 placeholder:text-xl" type="text" placeholder="Ejercicio" {...register('nombre', {required: true})} autoComplete="off"/>

                <div className=" mt-2 ">
                  <label className="text-white ml-3 text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="pesoObjetivo"> Peso / Kgs: </label>
                  <input className="numeric-input text-white absolute right-3 ml-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="pesoObjetivo" type="number" placeholder="-" {...register('peso', {required: true})} autoComplete="off"/>
                </div>

              </form>
            </motion.div>
          }
        </motion.section>

        <section className="ml-5 mr-20 grid place-content-center"> 
          {swich == 'list' && 
            <motion.div initial={{scale: 0}} animate={{scale: 1}}>
              <button onClick={async()=>{
                setSwich('create')
                await animateContainer.start({height: 120})
              }} className="text-white text-opacity-50 w-12 h-12 rounded-xl text-4xl bg-grayGym hover:text-opacity-100 hover:rotate-90 hover:text-yellow-500 transition-all duration-300">
               + 
              </button>
            </motion.div>
          }

          {swich === 'create' ? 
            <motion.div initial={{scale: 0}} animate={{scale: 1}}>

              <button onClick={handleSubmit(onSubmit)} className="text-white text-opacity-50 w-12 h-12 flex items-center justify-center rounded-xl text-3xl bg-grayGym hover:text-opacity-100 hover:text-yellow-500 transition-all duration-300"> 

                {!loading && <BiCheck/> } 

                {loading &&
                  <motion.div initial={{rotate: 0}} animate={{rotate: 720}} transition={{duration: 1, ease: "linear", repeat: Infinity}}>
                    <VscLoading style={{strokeWidth: '1px'}} className="text-xl text-opacity-50 text-white"/>
                  </motion.div>
                }
              </button>

            </motion.div>
            : ''
          }
        </section>
      </main>

    </motion.div>
  )
}