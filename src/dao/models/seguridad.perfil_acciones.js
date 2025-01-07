import mongoose from 'mongoose'

// Definiendo Colección de Perfiles
const actionsProfileSchema = mongoose.Schema({
    id_perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "perfil"
    },
    id_accion: Number,
    permitir: Boolean,
})

// Exportando modelo de perfiles
const actionsProfileModel = mongoose.model("perfil_acciones", actionsProfileSchema)
export default actionsProfileModel