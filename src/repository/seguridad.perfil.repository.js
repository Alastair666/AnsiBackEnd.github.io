import GenericRepository from './generic.repository.js'

export default class PerfilRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getProfileByName = (name) =>{
        return this.getBy({nombre:name})
    }
    getProfileById = (id) =>{
        return this.getBy({_id:id})
    }
    validateAdminProfile = (id) =>{
        let adminProfile = ''
        const profile = this.getBy({_id:id})
        if (profile) {
            if (profile.administrador)
                adminProfile = 'admin'
        }
        return adminProfile
    }
}