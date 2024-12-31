import usersModel from '../models/seguridad.usuario.js'
import { createHash, isValidPassword } from '../../middleware/auth.js'

export default class UsuarioDB {
    constructor() {
        this.model = usersModel;
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

    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    getLoginUser = async(username, password)=>{
        try {
            //Consultando email en uso
            const user = await usersModel.findOne({ email: username })
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