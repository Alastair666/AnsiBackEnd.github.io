import { Registro } from '../dao/factory.js'
import RegistroRepository from '../repository/operacion.registro.repository.js'

export default class RegistroService {
    static getRegistroService(){
        try {
            return new RegistroRepository(new Registro())
        }
        catch (error) {
            console.log(error)
        }
    }
}