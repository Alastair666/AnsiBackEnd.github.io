import profileModel from '../models/seguridad.perfil.js'
import GenericDB from './generic.db.js'

export default class PerfilDB extends GenericDB {
    constructor() {
        super(profileModel)
    }
}