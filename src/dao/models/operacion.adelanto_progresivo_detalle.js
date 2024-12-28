import mongoose from 'mongoose'

// Definiendo Colección de Adelanto Progresivo Detalle
const progressiveAdvancementDetailSchema = mongoose.Schema({
    id_adelanto_progresivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adelanto_progresivo"
    },
    id_reto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "retos"
    },
    completado: Boolean,
    fecha_realizado: {
        type: Date,
        default: null
    },
    detalles: String
})

// Exportando modelo de Adelanto Progresivo Detalle
const progressiveAdvancementDetailModel = mongoose.model("adelanto_progresivo_detalle", progressiveAdvancementDetailSchema)
export default progressiveAdvancementDetailModel