import ContextProvider from "./Context/Context"
import { CerrarSesion } from "./components/cerrarSesion"
import { Navegacion } from "./components/Navegacion"
import { Rutinas } from "./components/Rutinas"

function App() {
  
  return (
  <ContextProvider>
    <main className="flex" >
      <CerrarSesion/>
      <Navegacion/>
      <Rutinas/>
    </main>
  </ContextProvider>
  ) 
}

export default App
