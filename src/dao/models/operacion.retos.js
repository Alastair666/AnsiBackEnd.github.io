import mongoose from 'mongoose'

// Definiendo Colección de Retos
const challengesSchema = mongoose.Schema({
    id_adelanto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adelantos"
    },
    id_categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null
    },
    id_reto_anterior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "retos"
    },
    descripcion: String,
    predeterminado: Boolean
})

// Exportando modelo de Retos
const challengesModel = mongoose.model("retos", challengesSchema)
export default challengesModel