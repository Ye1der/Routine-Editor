import React, { useEffect } from 'react'
import AppRutines from './AppRutines.jsx'
import { Login } from './components/Login/Login.jsx'
import { SignUp } from './components/Login/SignUp.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppFood } from './AppFood.jsx'
import { ContextProvider } from './Context/Context.jsx'
import { AppRecords } from './AppRecords.jsx'
import { auth, isAuth } from './firebase/firebase.js'
import { PrivateRoute } from './ProtectedRoutes.jsx'
import { useState } from 'react'
import { LandingPage } from './LandingPage.jsx'
import { onAuthStateChanged } from 'firebase/auth'

export function App(){

  const [autenticated, setAutenticated] = useState()

  useEffect(()=>{
    onAuthStateChanged(auth, validated)
  })

  function validated(user){
    if(user){
      setAutenticated(true)
    } else {
      setAutenticated(false)
    }
  }

  return(
    <ContextProvider>
      <BrowserRouter> 
      <Routes>

        <Route element={<PrivateRoute inAutenticated={autenticated}/>}>
          <Route path='/main/rutines' element={<AppRutines/>}/>
        </Route>

        <Route element={<PrivateRoute inAutenticated={autenticated}/>}>
          <Route path='/main/food' element={<AppFood/>}/>
        </Route>

        <Route element={<PrivateRoute inAutenticated={autenticated}/>}>
          <Route path='/main/records' element={<AppRecords/>}/>
        </Route>

        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<SignUp/>}/>
        <Route path='/' element={<LandingPage/>}/>

      </Routes>
    </BrowserRouter>
    </ContextProvider>
  )
}