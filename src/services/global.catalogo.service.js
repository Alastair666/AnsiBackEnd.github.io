import { Catalogo } from '../dao/factory.js'
import CatalogoRepository from '../repository/global.catalogo.repository.js'

export default class CatalogoService {
    static getCatalogoService(){
        try {
            return new CatalogoRepository(new Catalogo())
        }
        catch (error) {
            console.log(error)
        }
    }
}