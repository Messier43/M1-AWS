import jwt from "jsonwebtoken";
import Solde from "../models/solde.js";



export const afficherSolde = async (request, response) => {
    try {
        // Extraire le token JWT de l'en-tête d'autorisation
        const token = request.headers.authorization.split(' ')[1];

        // // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        console.log(userId);

        // Recherche des bénéficiaires associés à l'utilisateur identifié
        const soldes = await Solde.find({ utilisateur: userId }).populate('utilisateur');

        response.status(200).json({
            count: soldes.length,
            data: soldes
        });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        response.status(500).json({ error: error.message });
    }
}

export const ajouterSolde = async (request, response) => {
    try {
        const { montant } = request.body;

        // Convertir la valeur de montant en nombre
        const montantNumber = parseFloat(montant);

        // Extraire le token JWT de l'en-tête Authorization
        const token = request.headers.authorization.split(' ')[1];

        // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Recherche du solde existant de l'utilisateur
        let solde = await Solde.findOne({ utilisateur: userId });

        // Si aucun solde existant n'est trouvé, créez un nouveau solde avec le montant fourni
        if (!solde) {
            solde = new Solde({
                montant: montantNumber,
                utilisateur: userId
            });
        } else {
            // Ajoutez le montant fourni au solde existant
            solde.montant += montantNumber;
        }

        // Enregistrer le solde mis à jour dans la base de données
        await solde.save();

        // Supprimer l'ancienne valeur du solde si elle existe
        await Solde.deleteMany({ utilisateur: userId, montant: { $ne: solde.montant }, _id: { $ne: solde._id } });

        response.status(201).json({ message: "Solde ajouté avec succès" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

// export const ajouterSolde = async (request, response) => {
//     try {
//         const { montant } = request.body;

//         // Extraire le token JWT de l'en-tête Authorization
//         const token = request.headers.authorization.split(' ')[1];

//         // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decodedToken.userId;

//         // Recherche du solde existant de l'utilisateur
//         let solde = await Solde.findOne({ utilisateur: userId });

//         // Si aucun solde existant n'est trouvé, créez un nouveau solde avec le montant fourni
//         if (!solde) {
//             solde = new Solde({
//                 montant,
//                 utilisateur: userId
//             });
//         } else {
//             // Si un solde existant est trouvé, ajoutez le montant fourni au solde existant
//             solde.montant = solde.montant + montant;
//         }

//         // Enregistrer le solde mis à jour dans la base de données
//         await solde.save();

//         response.status(201).json({ message: "Solde ajouté avec succès" });
//     } catch (error) {
//         response.status(500).json({ error: error.message });
//     }
// };
// export const ajouterSolde = async (request, response) => {
//     try {
//         const { montant } = request.body;

//         // Extraire le token JWT de l'en-tête Authorization
//         const token = request.headers.authorization.split(' ')[1];

//         // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decodedToken.userId;

//         // Poursuivre avec l'ajout du solde
//         const newSolde = new Solde({
//             montant,
//             utilisateur: userId // Assigner l'identifiant de l'utilisateur au solde
//         });
//         await newSolde.save();

//         response.status(201).json({ message: "solde ajouté avec succès" });
//     } catch (error) {
//         response.status(500).json({ error: error.message });
//     }
// };