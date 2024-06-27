import { createContext, useState, useRef } from "react";
import { updateUser } from "../firebase/firebase";

export const contextGlobal = createContext();

export function ContextProvider({ children }) {
  // Rutines
  const [clickCrear, setClickCrear] = useState(false);
  const [clickCancelar, setClickCancelar] = useState(false);
  const [render, setRender] = useState(true);
  const [usuario, setUsuario] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null
  );
  const [activeEfect, setActiveEfect] = useState(false);
  const [renderTrash, setRenderTrash] = useState(false);
  const [clickTrash, setClickTrash] = useState(false);
  const [focus, setFocus] = useState(null);
  const [editar, setEditar] = useState(null);
  const [verRutina, setVerRutina] = useState(null);
  const [progreso, setProgreso] = useState(null);
  const [eliminar, setEliminar] = useState(false);
  const [papelera, setPapelera] = useState(false);
  const [reestablecer, setReestablecer] = useState(false);
  const [loading, setLoading] = useState(null);
  const [voidTrash, setVoidTrash] = useState(false);
  const [page, setPage] = useState("");
  const focusRefEliminar = useRef(null);
  const [fecha, setFecha] = useState(null);

  // Food
  const [searchFood, setSearchFood] = useState("");

  function ClickFunc() {
    if (render) {
      // Si el render esta en true se renderiza el boton de crear rutina sino el de cancelar
      setClickCrear(true); // Baja la escala del boton a cero
      setClickTrash(true);

      setTimeout(() => {
        //Renderiza el nuevo boton y le da una escala de 100
        setRender(false);
        setClickCancelar(true);
      }, 300);
    } else {
      // Hace lo mismo que arriba pero con el boton de cancelar

      setClickCancelar(false);

      setTimeout(() => {
        setRender(true);
        setClickCrear(false);
        setClickTrash(false);
      }, 300);
    }
  }

  async function eliminarRutina(index, arreglo) {
    const newArray = usuario[arreglo];
    await newArray.splice(index, 1);
    await updateUser({ ...usuario, [arreglo]: newArray });
    setFocus(null);

    setActiveEfect(!activeEfect);
    setEliminar(false);
    setLoading(null);
  }

  //const url = window.location.href

  // url.includes('rutines') && setPage('rutines')
  // url.includes('food') && setPage('food')

  return (
    <contextGlobal.Provider
      value={{
        render,
        setRender,
        clickCancelar,
        setClickCancelar,
        clickCrear,
        setClickCrear,
        usuario,
        setUsuario,
        ClickFunc,
        activeEfect,
        setActiveEfect,
        renderTrash,
        setRenderTrash,
        clickTrash,
        setClickTrash,
        focus,
        setFocus,
        editar,
        setEditar,
        verRutina,
        setVerRutina,
        eliminarRutina,
        eliminar,
        setEliminar,
        papelera,
        setPapelera,
        reestablecer,
        setReestablecer,
        loading,
        setLoading,
        voidTrash,
        setVoidTrash,
        focusRefEliminar,
        page,
        setPage,
        searchFood,
        setSearchFood,
        progreso,
        setProgreso,
      }}
    >
      {children}
    </contextGlobal.Provider>
  );
}
