import { Navegacion } from "./components/Navegacion/Navegacion"
import { RecordsContainer } from "./components/Records/RecordsContainer"

export function AppRecords(){

  return (
    <main className="flex overflow-hidden" >
      <Navegacion/>
      <RecordsContainer/>
    </main>
  )
}