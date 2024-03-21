import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import validator from 'validator';
import User from "../models/user.js";


export const register = async (request, response) => {
    try {
        // Extraire les données de la requête
        const { firstName, lastName, email, password, verifyEmail, verifyPassword } = request.body;

        // // Vérifier que tous les champs requis sont fournis
        if (!firstName || !lastName || !email || !password || !verifyEmail || !verifyPassword) {
            return response.status(400).json({ error: "Tous les champs doivent être remplis" });
        }

        // // Vérifier que l'email et la vérification de l'email correspondent
        if (email !== verifyEmail) {
            return response.status(400).json({ error: "L'email et la vérification de l'email ne correspondent pas" });
        }

        // Vérifier que le mot de passe est fort
        if (!validator.isStrongPassword(password)) {
            return response.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères, y compris au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial" });
        }

        // // Vérifier que le mot de passe et la vérification du mot de passe correspondent
        if (password !== verifyPassword) {
            return response.status(400).json({ error: "Le mot de passe et la vérification du mot de passe ne correspondent pas" });
        }

        // Générer un sel pour renforcer le hachage
        const salt = await bcrypt.genSalt(10);

        // Utiliser bcrypt pour hacher le mot de passe avec le sel généré
        const hashedPassword = await bcrypt.hash(password, salt);

        // Fonction pour générer un BIC
        function generateBIC() {
            const bankCode = "EBNK"; // code de banque
            const countryCode = "FR"; // Code pays

            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Générer 2 caractères aléatoires pour le code de localisation de la branche
            const branchCode = Array.from({ length: 2 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

            // Générer 3 caractères aléatoires pour le code d'emplacement de la filiale
            const locationCode = Array.from({ length: 3 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

            // Concaténation de tous les composants pour former le BIC
            return `${bankCode}${countryCode}${branchCode}${locationCode}`;
        }
        const bic = generateBIC();
        console.log(bic);

        // Fonction pour générer un IBAN
        function generateUniqueIban() {
            const country_code = "FR"; //Code pays
            const control_key = "78"; // Clé de contrôle
            const bank_code = "30001"; //Code banque
            const branch_code = "05009"; //Code agence
            const randomDigits = generateRandomDigits(11); // numéro de compte
            const national_check_digit = "06"; //Chiffre d'indicatif national
            return `${country_code}${control_key}${bank_code}${branch_code}${randomDigits}${national_check_digit}`;

        }

        // Fonction pour générer des chiffres aléatoires d'une longueur donnée
        function generateRandomDigits(length) {
            let randomDigits = '';
            for (let i = 0; i < length; i++) {
                randomDigits += Math.floor(Math.random() * 10);
            }
            return randomDigits;
        }
        // Générer un IBAN unique
        const iban = generateUniqueIban();
        console.log(iban);

        // Créer un nouvel utilisateur avec les données fournies dans le corps de la requête
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Utiliser le mot de passe haché
            iban: iban,
            bic: bic
        });
        // Sauvegarder le nouvel utilisateur dans la base de données
        console.log(newUser);
        await newUser.save();

        
        // Envoyer une réponse avec un code de statut 201 indiquant que la création du compte a réussi
        response.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};


export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });

        // Vérifier si l'utilisateur existe
        if (!user) {
            return response.status(400).json({ message: "Wrong email and/or password" });
        }

        // Vérifier si le mot de passe est correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(400).json({ message: "Wrong email and/or password" });
        }

        // Si l'utilisateur et le mot de passe sont corrects, générer un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Envoyer une réponse avec un message de bienvenue, les détails de l'utilisateur et le token JWT
        response.status(200).json({ message: `Welcome ${user.firstName}`, user, token });
    } catch (error) {
        // En cas d'erreur, envoyer une réponse avec un code de statut 500 et le message d'erreur
        response.status(500).json({ error: error.message });
    }
}
