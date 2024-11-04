import mongoose from 'mongoose'

// Definiendo Colección de Tablas
const tableSchema = mongoose.Schema({
    nombre_tabla: String,
    id_tipo: Number,
    alias_tabla: String,
    descripcion: String,
    campo_llave: String
})

// Exportando modelo de Tablas
const tableModel = mongoose.model("tablas", tableSchema)
export default tableModel