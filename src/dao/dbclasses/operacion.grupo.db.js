import groupModel from '../models/operacion.grupo.js'
import GenericDB from './generic.db.js'

export default class GrupoDB extends GenericDB {
    constructor() {
        super(groupModel)
    }
}