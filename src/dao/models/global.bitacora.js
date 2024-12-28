import mongoose from 'mongoose'

// Definiendo Colección de Beneficiarios
const binnacleSchema = mongoose.Schema({
    id_bitacora_tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bitacora_tipo"
    },
    id_tabla: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tablas"
    },
    id_registro: Schema.Types.ObjectId,
    fecha_bitacora: {
        type: Date,
        default: Date.now
    },
    detalles: String,
    id_sesion: {
        type: Schema.Types.ObjectId,
        ref: "sesion_usuario",
        default: null
    }
})

// Exportando modelo de Beneficiarios
const binnacleModel = mongoose.model("beneficiarios", binnacleSchema)
export default binnacleModel