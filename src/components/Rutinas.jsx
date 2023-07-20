import { CrearRutina } from "./CrearRutina"
import { BotonCyC } from "./BotonCyC"

export function Rutinas(){

  return (
    <div className="h-screen w-[73%] ml-[3%] flex flex-col items-center">

      <BotonCyC></BotonCyC>

      <section className=' h-[80%] mt-10 flex flex-wrap overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full'>
        <div className='bg-grayGym w-[200px] h-[250px] rounded-3xl m-5'> 
        </div>
      </section>

    </div>
  )
}