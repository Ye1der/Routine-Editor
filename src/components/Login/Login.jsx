import { HiLockOpen } from "react-icons/hi";
import { BsGoogle, BsFillPersonFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  addUser,
  auth,
  existDbUser,
  userExist,
  iniciarSesion as iniciarSesión,
} from "../../firebase/firebase";
import { useNavigate } from "react-router";

import { motion, useAnimation } from "framer-motion";
import { VscLoading } from "react-icons/vsc";

export function Login() {
  window.history.replaceState(null, null, window.location.pathname);

  const navigate = useNavigate();

  //Valor de los inputs de inicio de sesión
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Verificador de usuario valido
  const [invalidUser, setInvalidUser] = useState(0);

  const [scale, setScale] = useState(0.9);
  const [login, setLogin] = useState(false);

  //Inicio de sesión con google
  async function loginGoogle() {
    async function signInGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    }

    const googleProvider = new GoogleAuthProvider();
    await signInGoogle(googleProvider);
  }

  // Verifica el usuario cuando hay algún cambio en la autenticación
  useEffect(() => {
    onAuthStateChanged(auth, verificador);
  }, []);

  // Revisa si el inicio de sesión es valido y registra el usuario
  async function verificador(user) {
    if (user) {
      const userExist = await existDbUser(user.email);

      if (userExist) {
        navigate("/main/rutines");
      } else {
        const object = {
          email: user.email,
          name: user.displayName,
          rutines: [],
          rutinesTrash: [],
          corporalMeasures: [],
          objectiveExercises: [],
        };

        await addUser(object);

        navigate("/main/rutines");
      }
    }
  }

  // Inicia sesión con una cuenta creada
  async function verificadorLocal() {
    setLogin(true);
    const existAccount = await userExist(email);

    if (existAccount) {
      const res = await iniciarSesión(email, contraseña);

      if (res) {
        navigate("/main");
      } else {
        setInvalidUser(1);
      }
    } else {
      setInvalidUser(1);
    }
    setLogin(false);
  }

  async function continueGuest() {
    localStorage.setItem("guest", "true");
    if (!localStorage.getItem("data")) {
      localStorage.setItem(
        "data",
        '{"rutines": [], "rutinesTrash": [], "objectiveExercises": [], "corporalMeasures": [], "name": "anonimo", "email": "anonimo"}'
      );
    }
    navigate("/main/rutines");
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center overflow-auto scrollbar-none">
      <motion.div
        className={`bg-grayGym bg-opacity-50 w-96 rounded-3xl `}
        initial={{ scale: 0 }}
        animate={{ scale: window.innerWidth < 640 ? 0.9 : 1 }}
      >
        <div className="flex justify-end items-center">
          <h1
            className=" hover:text-opacity-90 text-center text-white text-lg text-opacity-75 font-bold my-3 mx-8 cursor-pointer"
            onClick={() => {
              navigate("/logout");
            }}
          >
            Crear cuenta
          </h1>
        </div>

        <h1 className="text-white text-4xl mt-6 ml-8 font-bold">
          {" "}
          Iniciar sesión{" "}
        </h1>

        <div className="w-full mt-8">
          <label
            className="text-white font-bold text-lg text-opacity-90 ml-8 cursor-text flex"
            htmlFor="Email"
          >
            {" "}
            <BsFillPersonFill className="relative top-1 mr-1" /> Email{" "}
          </label>
          <input
            className="text-white text-opacity-75 w-4/5 outline-none bg-transparent border-b-white h-8 ml-8 border-b-2 border-white border-opacity-50 transition-all duration-200 placeholder:opacity-40 caret-white cursor-text focus:border-opacity-90"
            onChange={function () {
              setEmail(event.target.value);
            }}
            type="text"
            placeholder="Digite la dirección de correo"
            id="Email"
            autoComplete="off"
          />
        </div>

        <div className="w-full mt-8">
          <label
            className="text-white font-bold text-lg text-opacity-90 ml-8 cursor-text flex"
            htmlFor="contraseña"
          >
            {" "}
            <HiLockOpen className="relative top-1 mr-1" /> Contraseña{" "}
          </label>
          <input
            className=" text-white text-opacity-75 w-4/5 outline-none bg-transparent border-b-white h-8 ml-8 border-b-2 border-white border-opacity-50 transition-all duration-200 placeholder:opacity-40 caret-white cursor-text focus:border-opacity-90"
            onChange={function () {
              setContraseña(event.target.value);
            }}
            type="password"
            placeholder="Contraseña"
            id="contraseña"
          />
        </div>

        {!login ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center"
          >
            <button
              className="mt-8 bg-white font-semibold bg-opacity-70 px-4 py-[7px] rounded-2xl transition-color duration-200 hover:bg-opacity-90 "
              onClick={verificadorLocal}
            >
              {" "}
              Iniciar sesión{" "}
            </button>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-8 mt-8">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 720 }}
              transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            >
              <VscLoading
                style={{ strokeWidth: "0.7px" }}
                className="text-2xl text-white"
              />
            </motion.div>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full items-center justify-center mt-8 mb-6">
          <hr className="border border-white/5 w-full mb-2 -mt-1" />

          <div
            className="cursor-pointer w-[70%] flex gap-3 items-center justify-center bg-red-500 bg-opacity-75 py-2 px-4 rounded-2xl hover:bg-opacity-90 transition-all duration-200"
            onClick={loginGoogle}
          >
            <BsGoogle />
            <h1 className="font-semibold"> Iniciar sesión con Google </h1>
          </div>

          <div
            className="w-[70%] cursor-pointer flex gap-3 items-center justify-center bg-[#a6a5ff] text-black bg-opacity-75 py-2 px-4 rounded-2xl hover:bg-opacity-90 transition-all duration-200"
            onClick={continueGuest}
          >
            <BsFillPersonFill size={20} />
            <h1 className="font-semibold"> Continuar como invitado </h1>
          </div>
        </div>
      </motion.div>

      {invalidUser === 1 ? (
        <h1 className="text-red-500 text-opacity-90 text-center font-bold mt-3">
          Correo y/o contraseña incorrectos
        </h1>
      ) : (
        ""
      )}
    </main>
  );
}
