import { CatalogoTipo } from '../dao/factory.js'
import CatalogoTipoRepository from '../repository/global.catalogo_tipo.repository.js'

export default class CatalogoTipoService {
    static getCatalogoTipoService(){
        try {
            return new CatalogoTipoRepository(new CatalogoTipo())
        }
        catch (error) {
            console.log(error)
        }
    }
}