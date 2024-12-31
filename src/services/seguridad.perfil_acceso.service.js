import { PerfilAcceso } from '../dao/factory.js'
import PerfilAccesoRepository from '../repository/seguridad.perfil_acceso.repository.js'

export default class PerfilAccesoService {
    static getPerfilAccesoService(){
        try {
            return new PerfilAccesoRepository(new PerfilAcceso())
        }
        catch (error) {
            console.log(error)
        }
    }
}