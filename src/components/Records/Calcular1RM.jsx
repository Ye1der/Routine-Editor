import {GiBiceps} from 'react-icons/gi'
import {CgGym} from 'react-icons/cg'
import { motion, useAnimation } from 'framer-motion'
import {useForm} from 'react-hook-form'
import { useState } from 'react'

export function Calcular1RM(){

  const {register, formState: {errors},handleSubmit} = useForm()
  const [rm, setRm] = useState('')
  const animateDumbbell = useAnimation()

  async function onSubmit(data){
    await animateDumbbell.start({rotate: 360})
    setRm(Math.round(data.kgs / (1.0278 - 0.0278 * data.reps)))
    animateDumbbell.set({rotate: 0})
  }

  function restRms(reps){
    return Math.round((rm / (1.0278 + (0.0278 * reps))))
  }

  return (
    <main className='flex flex-col items-center justify-center relative'> 

      <h1 className='text-xl text-white font-semibold mb-3'> Calcular RMs </h1>

      <section className="flex flex-col bg-grayGym rounded-2xl relative w-[238px]">
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className=" mt-4 ml-5 ">
            <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="repeticiones"> Repeticiones: </label>
            <input className="text-white absolute right-5 ml-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="repeticiones" type="text" placeholder="-" {...register('reps', {required: true})}/>
          </div>

          <div className="ml-5 mt-3">
            <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="peso"> Peso / Kgs: </label>
            <input className="text-white absolute right-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="peso" type="text" placeholder="-" {...register('kgs', {required: true})}/>
          </div>

          <hr className="w-[90%] mx-auto mt-5 border-[1px] opacity-70" />

          <button className='flex items-center justify-center mx-auto text-white text-opacity-60 hover:text-opacity-100' type='submit'>
            <h2 className='text-xl font-bold mr-1 transition-all duration-300'> Calcular </h2>
            <motion.div animate={animateDumbbell}>
              <CgGym className='my-4 bottom-4 text-2xl cursor-pointer transition-all duration-300 rotate-90'/>
            </motion.div>
          </button>

        </form>
      </section>

      <section className='w-[100%]'>
        <h1 className='text-white font-bold text-lg text-opacity-70 '> <span> 1 RM: </span> {rm} Kgs </h1>
        <h1 className='text-white font-bold text-lg text-opacity-70 '> <span> 3 RM: </span> {restRms(3)} Kgs </h1>
        <h1 className='text-white font-bold text-lg text-opacity-70 '> <span> 5 RM: </span> {restRms(5)} Kgs </h1>
        <h1 className='text-white font-bold text-lg text-opacity-70 '> <span> 8 RM: </span> {restRms(8)} Kgs </h1>
        <h1 className='text-white font-bold text-lg text-opacity-70 '> <span> 10 RM: </span> {restRms(10)} Kgs </h1>
        <h1 className='text-white font-bold text-lg text-opacity-70 '> <span> 12 RM: </span> {restRms(12)} Kgs </h1>
      </section>
    </main>
  )
}