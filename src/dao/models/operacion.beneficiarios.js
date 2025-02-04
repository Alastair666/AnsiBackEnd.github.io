import mongoose from 'mongoose'

// Definiendo Colección de Beneficiarios
const beneficiarySchema = mongoose.Schema({
    id_tipo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null  // Permitir valores null
    },
    id_domicilio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "domicilio"
    },
    curp: {
        type: String,
        required: true
    },
    ap_paterno: {
        type: String,
        required: true
    },
    ap_materno: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fecha_nac: {
        type: Date,
        default: Date.now,
        required: true
    },
    id_genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null,// Permitir valores null
        required: true
    },
    id_tipo_seguro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null// Permitir valores null
    },
    no_afiliacion: String,
    clave_mem: {
        type: String,
        unique: true,
        required: true
    },
    fecha_ingreso: {
        type: Date,
        default: Date.now,
        required: true
    }
})

// Exportando modelo de Beneficiarios
const beneficiaryModel = mongoose.model("beneficiarios", beneficiarySchema)
export default beneficiaryModel