import usersModel from '../models/seguridad.usuario.js'
import { createHash, isValidPassword } from '../../middleware/auth.js'
import GenericDB from './generic.db.js'

export default class UsuarioDB extends GenericDB {
    constructor() {
        super(usersModel)
    }

    async create(data) {
        const newUser = await this.model.create({
            nombre : data.nombre,
            ap_paterno : data.ap_paterno,
            ap_materno : data.ap_materno,
            email: data.email,
            no_telefono: data.no_telefono,
            clave_acceso: createHash(data.clave_acceso)
        })
        return newUser
        /*const newEntry = new this.model(data);
        return await newEntry.save();//*/
    }

    async getLogin(username, password) {
        try {
            //Consultando email en uso
            const user = await this.model.findOne({ email: username })
            if (user) {
                //Validando contraseña
                if (isValidPassword(user, password)) {
                    return user
                }
            }
        }
        catch   (error) {
            console.error(error)
            return null
        }
    }
}