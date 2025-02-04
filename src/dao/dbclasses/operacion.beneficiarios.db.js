import beneficiaryModel from '../models/operacion.beneficiarios.js'
import GenericDB from './generic.db.js'

export default class BeneficiarioDB extends GenericDB {
    constructor() {
        super(beneficiaryModel)
    }
}