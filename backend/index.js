import express from "express"; 
import {PORT, mongoDB_url} from "./config.js";
import mongoose from "mongoose";



const app = express();
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Bonjour');
});

mongoose
    .connect(mongoDB_url)
    .then(() => {
        console.log('App connectée à la BD');
        app.listen(PORT, ()=> {
            console.log('App écoute le port : ${PORT}');
        });
    })
    .catch((error) => {
        console.log(erreur);
    });
