import GenericRepository from './generic.repository.js'

export default class PerfilAccionesRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getProfileActionById = (id) =>{
        return this.getBy({_id:id})
    }
}