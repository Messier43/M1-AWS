import express from "express";
import { login, register } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

export default authRouter

/////////////////// Here are my adds 
import User from '../backend/models/user.js'; // Importe la variable User du fichier user.js dans le dossier backend/models

authRouter.post('/users/login', async (request, response) => {
    try {
        const user = await User.findUser(request.body.email, request.body.password); 
        response.send(user); 
    } catch (error) {
        response.status(400).send(); 
    }
});


authRouter.post('/users/logout', checkAuth , async (request, response) => {
    try {
        request.user.token = request.user.token.filter((token) => {
        return token.token !== request.token 
        });
        await request.user.save();
        response.send();
        } catch (error) {
        response.status(500).send;
    }
});

