import mongoose from 'mongoose'

// Definiendo Colección de Distrito
const districtSchema = mongoose.Schema({
    id_estatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null
    },
    descripcion: String,
    abreviatura: String,
    fecha_fundacion: {
        type: Date,
        default: Date.now
    }
})

// Exportando modelo de Distrito
const districtModel = mongoose.model("distrito", districtSchema)
export default districtModel