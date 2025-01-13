import GenericRepository from './generic.repository.js'

export default class GrupoRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getGroupById = (id) =>{
        return this.getBy({_id:id})
    }
}