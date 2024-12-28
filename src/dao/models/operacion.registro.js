import mongoose from 'mongoose'

// Definiendo Colección de Registro
const recordSchema = mongoose.Schema({
    id_beneficiario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beneficiarios"
    },
    id_distrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "distrito",
        default: null
    },
    id_grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "grupo",
        default: null
    },
    id_estatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null
    },
    id_seccion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seccion"
    },
    año: Number,
    fecha_inicio: {
        type: Date,
        default: Date.now
    },
    fecha_termino: {
        type: Date,
        default: Date.now
    }
})

// Exportando modelo de Registro
const recordModel = mongoose.model("registro", recordSchema)
export default recordModel