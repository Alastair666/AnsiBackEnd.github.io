import GenericRepository from './generic.repository.js'

export default class BeneficiariosRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getBeneficiaryById = (id) =>{
        return this.getBy({_id:id})
    }
    getBeneficiaryByClaveMem = (clave) =>{
        return this.getBy({clave_mem:clave})
    }
}