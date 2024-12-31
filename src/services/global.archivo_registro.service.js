import { ArchivoRegistro } from '../dao/factory.js'
import ArchivoRegistroRepository from '../repository/global.archivo_registro.repository.js'

export default class ArchivoRegistroService {
    static getArchivoRegistroService(){
        try {
            return new ArchivoRegistroRepository(new ArchivoRegistro())
        }
        catch (error) {
            console.log(error)
        }
    }
}