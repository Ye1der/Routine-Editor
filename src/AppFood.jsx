import { ContainerFood } from "./components/Food/ContainerFood"
import { SearchFood } from "./components/Food/SearchFood"
import { Navegacion } from "./components/Navegacion/Navegacion"

export function AppFood(){

  return(
    <div className="flex overflow-hidden">
      <Navegacion/>
      <ContainerFood/>
    </div>
  )
}