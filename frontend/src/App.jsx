import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from "./views/login";
import Register from './views/register';

import AjouterBenef from "./views/ajouterBenef";
import Beneficiaire from './views/beneficiaire';
import DetailBenef from "./views/detailBenef";
import ModifierBenef from "./views/modifierBenef";
import SupprimerBenef from "./views/supprimerBenef";
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/compte' element={<Compte />} /> */}

      <Route path='/beneficiaire' element={<Beneficiaire />} />
      <Route path='/ajouterBenef' element={<AjouterBenef />} />
      <Route path='/detailBenef/:id' element={<DetailBenef />} />
      <Route path='/modifierBenef/:id' element={<ModifierBenef />} />
      <Route path='/supprimerBenef/:id' element={<SupprimerBenef />} />
      
    </Routes>
  )
}

export default App;