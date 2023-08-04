import { CrearRutina } from "./CrearRutina"
import { BotonCyC } from "./BotonCyC"
import { useContext, useEffect, useRef, useState } from "react"
import { contextGlobal } from "../Context/Context"
import {returnData, auth, updateUser } from "../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { AnimatePresence, motion } from 'framer-motion'
import { Rutinas } from "./Rutinas"
import { ButtonTrash } from "./ButtonTrash"
import { RutinesTrash } from "./RutinesTrash"
import { EditarRutina } from "./EditarRutina"
import { VerRutina } from "./VerRutina"
import {FaBoxOpen} from 'react-icons/fa'


export function ContainerRutinas(){

  const {render, clickCancelar, clickCrear, usuario, setUsuario, activeEfect, renderTrash, editar, verRutina, setEditar, setVerRutina, setFocus} = useContext(contextGlobal)

  useEffect(()=>{
    onAuthStateChanged(auth, userInfo)

    setFocus(null)
  }, [render, activeEfect])

  async function userInfo(user){
    const data = await returnData(user.email)
    setUsuario(data)
  }

  const variantes = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 200
    },
    visible: {
      opacity: 1,
      scale: 1, 
      y:0
    }
  }


  if(usuario == null && render == true ){ //Tiempo de carga en lo que se obtiene los datos de firebase del usuario
    return(
      <div className={`${ clickCrear ? 'scale-0 opacity-0' : 'scale-100 opacity-100' } h-screen w-[73%] ml-[3%] flex flex-col items-center transition-all duration-300 `}>
        <section className=' h-[80%] mt-10 flex flex-wrap overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full items-center justify-center'>
         <h1 className="text-white font-bold text-2xl text-opacity-70 mb-[30%]"> Cargando... </h1>
        </section>
      </div>
    )
  }


  if(usuario.rutines.length === 0 && render == true && renderTrash === false){ //Comprueba si el arreglo de rutinas tiene alguna
    return(
        <div className={`relative h-screen w-[73%] ml-[3%] flex flex-col items-center transition-all duration-300`}>
        <BotonCyC></BotonCyC>
        <ButtonTrash/>

            <section className=' h-[80%] mt-10 flex flex-wrap scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full items-center justify-center'>
              {!clickCrear && 
                <motion.div className={`${clickCrear ? 'opacity-100' : 'opacity-0'} flex-col items-center justify-center text-center `}
                initial='hidden' animate='visible' exit='hidden' variants={variantes}>
                    <h1  className={`text-white font-bold text-2xl text-opacity-30 transition-all`}> ¡Vacio! </h1>
                    <FaBoxOpen className="text-white text-opacity-30 text-[150px] mb-[50%]"></FaBoxOpen>
                </motion.div>
              }
            </section>
      </div>
    )
  }


  if(render === true && usuario != null && renderTrash === false){ //Renderiza las rutinas que se hallan en el array de rutinas, si las hay
    return (
      <div className="relative h-screen w-[73%] ml-[3%] flex flex-col items-center">
        <BotonCyC></BotonCyC>
        <ButtonTrash></ButtonTrash>
        <Rutinas></Rutinas>

        {editar != null && <EditarRutina/> }
        {verRutina != null && <VerRutina/>}

      </div>
    )
  }

  if(renderTrash === true && usuario != null && render === true && usuario.rutinesTrash.length < 1){
    return(
      <div className={`relative h-screen w-[73%] ml-[3%] flex flex-col items-center transition-all duration-300`}>
      <BotonCyC></BotonCyC>
      <ButtonTrash/>

          <section className=' h-[80%] mt-10 flex flex-wrap scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full items-center justify-center'>
              <motion.div className={`${clickCrear ? 'opacity-100' : 'opacity-0'} flex-col items-center justify-center text-center mt-[50%]`}
              initial='hidden' animate='visible' exit='hidden' variants={variantes}>
                  <h1  className={`text-white font-bold text-2xl text-opacity-30 transition-all`}> ¡Vacio! </h1>
                  <FaBoxOpen className="text-white text-opacity-30 text-[150px]"></FaBoxOpen>
              </motion.div>
          </section>
    </div>
  )
  }

  if (renderTrash === true && usuario != null && render === true && usuario.rutinesTrash.length > 0) {
    
    return (
      <div className="relative h-screen w-[73%] ml-[3%] flex flex-col items-center">
        <BotonCyC></BotonCyC>
        <ButtonTrash></ButtonTrash>
        <RutinesTrash></RutinesTrash>
      </div>
    )
  }
  
  if(!render){ //Renderiza el formulario de crear rutina si el render esta en false 
    return (
      <div className="relative h-screen w-[73%] ml-[3%] flex flex-col items-center">
        <BotonCyC></BotonCyC>
        <ButtonTrash></ButtonTrash>

        <section className=' h-[80%] mt-10 flex flex-wrap overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full'>
          <div className={` ${ clickCancelar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-96' } transition-all duration-300 flex justify-center h-full w-full`}>
            <CrearRutina/>
          </div>
        </section>
      </div>
    )   
  }
}