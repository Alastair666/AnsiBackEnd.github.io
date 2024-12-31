import mongoose from 'mongoose'

// Definiendo Colección de Archivos Cargados a Google Drive
const driveFileSchema = mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    id_tipo_archivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catalogo",
        required: true
    },
    url: {
        type: String,
        required: true, 
        validate: { 
            validator: function(v) { return /^https:\/\/drive\.google\.com\/.*$/.test(v); }, 
            message: props => `${props.value} no es una URL válida de Google Drive`
        } 
    },
    fecha_carga: {
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

// Exportando modelo de Archivos Cargados
const driveFileModel = mongoose.model("archivo_drive", driveFileSchema)
export default driveFileModel