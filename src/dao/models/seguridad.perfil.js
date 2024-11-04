import mongoose from 'mongoose'

// Definiendo Colección de Perfiles de Usuarios
const profileSchema = mongoose.Schema({
    nombre: { type: String, unique: true },
    detalles: String,
    administrador: Boolean
})

// Exportando modelo de Perfiles de Usuarios
const profileModel = mongoose.model("perfiles", profileSchema)
export default profileModel