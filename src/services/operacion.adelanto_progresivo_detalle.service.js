import { AdelantoProgresivoDetalle } from '../dao/factory.js'
import AdelantoProgresivoDetalleRepository from '../repository/operacion.adelanto_progresivo_detalle.repository.js'

export default class AdelantoProgresivoDetalleService {
    static getAdelantoProgresivoDetalleService(){
        try {
            return new AdelantoProgresivoDetalleRepository(new AdelantoProgresivoDetalle())
        }
        catch (error) {
            console.log(error)
        }
    }
}