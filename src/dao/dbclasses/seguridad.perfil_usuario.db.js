import usersProfileModel from '../models/seguridad.perfil_usuario.js'
import GenericDB from './generic.db.js'

export default class PerfilUsuarioDB extends GenericDB {
    constructor() {
        super(usersProfileModel)
    }
}