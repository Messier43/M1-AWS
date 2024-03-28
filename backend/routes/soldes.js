import express from "express";
import { afficherSolde, ajouterSolde } from "../controllers/solde.js";
import checkAuth from "../middlewares/check-auth.js";


const soldeRouter = express.Router();

soldeRouter.use(checkAuth);

soldeRouter.get('/afficherSolde', afficherSolde);


soldeRouter.put('/ajouterSolde', ajouterSolde);



export default soldeRouter