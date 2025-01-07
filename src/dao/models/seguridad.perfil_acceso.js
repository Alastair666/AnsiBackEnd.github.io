import mongoose from 'mongoose'

// Definiendo Colección de Accesos de Perfil
const accessProfileSchema = mongoose.Schema({
    id_tabla: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tablas"
    },
    id_registro: mongoose.Schema.Types.ObjectId,
    secuencia: Number,
    bit_nacional: Boolean,
    id_distrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "distrito",
        default: null
    },
    id_grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "grupo",
        default: null
    },
    id_seccion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seccion",
        default: null
    }
})

// Middleware para calcular el campo consecutivo antes de guardar el documento 
accessProfileSchema.pre('save', async function (next) { 
    try { 
        const bitacora = this // Contar registros con la misma combinación de id_tabla y id_registro 
        const count = await mongoose.model('perfil_acceso').countDocuments({ 
            id_tabla: bitacora.id_tabla,
            id_registro: bitacora.id_registro
        })
        // Establecer el campo consecutivo 
        bitacora.consecutivo = count + 1; next()
    } catch (error) { next(error); } 
})

// Exportando modelo de Accesos
const accessProfileModel = mongoose.model("perfil_acceso", accessProfileSchema)
export default accessProfileModel