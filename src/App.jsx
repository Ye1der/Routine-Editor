import { ContextProvider } from "./Context/Context"
import { CerrarSesion } from "./components/cerrarSesion"
import { Navegacion } from "./components/Navegacion"
import { ContainerRutinas } from "./components/ContainerRutinas"

function App() {
  
  return (
    <ContextProvider>
      <main className="flex" >
        <CerrarSesion/>
        <Navegacion/>
        <ContainerRutinas/>
      </main>
    </ContextProvider>
  ) 
}

export default App
