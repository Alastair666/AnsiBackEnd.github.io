import mongoose from 'mongoose'

// Definiendo Colección de Perfiles
const actionsProfileSchema = mongoose.Schema({
    id_perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "perfil"
    },
    id_entidad_accion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tabla"
    },
    acciones: {
        Create: { type: Boolean, required: true, default: false },
        Read: { type: Boolean, required: true, default: false },
        Update: { type: Boolean, required: true, default: false },
        Delete: { type: Boolean, required: true, default: false }
    }
})

// Exportando modelo de perfiles
const actionsProfileModel = mongoose.model("perfil_acciones", actionsProfileSchema)
export default actionsProfileModel