import mongoose from 'mongoose'

// Definiendo Colección de Perfiles
const userProfileSchema = mongoose.Schema({
    id_perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "perfil"
    },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario"
    },
    perfil_activo: Boolean,
})

// Exportando modelo de perfiles
const usersProfileModel = mongoose.model("perfil_usuario", userProfileSchema)
export default usersProfileModel