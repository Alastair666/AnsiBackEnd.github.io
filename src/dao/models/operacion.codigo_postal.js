import mongoose from 'mongoose'

// Definiendo Colección de Código Postales
const postalCodeSchema = mongoose.Schema({
    cp: {
        type: Number,
        unique: true,
        required: true
    },
    c_estado: {
        type: String,
        required: true
    },
    id_pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        required: true
    }
})

// Exportando modelo de Código Postales
const postalCodeModel = mongoose.model("codigo_postal", postalCodeSchema)
export default postalCodeModel