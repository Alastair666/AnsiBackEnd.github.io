import { Perfil } from '../dao/factory.js'
import PerfilRepository from '../repository/seguridad.perfil.repository.js'

export default class PerfilService {
    static getPerfilService(){
        try {
            return new PerfilRepository(new Perfil())
        }
        catch (error) {
            console.log(error)
        }
    }
}