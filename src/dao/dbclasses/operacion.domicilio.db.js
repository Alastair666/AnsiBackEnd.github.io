import addressModel from '../models/operacion.domicilio.js'
import GenericDB from './generic.db.js'

export default class DomicilioDB extends GenericDB {
    constructor() {
        super(addressModel)
    }
}