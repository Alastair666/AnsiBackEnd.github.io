import userSessionModel from '../models/seguridad.sesion_usuario.js'

export default class SesionUsuarioDB {
    constructor() {
        this.model = userSessionModel;
    }

    // Crear un nuevo registro
    async create(data) {
        const newEntry = new this.model(data);
        return await newEntry.save();
    }

    // Obtener todos los registros
    async findAll() {
        return await this.model.find();
    }

    // Obtener un registro por ID
    async findById(id) {
        return await this.model.findById(id);
    }

    // Actualizar un registro por ID
    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    // Eliminar un registro por ID
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}