import GenericRepository from './generic.repository.js'

export default class UsuarioRepository extends GenericRepository {
    constructor(dao){
        super(dao)
    }
    getUserByEmail = (email) =>{
        return this.getBy({email});
    }
    getUserById = (id) =>{
        return this.getBy({_id:id})
    }
    getLoginUser = (email, password) =>{
        return this.dao.getLogin(email, password);
    }
}