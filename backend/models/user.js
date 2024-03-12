import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(v){
            if (!validator.isEmail(v)) throw new Error('Email non valide'); 
        }
    },
    password: {
        type: String,
        required: true,
        validate(v){
            if(!validator.isLength(v, {min:8, max:20})) throw new Error ('Le mot de passe doit etre entre 8 et 20 caractères');
        }
    }
    },
    {
    timestamps: true,
});

const User = mongoose.model('User', userSchema) // users

export default User;

//////////////// Here are my adds
const bcrypt = require('bcrypt.js');  

userSchema.statics.findUser = async(email,password) =>{
     const user = await User.findOne({email}); //récupérer utilisateur s'il existe 
     if(!user) throw new Error ('Erreur, pas possible de se connecter'); //sinon erreur
    const isPasswordValid = await bcrypt.compare(password, user.password); //comparer le mot de passe de la bd et le mot de passe saisi
    if(!isPasswordValid) throw new Error('Erreur, pas possible de se connecter');
    return user; 
}