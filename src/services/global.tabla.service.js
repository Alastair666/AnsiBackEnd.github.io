import { Tabla } from '../dao/factory.js'
import TablaRepository from '../repository/global.tabla.repository.js'

export default class TablaService {
    static getTablaService(){
        try {
            return new TablaRepository(new Tabla())
        }
        catch (error) {
            console.log(error)
        }
    }
}