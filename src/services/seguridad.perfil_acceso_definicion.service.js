import { PerfilAccesoDefinicion } from '../dao/factory.js'
import PerfilAccesoDefinicionRepository from '../repository/seguridad.perfil_acceso_definicion.repository.js'

export default class PerfilAccesoDefinicionService {
    static getPerfilAccesoDefinicionService(){
        try {
            return new PerfilAccesoDefinicionRepository(new PerfilAccesoDefinicion())
        }
        catch (error) {
            console.log(error)
        }
    }
}