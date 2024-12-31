import { Adelantos } from '../dao/factory.js'
import AdelantosRepository from '../repository/operacion.adelantos.repository.js'

export default class AdelantosService {
    static getAdelantosService(){
        try {
            return new AdelantosRepository(new Adelantos())
        }
        catch (error) {
            console.log(error)
        }
    }
}