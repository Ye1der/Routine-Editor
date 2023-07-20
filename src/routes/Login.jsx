
import {BsFillPersonFill} from 'react-icons/bs'
import {HiLockOpen} from 'react-icons/hi'
import {BsGoogle} from 'react-icons/bs'
import {FaFacebook} from 'react-icons/fa'
import { useEffect, useState } from 'react'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { addUser, auth, existDbUser, userExist, iniciarSesion } from "../firebase/firebase"
import { useNavigate } from "react-router";

export function Login(){

    const navigate = useNavigate()

    //Valor de los inputs de inicio de secion
    const [email, setEmail] = useState("")
    const [contraseña, setContraseña] = useState("")

    // Verificador de usuario valido
    const [invalidUser, setInvalidUser] = useState(0);

    //Inicio de sesion con google 
    async function loginGoogle(){
        async function signInGoogle(googleProvider){
            try {
                const res = await signInWithPopup(auth, googleProvider);
            } catch (error) {
                console.error(error)
            }
        } 

        const googleProvider = new GoogleAuthProvider();
        await signInGoogle(googleProvider)
    }

    // Verifica el susario cuando hay algun cambio en la aunteticacion
    useEffect(()=>{
        onAuthStateChanged(auth, verificador)
    },[])

    // Revisa si el inicio de sesion es valido y registra el usuario
    async function verificador(user){
        if(user){
            const userExist = await exisDbtUser(user.uid)

        if(userExist){
            navigate("/main")
        } else {
            await addUser({
                uid: user.uid,
                name: user.displayName,
                cardsUser: []
            })

            navigate("/main")
        }
        }
    }

    // Inicia sesion con una cuenta creada
    async function verificadorLocal(){
        const existAcount = await userExist(email)
        
        if(existAcount){
            const res = iniciarSesion(email, contraseña)

            if(res){
                navigate("/main")
            } else {
                setInvalidUser(1)
            }

        } else {

            setInvalidUser(1)
        }
    }
    
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center" >
            <div className="bg-grayGym bg-opacity-50 w-96 h-4/5 rounded-3xl" >
                <div className='flex justify-end items-center'>
                    <h1 className=' hover:text-opacity-90 text-center text-white text-lg text-opacity-75 font-bold my-3 mx-8 cursor-pointer' onClick={()=>{navigate("/logout")}} >Crear cuenta</h1>
                </div>

                <h1 className="text-white text-4xl mt-6 ml-8 font-bold" > Iniciar sesion </h1>
                
                <div className="w-full mt-8" >
                    <label className="text-white font-bold text-lg text-opacity-90 ml-8 cursor-text flex" 
                    htmlFor="Email"> <BsFillPersonFill className='relative top-1 mr-1' /> Email </label>
                    <input className="text-white text-opacity-75 w-4/5 outline-none bg-transparent border-b-white h-8 ml-8 border-b-2 border-white border-opacity-50 transition-all duration-200 placeholder:opacity-40 caret-white cursor-text focus:border-opacity-90" 
                    onChange={function(){setEmail(event.target.value)}}
                    type="text" placeholder="Digite la direccion de correo" id="Email" autoComplete='off'/>
                </div>

                <div className='w-full mt-8' >
                    <label className="text-white font-bold text-lg text-opacity-90 ml-8 cursor-text flex" 
                    htmlFor="contraseña"> <HiLockOpen className='relative top-1 mr-1'/>  Contraseña </label>
                    <input className=" text-white text-opacity-75 w-4/5 outline-none bg-transparent border-b-white h-8 ml-8 border-b-2 border-white border-opacity-50 transition-all duration-200 placeholder:opacity-40 caret-white cursor-text focus:border-opacity-90"  
                    onChange={function(){setContraseña(event.target.value)}}
                    type="password" placeholder="Contraseña" id='contraseña'/>
                </div>

                <button className='mt-6 bg-white bg-opacity-70 w-28 h-8 rounded-lg mx-32 transition-all duration-200 hover:bg-opacity-90 ' onClick={verificadorLocal}> Iniciar sesion </button>

                <div className='cursor-pointer flex items-center justify-center bg-red-500 bg-opacity-75 mx-14 mt-6 p-2 rounded-xl hover:bg-opacity-90 transition-all duration-200z' onClick={loginGoogle}> 
                <BsGoogle className='mr-2'/> 
                <h1 className='font-bold'>Iniciar sesion con Gooogle</h1>
                </div>

                <div className='cursor-pointer flex items-center justify-center bg-blue-500 bg-opacity-75 mx-14 mt-3 p-2 rounded-xl hover:bg-opacity-90 transition-all duration-200z'> 
                <FaFacebook className='mr-2'/> 
                <h1 className='font-bold'>Iniciar sesion con Facebook</h1>
                </div>
            </div>

            {invalidUser === 1 ? <h1 className='text-red-500 text-opacity-90 text-center font-bold mt-3' >Correo y/o contraseña incorrectos</h1> : ""}
        </main>
    )
}