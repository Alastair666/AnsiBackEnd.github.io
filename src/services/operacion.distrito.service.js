import { Distrito } from '../dao/factory.js'
import DistritoRepository from '../repository/operacion.distrito.repository.js'

export default class DistritoService {
    static getDistritoService(){
        try {
            return new DistritoRepository(new Distrito())
        }
        catch (error) {
            console.log(error)
        }
    }
}