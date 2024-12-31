import { BitacoraTipo } from '../dao/factory.js'
import BitacoraTipoRepository from '../repository/global.bitacora_tipo.repository.js'

export default class BitacoraTipoService {
    static getBitacoraTipoService(){
        try {
            return new BitacoraTipoRepository(new BitacoraTipo())
        }
        catch (error) {
            console.log(error)
        }
    }
}