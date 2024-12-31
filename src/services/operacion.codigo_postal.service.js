import { CodigoPostal } from '../dao/factory.js'
import CodigoPostalRepository from '../repository/operacion.codigo_postal.repository.js'

export default class CodigoPostalService {
    static getCodigoPostalService(){
        try {
            return new CodigoPostalRepository(new CodigoPostal())
        }
        catch (error) {
            console.log(error)
        }
    }
}