import React, { useEffect } from 'react'
import AppRutines from './AppRutines.jsx'
import { Login } from './components/Login/Login.jsx'
import { SignUp } from './components/Login/SignUp.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppFood } from './AppFood.jsx'
import { ContextProvider } from './Context/Context.jsx'
import { AppRecords } from './AppRecords.jsx'
import { auth } from './firebase/firebase.js'
import { PrivateRoute } from './ProtectedRoutes.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

export function App(){

  const [autenticated, setAutenticated] = useState()

  useEffect(()=>{
    onAuthStateChanged(auth, userInfo)
  })

  function userInfo(user){
    setAutenticated(Boolean(user))
  }

  return(
    <ContextProvider>
      <BrowserRouter> 
      <Routes>
        <Route element={<PrivateRoute inAutenticated={autenticated}/>}>
          <Route path='/main/rutines' element={<AppRutines/>}/>
        </Route>
        <Route path='/main/food' element={<AppFood/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<SignUp/>}/>
        <Route path='/main/records' element={<AppRecords/>}/>
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  )
}