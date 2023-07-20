import { useState } from "react"
import { peticiones, macrosPeticion } from "./Peticiones"

export function BuscarAlimentos(){

    const [busqueda, setBusqueda] = useState('')
    const [datos, setDatos] = useState([])
    const [nutrientes, setNutrientes] = useState({})

    // Hace la peticion de datos al pulsar enter en el inpit
    async function buscarIngredientes(event){
        const enter = event.key 
        if(enter === 'Enter'){
            try {
                const busquedaDatos = await peticiones(busqueda); 
                const datosJson = await busquedaDatos.json(); 
                setDatos(datosJson); 
              } catch (error) {
                console.error('Hubo un error al buscar los alimentos: ',error); 
              }
        }
    }

    // Busca el valor nutricional de los alimentos buscados
    async function valorNutricional(id){
        if(datos){
            try {
                const datosNutrientes = await macrosPeticion(id)
                const macrosJson = await datosNutrientes.json()
                setNutrientes(macrosJson)
                console.log(macrosJson);
            } catch (error) {
                console.log('hubo un error al tratar de acceder a los macros del alimento: ', error);
            }
        }
    }

    return <div className="mt-14 w-4/6 absolute left-1/4 flex flex-col items-center">
        
        <p className="text-white text-3xl text-opacity-75 font-bold text-center mb-14" > En este apartado puedes buscar alimentos o productos alimenticios para ver su valor nutricional </p>

        <input className="w-4/5 transition-all duration-200 outline-none bg-transparent p-3 border-2 focus:border-opacity-50 border-grayGym rounded-full focus:border-orangeGym text-white text-opacity-75 font-bold" 
        onChange={()=>{setBusqueda(event.target.value)}}
        onKeyDown={() => {buscarIngredientes(event)}}
        placeholder="Buscar aliementos o productos alimenticios" type="text" />
        
        <div className="h-[55vh] mt-8 overflow-auto w-4/5 flex flex-col items-center scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grayGym scrollbar-thumb-rounded-full">
            {datos.map(async function(alimento){
                await valorNutricional(alimento.id)
                const macros = nutrientes.nutrition.nutrients.filter(
                res => res.name == "Fat" || res.name == "Protein" || res.name == "Carbohydrates")

                return(
                    <div className="flex text-white text-opacity-50 font-bold mb-5 w-[85%] bg-grayGym bg-opacity-50 p-2 rounded-full">
                    <h1 className="ml-4" key={alimento.id}>{alimento.name}</h1>
                    <h1> {macros.map((protein)=>{if(protein.name == "Protein"){return(protein.amount)}})} </h1>
                    </div>
                )
        })}
        </div>
    </div>
}