import { ContextProvider } from "./Context/Context"
import { Navegacion } from "./components/Navegacion/Navegacion"
import { ContainerRutinas } from "./components/Rutinas/ContainerRutinas"

function AppRutines() {
  
  return (
      <main className="flex overflow-hidden" >
        <Navegacion/>
        <ContainerRutinas/>
      </main>
    
  ) 
}

export default AppRutines
