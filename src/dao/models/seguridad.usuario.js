import mongoose from 'mongoose'

// Definiendo Colección de Usuarios
const usersSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true },
    no_telefono: String,
    clave_acceso: String,
    sesiones_disponibles: Number,
    fecha_registro: {
        type: Date,
        required: true,
        default: Date.now
    },
    duracion_sesion: Number,
})

// Exportando modelo de ordenes
const usersModel = mongoose.model("usuario", usersSchema)
export default usersModel