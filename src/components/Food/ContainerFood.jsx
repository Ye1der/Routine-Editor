import { Food } from "./Food";
import { SearchFood } from "./SearchFood";

export function ContainerFood(){

  return(
    <div className="relative h-screen w-[77%] ml-[1%] flex flex-col items-center">

      <SearchFood/>

      <section className=' h-[80%] w-full mt-10'>
        <Food/>
      </section>
    </div>
  )
}