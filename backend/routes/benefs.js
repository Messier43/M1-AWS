import express from "express";
import checkAuth from '../middlewares/check-auth.js';

import { afficherBenef, ajouterBenef, detailBenef, modifierBenef, supprimerBenef } from "../controllers/beneficiaire.js";


const benefRouter = express.Router();


benefRouter.use(checkAuth);


benefRouter.get('/afficherBenef',afficherBenef);

benefRouter.post('/ajouterBenef', ajouterBenef);

benefRouter.get('/detailBenef/:id',detailBenef);

benefRouter.put('/modifierBenef/:id',modifierBenef);

benefRouter.delete('/supprimerBenef/:id',supprimerBenef);



export default benefRouter