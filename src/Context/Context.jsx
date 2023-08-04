
import { createContext, useState } from "react";
import { updateUser } from "../firebase/firebase";

export const contextGlobal = createContext()

export function ContextProvider({children}){

    const [clickCrear, setClickCrear] = useState(false);
    const [clickCancelar, setClickCancelar] = useState(false)
    const [render, setRender] = useState(true);
    const [usuario, setUsuario] = useState(null)
    const [activeEfect, setActiveEfect] = useState(false)
    const [renderTrash, setRenderTrash] = useState(false)
    const [clickTrash, setClickTrash] = useState(false)
    const [focus, setFocus] = useState(null)
    const [editar, setEditar] = useState(null)
    const [verRutina, setVerRutina] = useState(null)

    function ClickFunc(){

        if(render){  // Si el render esta en true se renderiza el boton de crear rutina sino el de cancelar
            setClickCrear(true)// Baja la escala del boton a cero
            setClickTrash(true)

            setTimeout(()=>{ //Renderiza el nuevo boton y le da una escala de 100
            setRender(false)
            setClickCancelar(true)
            }, 300)

        } else {  // Hace lo mismo que arriba pero con el boton de cancelar

            setClickCancelar(false)

            setTimeout(()=>{
            setRender(true)
            setClickCrear(false)
            setClickTrash(false)
            }, 300)
        }
    }

    async function eliminarRutina(index, arreglo){
        const newArray = usuario[arreglo]
        await newArray.splice(index, 1)
        await updateUser({...usuario, [arreglo]: newArray})
        activeEfect ? setActiveEfect(false) : setActiveEfect(true)
    }

    return (
        <contextGlobal.Provider 
        value={{render, setRender, 
        clickCancelar, setClickCancelar, 
        clickCrear, setClickCrear, 
        usuario, setUsuario,
        ClickFunc, 
        activeEfect,setActiveEfect, 
        renderTrash,setRenderTrash,
        clickTrash, setClickTrash,
        focus, setFocus,
        editar, setEditar, 
        verRutina, setVerRutina,
        eliminarRutina}}>

            {children}
            
        </contextGlobal.Provider>
    )
}

