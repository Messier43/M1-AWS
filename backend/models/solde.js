import mongoose from "mongoose";

const SoldeSchema = new mongoose.Schema({
    montant: {
        type: Number,
        default:null,
        required: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

},
    {
        timestamps: true,
    });

const Solde = mongoose.model('Solde', SoldeSchema); // sodles

export default Solde;
