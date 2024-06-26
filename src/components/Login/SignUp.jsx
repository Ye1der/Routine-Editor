import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { HiLockOpen } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router";
import { createUser, userExist } from "../../firebase/firebase";
import { motion } from "framer-motion";
import { VscLoading } from "react-icons/vsc";

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(".");
  const [contraseña1, setContraseña1] = useState(".");
  const [contraseña2, setContraseña2] = useState("..");
  const [createAccount, setCreateAccount] = useState();

  // 1: Contraseñas no coinciden, 2: Éxito al crear la cuenta
  // 3: Correo no valido, 4: Correo ya existente
  // 5: Contraseña muy corta
  const [validador, setValidador] = useState(0);

  async function agregarUsuario() {
    setCreateAccount(true);

    if (contraseña1.length > 6) {
      if (contraseña1 === contraseña2) {
        setValidador(0);

        const usrExist = await userExist(email);

        if (usrExist) {
          setValidador(4);
        } else {
          const res = await createUser(email, contraseña1);
          res ? setValidador(2) : setValidador(3);
        }
      } else {
        setValidador(1);
      }
    } else {
      setValidador(5);
    }

    setCreateAccount(false);
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center ">
      <motion.div
        className="bg-grayGym bg-opacity-50 w-96 rounded-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: window.innerWidth < 640 ? 0.9 : 1 }}
      >
        <div className="flex justify-end items-center">
          <h1
            className="hover:text-opacity-90 text-center text-white text-lg text-opacity-75 font-bold my-3 mx-8 cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Iniciar sesión
          </h1>
        </div>
        <h1 className="text-white text-4xl text-opacity-80 mt-6 ml-8 font-bold">
          {" "}
          Crear cuenta{" "}
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
            onChange={() => {
              setEmail(event.target.value);
            }}
            autoComplete="off"
            type="text"
            placeholder="Digite la dirección de correo"
            id="Email"
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
            onChange={() => {
              setContraseña1(event.target.value);
            }}
            type="password"
            placeholder="Contraseña"
            id="contraseña"
          />
        </div>

        <div className="w-full mt-8">
          <label
            className="text-white font-bold text-lg text-opacity-90 ml-8 cursor-text flex"
            htmlFor="contraseña2"
          >
            {" "}
            <HiLockClosed className="relative top-1 mr-1" /> Contraseña{" "}
          </label>
          <input
            className=" text-white text-opacity-75 w-4/5 outline-none bg-transparent border-b-white h-8 ml-8 border-b-2 border-white border-opacity-50 transition-all duration-200 placeholder:opacity-40 caret-white cursor-text focus:border-opacity-90"
            onChange={() => {
              setContraseña2(event.target.value);
            }}
            type="password"
            placeholder="Contraseña"
            id="contraseña2"
          />
        </div>

        {!createAccount ? (
          <div className="flex justify-center items-center">
            <button
              className="mt-8 mb-6 bg-white bg-opacity-70 w-28 h-8 rounded-lg transition-all duration-200 hover:bg-opacity-90 "
              onClick={agregarUsuario}
            >
              {" "}
              Crear cuenta{" "}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-8 mt-8 mb-6">
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
      </motion.div>

      {validador === 1 ? (
        <h1 className="text-red-500 text-opacity-90 text-center font-bold mt-3">
          {" "}
          Las contraseñas no coinciden{" "}
        </h1>
      ) : (
        ""
      )}

      {validador === 3 ? (
        <h1 className="text-red-500 text-opacity-90 text-center font-bold mt-3">
          {" "}
          Dirección de correo electrónico no valida{" "}
        </h1>
      ) : (
        ""
      )}

      {validador === 5 ? (
        <h1 className="text-red-500 text-opacity-90 text-center font-bold mt-3">
          {" "}
          La contraseña debe tener mas de 6 caracteres{" "}
        </h1>
      ) : (
        ""
      )}

      {validador === 2 ? (
        <h1 className="font-bold text-green-300 text-center mt-3">
          {" "}
          La cuenta a sido creada con éxito <br /> ahora puede
          <a
            onClick={() => {
              navigate("/login");
            }}
            className="cursor-pointer text-emerald-400 hover:text-emerald-500 duration-300"
          >
            {" "}
            iniciar sesión{" "}
          </a>
        </h1>
      ) : (
        ""
      )}

      {validador === 4 ? (
        <h1 className="text-red-500 text-opacity-90 text-center font-bold mt-3">
          {" "}
          Esta dirección de correo electrónico ya existe,
          <br />{" "}
          <a
            onClick={() => {
              navigate("/login");
            }}
            className="cursor-pointer text-red-400 hover:text-red-300 duration-300"
          >
            {" "}
            inicie sesión{" "}
          </a>{" "}
          o use otro correo
        </h1>
      ) : (
        ""
      )}
    </main>
  );
}
