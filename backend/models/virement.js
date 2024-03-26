import mongoose from "mongoose";

const virementSchema = new mongoose.Schema({
    montant: {
        type: Number,
        required: true
    },
    devise: [{
        type: String,
        required: true
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    motif: {
        type: String,
        required: true
    },
},

    {
        timestamps: true,
    }
);

const Virement = mongoose.model('Virement', virementSchema); // virements

export default Virement;
