import mongoose from 'mongoose'

// Definiendo Colección de Sesiones de Usuario
const userSessionSchema = mongoose.Schema({
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
    id_estatus_sesion: Number,
    id_tipo_dispositivo: Number,
    fecha_inicio: {
        type: Date,
        required: true,
        default: Date.now
    },
    duracion_min: Number,
    nombre_disp: String
})

// Exportando modelo de Sesiones de Usuario
const usersSessionModel = mongoose.model("sesion_usuario", userSessionSchema)
export default usersSessionModel