import mongoose from "mongoose"; 

const clientSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        courriel: {
            type: String,
            required: true,
        },
    }
)

export const client = mongoose.model('Client', clientSchema)