import mongoose from 'mongoose'

// Definiendo Colección de Sección
const sectionSchema = mongoose.Schema({
    edad_inicial: Number,
    edad_final: Number,
    nombre: String,
    id_seccion_anterior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seccion",
        default: null
    }
})

// Exportando modelo de Sección
const sectionModel = mongoose.model("seccion", sectionSchema)
export default sectionModel