import { Tutores } from '../dao/factory.js'
import TutoresRepository from '../repository/operacion.tutores.repository.js'

export default class TutoresService {
    static getTutoresService(){
        try {
            return new TutoresRepository(new Tutores())
        }
        catch (error) {
            console.log(error)
        }
    }
}