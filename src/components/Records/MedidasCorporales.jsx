import { motion } from "framer-motion"
import { useContext, useState} from "react"
import {BsArrowLeftShort} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
import {HiOutlineTrash} from 'react-icons/hi'
import {useForm} from 'react-hook-form'
import {RiCloseFill} from 'react-icons/ri'
import {BiCheck} from 'react-icons/bi'
import { contextGlobal } from "../../Context/Context"
import { updateUser } from "../../firebase/firebase"
import {FaBoxOpen} from 'react-icons/fa'
import {VscLoading} from 'react-icons/vsc'

export function MedidasCorporales(){

  const {usuario, setUsuario} = useContext(contextGlobal)

  const [swich, setSwich] = useState('list')
  const [indexMeasure, setIndexMeasure] = useState()
  const [loading, setLoading] = useState(false)

  const {handleSubmit, register, reset} = useForm()

  async function onSubmit(data){
    setLoading(true)

    const object = {
      nombre: data.nombre,
      actual: data.actual,
      objetivo: data.objetivo
    }

    if(swich === 'create'){
      await usuario.corporalMeasures.push(object)
      await updateUser(usuario)
    }

    if(swich === 'edit'){
      usuario.corporalMeasures[indexMeasure] = object
      await updateUser(usuario)
    }
    
    setSwich('list')
    setLoading(false)
    reset()
  }

  async function deleteMeasure(index){
    await usuario.corporalMeasures.splice(index, 1)
    await updateUser(usuario)
  }

  return (
    <motion.main initial={{scale: 0}} animate={{scale: 1}}>
      <h1 className='ml-12 text-xl text-white font-semibold mb-3'> Medidas Corporales </h1>

      <section className=" flex items-center justify-center">
        <div className="w-[280px] h-[180px] flex flex-col items-center justify-center bg-grayGym rounded-2xl mr-5 relative">
          
          { swich == 'list' &&         
            <motion.section initial={{scale: 0}} animate={{scale: 1}} className="relative h-[90%] w-[95%] rounded-2xl overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">

              {usuario == null &&
                <div className="h-full w-full grid place-content-center">
                  <motion.div initial={{rotate: 0}} animate={{rotate: 720}} transition={{duration: 1, ease: "linear", repeat: Infinity}}>
                    <VscLoading style={{strokeWidth: '1px'}} className="text-2xl text-opacity-50 text-white"/>
                  </motion.div>
                </div>
              }

              {usuario != null && usuario.corporalMeasures.length > 0 && usuario.corporalMeasures.map((obj, index)=>{
                return(
                  <button key={index} onClick={()=>{setSwich('show'); setIndexMeasure(index)}} className="hover:text-yellow-500 bg-black bg-opacity-30 text-center mx-2 h-10 rounded-xl w-[43%] my-2 cursor-pointer text-xl text-white text-opacity-70 font-semibold overflow-auto scrollbar-none transition-all duration-300">
                    <h1>{obj.nombre}</h1>
                  </button>
                )
              })}

              {usuario != null && usuario.corporalMeasures.length === 0 && 
                <div className="flex first-letter:items-center justify-center h-full w-full overflow-auto scrollbar-none">
                  <motion.div initial={{scale: 0}} animate={{scale: 1}} className="flex flex-col items-center justify-center">
                    <h1 className={`text-white font-bold text-xl text-opacity-30 transition-all`}> ¡Vacio! </h1>
                    <FaBoxOpen className="text-white text-opacity-30 text-[70px]"/>
                  </motion.div>
                </div>
              }

            </motion.section>
          }

          { swich == 'show' && 
            <motion.section initial={{scale: 0}} animate={{scale: 1}} className="relative w-full h-full pt-10">

              <BsArrowLeftShort onClick={()=>{setSwich('list')}} className="absolute top-2 left-2 text-white text-opacity-70 text-3xl cursor-pointer hover:text-opacity-100 hover:text-yellow-500 transition-all duration-300"/>
              <HiOutlineTrash onClick={()=>{setSwich('delete')}} className="absolute right-3 top-3 text-xl text-white text-opacity-70 hover:text-opacity-100 hover:text-yellow-500 transition-all duration-300 cursor-pointer"/> 
              <AiOutlineEdit onClick={()=>{setSwich('edit')}} className=" absolute right-10 top-3 text-xl text-white text-opacity-70 hover:text-opacity-100 hover:text-yellow-500 transition-all duration-300 cursor-pointer"/>

              <h1 className="text-2xl text-white text-opacity-80 font-bold text-center"> {usuario.corporalMeasures[indexMeasure].nombre} </h1>

              <div className="flex items-center justify-center">
                <h2 className="text-xl text-white text-opacity-80 font-bold mt-2 w-[50%] h-16 text-center border-r-2 border-white border-opacity-80"> Actual <br/> <span className="text-opacity-80 text-yellow-500 text-lg"> {usuario.corporalMeasures[indexMeasure].actual} Cm </span> </h2>
                <h2 className="text-xl text-white text-opacity-80 font-bold mt-2 w-[50%] h-16 text-center"> Objetivo <br/> <span className="text-opacity-80 text-yellow-500 text-lg"> {usuario.corporalMeasures[indexMeasure].objetivo} Cm </span>  </h2>
              </div>
            </motion.section>
          }

          { swich == 'edit' &&
            <motion.div initial={{scale: 0}} animate={{scale: 1}} className="h-full w-full rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>

                <RiCloseFill onClick={()=>{setSwich('show'); reset()}} className="absolute right-2 top-2 text-2xl text-white text-opacity-50 cursor-pointer hover:text-opacity-100 hover:rotate-90 transition-all duration-300"/>

                <input className="text-white text-xl font-bold bg-transparent ml-8 mb-1 mt-8 outline-none cursor-pointer focus:placeholder:text-opacity-70 placeholder:font-bold placeholder:text-white placeholder:text-opacity-40 placeholder:text-xl" defaultValue={usuario.corporalMeasures[indexMeasure].nombre}
                type="text" placeholder="Nombre" {...register('nombre', {required: true})} autoComplete="off"/>

                <div className=" mt-2 ml-8 ">
                  <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="actual"> Actual: </label>
                  <input className="numeric-input text-white absolute right-8 ml-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" defaultValue={usuario.corporalMeasures[indexMeasure].actual}
                  id="actual" type="number" placeholder="-" {...register('actual', {required: true})} autoComplete="off"/>
                </div>

                <div className="ml-8 mt-3">
                  <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="objetivo"> Objetivo: </label>
                  <input className="numeric-input text-white absolute right-8 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" defaultValue={usuario.corporalMeasures[indexMeasure].objetivo}
                  id="objetivo" type="number" placeholder="-" {...register('objetivo', {required: true})} autoComplete="off"/>
                </div>

              </form>
            </motion.div>
          }

          { swich == 'create' &&
            <motion.div initial={{scale: 0}} animate={{scale: 1}} className="h-full w-full rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>

                <RiCloseFill onClick={()=>{setSwich('list'); reset()}} className="absolute right-2 top-2 text-2xl text-white text-opacity-50 cursor-pointer hover:text-opacity-100 hover:rotate-90 transition-all duration-300"/>

                <input className="text-white text-xl font-bold bg-transparent ml-8 mb-1 mt-8 outline-none cursor-pointer focus:placeholder:text-opacity-70 placeholder:font-bold placeholder:text-white placeholder:text-opacity-40 placeholder:text-xl" type="text" placeholder="Nombre" {...register('nombre', {required: true})} autoComplete="off"/>

                <div className=" mt-2 ml-8 ">
                  <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="actual"> Actual: </label>
                  <input className="numeric-input text-white absolute right-8 ml-5 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="actual" type="number" placeholder="-" {...register('actual', {required: true})} autoComplete="off"/>
                </div>

                <div className="ml-8 mt-3">
                  <label className="text-white text-xl font-bold text-opacity-70 cursor-pointer" htmlFor="objetivo"> Objetivo: </label>
                  <input className="numeric-input text-white absolute right-8 bg-transparent text-center border-b-2 border-white border-opacity-20 w-[50px] font-bold placeholder:font-bold outline-none caret-transparent hover:border-opacity-100 focus:border-opacity-100 transition-all duration-300" id="objetivo" type="number" placeholder="-" {...register('objetivo', {required: true})} autoComplete="off"/>
                </div>

              </form>
            </motion.div>
          }

          { swich === 'delete' && 
            <motion.div initial={{scale: 0}} animate={{scale: 1}} className="h-full w-full rounded-2xl">

              <h1 className="text-lg text-white font-semibold text-opacity-70 text-center mt-5"> ¿ Deseas eliminar <br /> <span className="text-yellow-500 text-opacity-90"> permanentemente </span> ? </h1>

              <div className="text-center mt-6">
                <button onClick={()=>{setSwich('show')}} className="text-xl font-semibold text-white text-opacity-70 mx-5 hover:text-opacity-100 transition-all duration-300"> No </button>

                <button onClick={()=>{deleteMeasure(indexMeasure); setSwich('list')}} className="text-xl font-semibold text-white text-opacity-70 mx-5 hover:text-opacity-100 hover:text-yellow-500 transition-all duration-300">
                   Si 
                </button>
              </div>
            </motion.div>
          }
        </div>

        { swich != 'create' && swich != 'edit' && 
          <motion.div initial={{scale: 0}} animate={{scale: 1}}>
            <button onClick={()=>{setSwich('create')}} className="text-white text-opacity-50 w-12 h-12 rounded-xl text-4xl bg-grayGym hover:text-opacity-100 hover:rotate-90 hover:text-yellow-500 transition-all duration-300"> + </button>
          </motion.div>
        }

        { swich === 'edit' || swich === 'create' ? 
          <motion.div initial={{scale: 0}} animate={{scale: 1}}>

            <button onClick={handleSubmit(onSubmit)} className="text-white text-opacity-50 w-12 h-12 flex items-center justify-center rounded-xl text-3xl bg-grayGym hover:text-opacity-100 hover:text-yellow-500 transition-all duration-300"> 

              {!loading ? swich === 'create' ? <BiCheck/> : <AiOutlineEdit className="text-2xl"/> : 

                <motion.div initial={{rotate: 0}} animate={{rotate: 720}} transition={{duration: 1, ease: "linear", repeat: Infinity}}>
                  <VscLoading style={{strokeWidth: '1px'}} className="text-xl text-opacity-50 text-white"/>
                </motion.div>
              }
            </button>

          </motion.div>
          : ''
        }

      </section>
    </motion.main>
  )
}