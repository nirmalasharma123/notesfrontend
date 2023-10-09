import { useState } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';

import './App.css'

function App() {

  return (
    <div >
    < BrowserRouter >
     <Routes> 
      
            <Route path="/Home" element={<Home/>}/>
            <Route path="/" element={<SignUp/>}/>
            <Route path="/Login" element={<Login/>}/>

     </Routes>
   
      
    </BrowserRouter>
    </div>
  )
}

export default App
