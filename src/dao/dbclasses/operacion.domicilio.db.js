import addressModel from '../models/operacion.domicilio.js'
import GenericDB from './generic.db.js'

export default class DomicilioDB extends GenericDB {
    constructor() {
        super(addressModel)
    }
    // Obtener todos los registros
    async get(params) {
        return await this.model.find(params).populate('cp');
    }
    // Obtener un registro por ID
    async findById(id) {
        return await this.model.findById(id).populate('cp');
    }
    // Obtener un registro por parametros
    async getBy(params) {
        return await this.model.findOne(params).populate('cp');
    }
}