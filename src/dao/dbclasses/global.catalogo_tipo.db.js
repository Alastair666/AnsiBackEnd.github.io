import catalogTypeModel from '../models/global.catalogo_tipo.js'
import GenericDB from './generic.db.js'

export default class CatalogoTipoDB extends GenericDB {
    constructor() {
        super(catalogTypeModel)
    }
}