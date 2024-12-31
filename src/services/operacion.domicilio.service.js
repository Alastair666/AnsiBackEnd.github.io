import { Domicilio } from '../dao/factory.js'
import DomicilioRepository from '../repository/operacion.domicilio.repository.js'

export default class DomicilioService {
    static getDomicilioService(){
        try {
            return new DomicilioRepository(new Domicilio())
        }
        catch (error) {
            console.log(error)
        }
    }
}