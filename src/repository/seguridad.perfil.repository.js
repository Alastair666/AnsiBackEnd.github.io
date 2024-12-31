import GenericRepository from "./GenericRepository.js";

export default class PerfilRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getProfileByName = (name) =>{
        return this.getBy({nombre:name});
    }
    getProfileById = (id) =>{
        return this.getBy({_id:id})
    }
}