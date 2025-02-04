import GenericRepository from './generic.repository.js'

export default class TablaRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getTableById = (id) =>{
        return this.getBy({_id:id})
    }
}