import { cerrarSesion } from "../../firebase/firebase"
import { useNavigate } from "react-router"
import {BiLogOut} from 'react-icons/bi'

export function CerrarSesion(){

    const navigate = useNavigate()
    
    return (
        <button className="text-[0px] h-[35px] transition-all duration-300 flex justify-center items-center absolute top-4 left-4 font-bold p-2 rounded-full hover:text-base hover:gap-2 bg-red-500 bg-opacity-90 hover:bg-red-600"
        onClick={async function(){await cerrarSesion(); navigate("/login")}}> 
            <h1> Cerrar sesion </h1>
            <BiLogOut className="text-xl"/> 
        </button>
    )
}