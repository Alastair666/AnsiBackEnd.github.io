import GenericRepository from './generic.repository.js'

export default class DomicilioRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getAddressById = (id) =>{
        return this.getBy({_id:id})
    }
}