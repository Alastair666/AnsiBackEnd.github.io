import GenericRepository from './generic.repository.js'

export default class DistritoRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getDistrictById = (id) =>{
        return this.getBy({_id:id})
    }
}