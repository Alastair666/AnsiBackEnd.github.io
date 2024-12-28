import mongoose from 'mongoose'

// Definiendo Colección de Bitacora Tipo
const binnacleTypeSchema = mongoose.Schema({
    id_tabla: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tablas"
    },
    descripcion: String,
    id_clasificacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null
    }
})

// Exportando modelo de Bitacora Tipo
const binnacleTypeModel = mongoose.model("bitacora_tipo", binnacleTypeSchema)
export default binnacleTypeModel