import { Bitacora } from '../dao/factory.js'
import BitacoraRepository from '../repository/global.bitacora.repository.js'

export default class BitacoraService {
    static getBitacoraService(){
        try {
            return new BitacoraRepository(new Bitacora())
        }
        catch (error) {
            console.log(error)
        }
    }
}