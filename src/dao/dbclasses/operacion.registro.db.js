import recordModel from '../models/operacion.registro.js'
import GenericDB from './generic.db.js'

export default class RegistroDB extends GenericDB {
    constructor() {
        super(recordModel)
    }
}