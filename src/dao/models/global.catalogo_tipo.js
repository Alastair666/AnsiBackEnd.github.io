import mongoose from 'mongoose'

// Definiendo Colección de Tipos de Catalogo
const catalogTypeSchema = mongoose.Schema({
    id_tabla: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tabla"
    },
    descripcion: String,
    id_tipo_superior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo_tipo",
        default: null  // Permitir valores null
    }
})

// Exportando modelo de Tipos de Catalogo
const catalogTypeModel = mongoose.model("catalogo_tipo", catalogTypeSchema)
export default catalogTypeModel