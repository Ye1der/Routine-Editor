import {GiBiceps} from 'react-icons/gi'
import {CgGym} from 'react-icons/cg'
import { motion, useAnimation } from 'framer-motion'
import {useForm} from 'react-hook-form'
import { useState } from 'react'

export function Calcular1RM(){

  const {register, formState: {errors},handleSubmit} = useForm()
  const [rm, setRm] = useState('')
  const animateDumbbell = useAnimation()
  const animateRms = useAnimation()

  const styleRms = "text-white font-bold text-lg text-center text-opacity-70 border-white py-2 w-[200px]"

  async function onSubmit(data){
    setRm(Math.round(data.kgs / (1.0278 - 0.0278 * data.reps)))

    window.innerWidth > 767 ? animateRms.start({x:300}) : animateRms.start({y:180}) 

    await animateDumbbell.start({rotate: 360})
    animateDumbbell.set({rotate: 0})
  }

  function restRms(reps){
    return Math.round((rm / (1.0278 + (0.0278 * reps))))
  }

  return (
    <motion.main className='flex flex-col items-center justify-center relative' initial={{scale: 0}} animate={{scale: 1}}> 

      <h1 className='text-xl text-white font-semibold mb-3
      '> Calcular RMs </h1>

      <div className='flex h-[400px] md:h-auto'>
        <section className="flex flex-col bg-grayGym rounded-2xl relative w-[280px] h-[180px] z-10">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className=" mt-6 ml-5 ">
              <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="repeticiones"> Repeticiones: </label>
              <input className="numeric-input text-white absolute right-5 ml-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="repeticiones" type="number" placeholder="-" {...register('reps', {required: true})} autoComplete='off'/>
            </div>

            <div className="ml-5 mt-3">
              <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="peso"> Peso / Kgs: </label>
              <input className="numeric-input text-white absolute right-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="peso" type="number" placeholder="-" {...register('kgs', {required: true})} autoComplete='off'/>
            </div>

            <hr className="w-[90%] mx-auto mt-6 mb-4 border-[1px] opacity-70" />

            <button className='flex items-center justify-center mx-auto text-white text-opacity-90 hover:text-opacity-100 hover:text-yellow-500' type='submit'>
              <h2 className='text-xl font-bold mr-1 transition-all duration-300'> Calcular </h2>
              <motion.div animate={animateDumbbell}>
                <CgGym className=' bottom-4 text-2xl cursor-pointer transition-all duration-300 rotate-90'/>
              </motion.div>
            </button>

          </form>
        </section>

        <motion.section className='absolute flex flex-col items-center ml-[55px] mt-6 bg-grayGym rounded-2xl w-[170px] md:ml-0' animate={animateRms}>
          <h1 className={styleRms}> <span className='mr-2'> 1 RM: </span> {rm} Kgs </h1>
          <h1 className={styleRms}> <span className='mr-2'> 3 RM: </span> {restRms(3)} Kgs </h1>
          <h1 className={styleRms}> <span className='mr-2'> 5 RM: </span> {restRms(5)} Kgs </h1>
        </motion.section>
      </div>

    </motion.main>
  )
}