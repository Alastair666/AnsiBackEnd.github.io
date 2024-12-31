import { Beneficiarios } from '../dao/factory.js'
import BeneficiariosRepository from '../repository/operacion.beneficiarios.repository.js'

export default class BeneficiariosService {
    static getBeneficiariosService(){
        try {
            return new BeneficiariosRepository(new Beneficiarios())
        }
        catch (error) {
            console.log(error)
        }
    }
}