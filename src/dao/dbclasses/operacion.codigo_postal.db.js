import postalCodeModel from '../models/operacion.codigo_postal.js'
import GenericDB from './generic.db.js'

export default class CodigoPostalDB extends GenericDB {
    constructor() {
        super(postalCodeModel)
    }
    async getByCP(cp) {
        try {
            const result = await this.model.findOne({ cp: cp })
            if (!result)
                return []
            return result
        } catch (ex) {
            console.error(error)
            throw error
        }
    }
}