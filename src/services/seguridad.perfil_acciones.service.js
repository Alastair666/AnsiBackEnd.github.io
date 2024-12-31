import { PerfilAcciones } from '../dao/factory.js'
import PerfilAccionesRepository from '../repository/seguridad.perfil_acciones.repository.js'

export default class PerfilAccionesService {
    static getPerfilAccionesService(){
        try {
            return new PerfilAccionesRepository(new PerfilAcciones())
        }
        catch (error) {
            console.log(error)
        }
    }
}