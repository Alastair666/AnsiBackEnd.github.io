import usersProfileModel from '../models/seguridad.perfil_usuario.js';

export default class PerfilUsuarioDB {
    constructor() {
        this.model = usersProfileModel;
    }

    async create(data) {
        const newEntry = new this.model(data);
        return await newEntry.save();
    }

    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}