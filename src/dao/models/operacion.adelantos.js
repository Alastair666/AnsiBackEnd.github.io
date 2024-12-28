import mongoose from 'mongoose'

// Definiendo Colección de Adelantos
const advancesSchema = mongoose.Schema({
    id_seccion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seccion",
        default: null
    },
    descripcion: String,
    id_adelanto_anterior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adelantos",
        default: null
    },
    adelanto_terminal: Boolean
})

// Exportando modelo de Adelantos
const advancesModel = mongoose.model("adelantos", advancesSchema)
export default advancesModel