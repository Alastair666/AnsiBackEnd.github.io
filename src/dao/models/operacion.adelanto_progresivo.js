import mongoose from 'mongoose'

// Definiendo Colección de Adelanto Progresivo
const progressiveAdvancementSchema = mongoose.Schema({
    id_registro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registro"
    },
    id_adelanto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adelantos"
    },
    id_estatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null
    },
    fecha_propuesta: {
        type: Date,
        default: null
    },
    fecha_real: {
        type: Date,
        default: Date.now
    },
    observaciones: String
})

// Exportando modelo de Adelanto Progresivo
const progressiveAdvancementModel = mongoose.model("adelanto_progresivo", progressiveAdvancementSchema)
export default progressiveAdvancementModel