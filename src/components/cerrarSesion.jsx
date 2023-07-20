import { cerrarSesion } from "../firebase/firebase"
import { useNavigate } from "react-router"
import {BiLogOut} from 'react-icons/bi'

export function CerrarSesion(){

    const navigate = useNavigate()
    
    return (
        <button className="transition-all duration-200 absolute top-5 right-5 font-bold p-2 pr-3 rounded-full bg-red-500 bg-opacity-90 hover:bg-red-400"
        onClick={async function(){await cerrarSesion(); navigate("/login")}}> 
        <BiLogOut/> </button>
    )
}