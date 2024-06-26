import { useContext } from "react";
import { Food } from "./Food";
import { SearchFood } from "./SearchFood";
import { contextGlobal } from "../../Context/Context";

export function ContainerFood(){

  return(
    <div className="relative h-screen w-full lg:w-[77%] lg:ml-[290px] flex flex-col items-center">

      <SearchFood/>

      <section className=' h-[80%] w-full mt-10'>
        <Food/>
      </section>
    </div>
  )
}