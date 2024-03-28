import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from "./views/auth/login";
import Register from './views/auth/register';

import AjouterBenef from "./views/beneficiaire/ajouterBenef";
import Beneficiaire from './views/beneficiaire/beneficiaire';
import DetailBenef from "./views/beneficiaire/detailBenef";
import ModifierBenef from "./views/beneficiaire/modifierBenef";
import SupprimerBenef from "./views/beneficiaire/supprimerBenef";

import AjouterVirement from "./views/virement/ajouterVirement";
import DetailVirement from "./views/virement/detailVirement";
import Virement from "./views/virement/virement";

import AjouterSolde from "./views/solde/ajouterSolde";
import Solde from "./views/solde/solde";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/beneficiaire' element={<Beneficiaire />} />
      <Route path='/ajouterBenef' element={<AjouterBenef />} />
      <Route path='/detailBenef/:id' element={<DetailBenef />} />
      <Route path='/modifierBenef/:id' element={<ModifierBenef />} />
      <Route path='/supprimerBenef/:id' element={<SupprimerBenef />} />

      <Route path='/solde' element={<Solde />} />
      <Route path='/ajouterSolde' element={<AjouterSolde />} />

      <Route path='/virement' element={<Virement />} />
      <Route path='/ajouterVirement' element={<AjouterVirement />} />
      <Route path='/detailVirement/:id' element={<DetailVirement />} />






    </Routes>
  )
}

export default App;