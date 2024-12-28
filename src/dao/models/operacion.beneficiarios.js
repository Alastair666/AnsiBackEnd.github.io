import mongoose from 'mongoose'

// Definiendo Colección de Beneficiarios
const beneficiarySchema = mongoose.Schema({
    id_domicilio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "domicilio"
    },
    ap_paterno: String,
    ap_materno: String,
    nombre: String,
    fecha_nac: {
        type: Date,
        default: Date.now
    },
    id_genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null  // Permitir valores null
    },
    id_tipo_seguro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        default: null  // Permitir valores null
    },
    no_afiliacion: String,
    clave_mem: {
        type: String,
        unique: true
    },
    fecha_ingreso: {
        type: Date,
        default: Date.now
    }
})

// Exportando modelo de Beneficiarios
const beneficiaryModel = mongoose.model("beneficiarios", beneficiarySchema)
export default beneficiaryModel