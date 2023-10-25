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
    <main className="h-screen w-full lg:w-[77%] lg:ml-[290px] flex flex-col items-center md:items-baseline overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full">
      
      <div className="flex flex-col items-center md:flex-row">
        
        <div className="mt-24 md:mt-14">
          <MedidasCorporales/>
        </div>

        <div className="mt-16 md:ml-16 lg:ml-20 md:mt-14">
          <ExercisesObjetive/>
        </div>
      </div>
      
      <div className="mr-[68px] mt-16 sm:ml-7 lg:md-14 md:mt-16 md:mr-0">
        <Calcular1RM/>
      </div>

    </main>
  )
}