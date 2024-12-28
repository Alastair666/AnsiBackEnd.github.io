import mongoose from 'mongoose'

// Definiendo Colección de Tutores
const tutorSchema = mongoose.Schema({
    id_beneficiario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beneficiario"
    },
    id_domicilio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "domicilio"
    },
    id_prioridad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null  // Permitir valores null
    },
    ap_paterno: String,
    ap_materno: String,
    nombre: String,
    id_parentesco: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null  // Permitir valores null
    },
    no_tel_1: String,
    no_tel_2: String
})

// Exportando modelo de Tutores
const tutorModel = mongoose.model("tutores", tutorSchema)
export default tutorModel