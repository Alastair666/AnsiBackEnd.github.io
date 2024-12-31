import { Retos } from '../dao/factory.js'
import RetosRepository from '../repository/operacion.retos.repository.js'

export default class RetosService {
    static getRetosService(){
        try {
            return new RetosRepository(new Retos())
        }
        catch (error) {
            console.log(error)
        }
    }
}