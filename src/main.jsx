import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Login, } from './routes/Login.jsx'
import { LogOut } from './routes/LogOut.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter> 
      <Routes>
        <Route path='/main' element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<LogOut/>}/>
      </Routes>
    </BrowserRouter>
)
