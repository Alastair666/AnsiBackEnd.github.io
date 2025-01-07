export default class GenericDB {
    constructor(model) {
        this.model = model;
    }
    // Crear un nuevo registro
    async create(data) {
        const newEntry = new this.model(data);
        return await newEntry.save();
    }
    // Obtener todos los registros
    async get(params) {
        return await this.model.find(params);
    }
    // Obtener un registro por ID
    async findById(id) {
        return await this.model.findById(id);
    }
    // Obtener un registro por parametros
    async getBy(params) {
        return await this.model.findOne(params);
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