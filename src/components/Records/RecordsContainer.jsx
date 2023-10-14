import { Calcular1RM } from "./Calcular1RM";
import { MedidasCorporales } from "./MedidasCorporales";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { returnData } from "../../firebase/firebase"
import { useContext, useEffect } from "react";
import { contextGlobal } from "../../Context/Context";
import { ExercisesObjetive } from "./ExercisesObjetive";

export function RecordsContainer(){

  const {setUsuario} = useContext(contextGlobal)

  useEffect(()=>{
    onAuthStateChanged(auth, userInfo)
  }, [])

  async function userInfo(user){
    const data = await returnData(user.email)
    await setUsuario(data)
  }
  
  return(
    <main className="h-screen w-[77%] ml-[1%]">
      
      <section className="flex">
        <div className=" ml-14 mt-14 w-[400px]">
          <Calcular1RM/>
        </div>

        <div className="ml-28 mt-14">
          <MedidasCorporales/>
        </div>
      </section>

      <section className=" ml-14 mt-24">
        <ExercisesObjetive/>
      </section>

    </main>
  )
}