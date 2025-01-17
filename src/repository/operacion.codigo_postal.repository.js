import GenericRepository from './generic.repository.js'

export default class CodigoPostalRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getByCP = (cp)=>{
        return this.dao.getByCP(cp)
    }
}