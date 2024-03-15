import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Fonction pour générer un identifiant aléatoire à 10 chiffres
const generateRandomId = () => {
    const id = Math.floor(1000000000 + Math.random() * 9000000000); // Génère un nombre aléatoire entre 1000000000 et 9999999999
    return id.toString(); // Convertit le nombre en chaîne de caractères
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "ebanquecontact@gmail.com",
    port: 5555,
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
});

// Génère l'identifiant avant la création des options de mail
const randomId = generateRandomId();

const mailOptions = {
    from: {
        name: 'E-bank',
        address: process.env.email,
    },
    to: ["anaisevin31@gmail.com"],
    subject: "Bienvenue chez E-Bank", // Ligne d'objet
    text: `Bonjour, votre création de compte a été réussie. Votre identifiant : ${randomId}`, // Corps du message texte
    html: `<p>Bonjour, votre création de compte a été réussie.</p><p><b>Votre identifiant : ${randomId}</b></p>`, // Corps du message HTML
}

const sendMail = async () => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès");
    } catch (error) {
        console.error(error);
    }
}

sendMail();
