import mongoose from 'mongoose'

// Definiendo Colección de Archivos Cargados a Google Drive
const fileRecordSchema = mongoose.Schema({
    id_entidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tablas",
        required: true
    },
    id_registro: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    id_tipo_registro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        required: true
    },
    fecha_registro: {
        type: Date,
        required: true,
        default: Date.now
    },
    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    },
})

// Exportando modelo de Archivos de Registro(s)
const fileRecordModel = mongoose.model("archivo_registro", fileRecordSchema)
export default fileRecordModel