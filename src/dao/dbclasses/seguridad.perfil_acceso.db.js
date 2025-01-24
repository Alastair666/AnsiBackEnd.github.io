import perfilAccesoModel from '../models/seguridad.perfil_acceso.js'
import GenericDB from './generic.db.js'

export default class PerfilAccesoDB extends GenericDB {
    constructor() {
        super(perfilAccesoModel)
    }
}