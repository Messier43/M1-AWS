import mongoose from "mongoose";

const benefSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    }

    },
    {
    timestamps: true,
});

const Benef = mongoose.model('Benef', benefSchema) // benefs

export default Benef;

    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User' // référence le modèle User
    // }