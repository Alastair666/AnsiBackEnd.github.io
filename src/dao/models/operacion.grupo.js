import mongoose from 'mongoose'

// Definiendo Colección de Grupo
const groupSchema = mongoose.Schema({
    id_distrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "distrito"
    },
    id_estatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null
    },
    nombre: String,
    numero: String,
    id_domicilio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "domicilio"
    },
    fecha_fundacion: {
        type: Date,
        default: Date.now
    }
})

// Exportando modelo de Grupo
const groupModel = mongoose.model("grupo", groupSchema)
export default groupModel