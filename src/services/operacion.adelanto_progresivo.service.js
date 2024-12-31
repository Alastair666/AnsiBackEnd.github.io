import { AdelantoProgresivo } from '../dao/factory.js'
import AdelantoProgresivoRepository from '../repository/operacion.adelanto_progresivo.repository.js'

export default class AdelantoProgresivoService {
    static getAdelantoProgresivoService(){
        try {
            return new AdelantoProgresivoRepository(new AdelantoProgresivo())
        }
        catch (error) {
            console.log(error)
        }
    }
}