import { Calcular1RM } from "./Calcular1RM";
import { MedidasCorporales } from "./MedidasCorporales";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { returnData } from "../../firebase/firebase";
import { useContext, useEffect } from "react";
import { contextGlobal } from "../../Context/Context";
import { ExercisesObjetive } from "./ExercisesObjetive";

export function RecordsContainer() {
  const { setUsuario } = useContext(contextGlobal);

  useEffect(() => {
    async function userInfo(user) {
      const data = await returnData(user ? user.email : "email");
      await setUsuario(data);
    }

    onAuthStateChanged(auth, userInfo);
  }, []);

  return (
    <main className="h-screen gap-14 w-full lg:w-[77%] lg:ml-[290px] flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full">
      <div className="">
        <MedidasCorporales />
      </div>

      <div className="">
        <ExercisesObjetive />
      </div>
    </main>
  );
}
