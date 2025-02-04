import tableModel from '../models/global.tabla.js'
import GenericDB from './generic.db.js'

export default class TablaDB extends GenericDB {
    constructor() {
        super(tableModel)
    }
    async getEntityByAlias(alias){
        return await this.model.findOne({alias_tabla: alias})
    }
}