import React, { useState } from "react";
export const Context = React.createContext({})

export default function ContextProvider({children}){
    const [datos, setDatos] = useState('Hola');

    return [
        <Context.Provider value={{datos, setDatos}}>
            {children}
        </Context.Provider>
    ]
}