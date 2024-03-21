import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import produitRouter from "./routes/produits.js";
import cors from 'cors';
import benefRouter from "./routes/benefs.js";
import authRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (request, response, next) => {
    console.log(request)
    return response.status(234).send('welcome home')

});

// authentication
app.use('/auth', authRouter);

app.use('/beneficiaire', benefRouter);



// app.use('/produits', produitRouter)

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('app connected to database')
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })

    .catch((error) => {
        console.log(error)
    })

