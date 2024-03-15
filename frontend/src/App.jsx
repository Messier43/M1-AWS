import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from "./views/login";
import Register from './views/register';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      
    </Routes>
  )
}

export default App;