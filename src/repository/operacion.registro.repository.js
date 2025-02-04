import GenericRepository from './generic.repository.js'

export default class RegistroRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getRecordById = (id) =>{
        return this.getBy({_id:id})
    }
}