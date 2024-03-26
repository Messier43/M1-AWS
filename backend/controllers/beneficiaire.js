import IBAN from 'iban';
import jwt from "jsonwebtoken";
import Benef from "../models/benef.js";

export const afficherBenef = async (request, response) => {
    try {
        // Extraire le token JWT de l'en-tête d'autorisation
        const token = request.headers.authorization.split(' ')[1];
        
        // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        console.log(userId);

        // Recherche des bénéficiaires associés à l'utilisateur identifié
        const benefs = await Benef.find({ utilisateur: userId, deleted: { $ne: true } }).populate('utilisateur');

        // Retourner les bénéficiaires trouvés
        response.status(200).json({
            count: benefs.length,
            data: benefs
        });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur
        response.status(500).json({ error: error.message });
    }
}


export const detailBenef = async (request, response) => {
    try {
        const { id } = request.params;
        const benef = await Benef.findById(id);

        if (!benef) {
            return response.status(404).json({ error: "Beneficiary not found" });
        }

        return response.status(200).json(benef);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const ajouterBenef = async (request, response) => {
    try {
        const { firstName, lastName, iban } = request.body;
        
        // Vérifier si l'IBAN est valide
        if (!IBAN.isValid(iban)) {
            return response.status(400).json({ error: "Invalid IBAN" });
        }

        // Extraire le token JWT de l'en-tête Authorization
        const token = request.headers.authorization.split(' ')[1];
        
        // Vérifier et décoder le token JWT pour obtenir l'identifiant de l'utilisateur
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        
        // Poursuivre avec l'ajout du bénéficiaire
        const newBenef = new Benef({
            firstName,
            lastName,
            iban,
            utilisateur: userId // Assigner l'identifiant de l'utilisateur au bénéficiaire
        });
        await newBenef.save();
        
        response.status(201).json({ message: "Beneficiary created successfully" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};


export const modifierBenef = async (request, response) => {
    try {
        const { id } = request.params;

        const benefToUpdate = await Benef.findById(id);

        if (!benefToUpdate) {
            return response.status(404).json({ message: 'Beneficiary not found' });
        }

        // Vérifier si l'IBAN est fourni dans la requête
        if (request.body.hasOwnProperty('iban')) {
            const iban = request.body.iban;

            // Vérifier si l'IBAN est valide
            if (!IBAN.isValid(iban)) {
                return response.status(400).json({ message: 'Invalid IBAN' });
            }
        }

        // Mettre à jour les attributs fournis dans la requête
        for (const key in request.body) {
            if (request.body.hasOwnProperty(key)) {
                benefToUpdate[key] = request.body[key];
            }
        }

        // Sauvegarder les modifications
        const updatedBenef = await benefToUpdate.save();

        response.status(200).json({ message: 'Beneficiary updated successfully', updatedBenef });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
};

export const supprimerBenef = async (request, response) => {
    try {

        const { id } = request.params;
        // Chercher le bénéficiaire à "supprimer" dans la base de données
        const benefToDelete = await Benef.findById(id);

        if (!benefToDelete) {
            return response.status(404).json({ message: "Beneficiary not found" });
        }

        // Marquer le bénéficiaire comme "supprimé"
        benefToDelete.deleted = true;

        // Sauvegarder les modifications
        await benefToDelete.save();

        response.status(200).json({ message: "Beneficiary marked as deleted" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};