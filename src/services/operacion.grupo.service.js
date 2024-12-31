import { Grupo } from '../dao/factory.js'
import GrupoRepository from '../repository/operacion.grupo.repository.js'

export default class GrupoService {
    static getGrupoService(){
        try {
            return new GrupoRepository(new Grupo())
        }
        catch (error) {
            console.log(error)
        }
    }
}