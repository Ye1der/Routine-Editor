import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRutines from './AppRutines.jsx'
import { Login, } from './routes/Login.jsx'
import { LogOut } from './routes/LogOut.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppFood } from './AppFood.jsx'
import { ContextProvider } from './Context/Context.jsx'
import { AppRecords } from './AppRecords.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <ContextProvider>
      <BrowserRouter> 
      <Routes>
        <Route path='/main/rutines' element={<AppRutines/>}/>
        <Route path='/main/food' element={<AppFood/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<LogOut/>}/>
        <Route path='/main/records' element={<AppRecords/>}/>
      </Routes>
    </BrowserRouter>
    </ContextProvider>
)
