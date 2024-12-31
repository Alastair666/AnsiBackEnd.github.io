import mongoose from 'mongoose'

// Definiendo Colección de Usuarios
const usersSchema = mongoose.Schema({
    nombre: String,
    ap_paterno: String,
    ap_materno: String,
    email: { type: String, unique: true },
    no_telefono: String,
    clave_acceso: String,
    sesiones_disponibles: { 
        type: Number, 
        default: 0
    },
    fecha_registro: {
        type: Date,
        required: true,
        default: Date.now
    },
    duracion_sesion: { 
        type: Number, 
        default: 0
    }
})

// Exportando modelo de ordenes
const usersModel = mongoose.model("usuario", usersSchema)
export default usersModel