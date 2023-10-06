import { Calcular1RM } from "./Calcular1RM";
import { MedidasCorporales } from "./MedidasCorporales";

export function RecordsContainer(){
  
  return(
    <main className="h-screen w-[77%] ml-[1%]">
      
      <section className="flex">
        <div className=" ml-14 mt-14 w-[440px]">
          <Calcular1RM/>
        </div>

        <div className="ml-28 mt-14">
          <MedidasCorporales/>
        </div>
      </section>

    </main>
  )
}