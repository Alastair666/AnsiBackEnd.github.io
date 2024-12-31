import mongoose from 'mongoose'

// Definiendo Colección de Accesos de Perfil
const accessProfileDefinitionSchema = mongoose.Schema({
    id_perfil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "perfiles"
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

// Exportando modelo de Accesos
const accessProfileDefinitionModel = mongoose.model("perfil_acceso", accessProfileDefinitionSchema)
export default accessProfileDefinitionModel