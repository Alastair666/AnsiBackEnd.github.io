import { Seccion } from '../dao/factory.js'
import SeccionRepository from '../repository/operacion.seccion.repository.js'

export default class SeccionService {
    static getSeccionService(){
        try {
            return new SeccionRepository(new Seccion())
        }
        catch (error) {
            console.log(error)
        }
    }
}