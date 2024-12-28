import mongoose from 'mongoose'

// Definiendo Colección de Domicilios
const addressSchema = mongoose.Schema({
    cp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "codigo_postal"
    },
    colonia: String,
    calle: String,
    nombre: String,
    no_ext: String,
    no_int: String
})

// Exportando modelo de Domicilios
const addressModel = mongoose.model("domicilio", addressSchema)
export default addressModel