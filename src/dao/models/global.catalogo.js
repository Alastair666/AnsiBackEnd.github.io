import mongoose from 'mongoose'

// Definiendo Colección de Catalogos
const catalogSchema = mongoose.Schema({
    id_catalogo_tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo_tipo", 
        required: true
    },
    id_catalogo_superior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null  // Permitir valores null
    },
    descripcion: String,
    valor_alterno: String,
    id_tipo_superior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo_tipo",
        default: null  // Permitir valores null
    }
})

// Exportando modelo de Catalogos
const catalogModel = mongoose.model("catalogo", catalogSchema)
export default catalogModel