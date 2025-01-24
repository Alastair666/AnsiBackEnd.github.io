import mongoose from 'mongoose'

// Definiendo Colección de Perfiles de Usuarios
const profileSchema = mongoose.Schema({
    nombre: { type: String, unique: true },
    detalles: String,
    administrador: {
        type: Boolean,
        required: true,
        default: false
    },
    bit_nacional: {
        type: Boolean,
        required: true,
        default: false
    },
    bit_distrito: {
        type: Boolean,
        required: true,
        default: false
    },
    bit_region: {
        type: Boolean,
        required: true,
        default: false
    },
    bit_grupo: {
        type: Boolean,
        required: true,
        default: false
    },
    bit_seccion: {
        type: Boolean,
        required: true,
        default: false
    }
})

// Exportando modelo de Perfiles de Usuarios
const profileModel = mongoose.model("perfiles", profileSchema)
export default profileModel