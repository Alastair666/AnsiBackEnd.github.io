import mongoose from 'mongoose'

// Definiendo Colección de Código Postales
const postalCodeSchema = mongoose.Schema({
    cp: {
        type: String,
        unique: true
    },
    c_estado: String,
    c_municipio: String,
    id_pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo"
    }
})

// Exportando modelo de Código Postales
const postalCodeModel = mongoose.model("codigo_postal", postalCodeSchema)
export default postalCodeModel