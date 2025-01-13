import GenericRepository from './generic.repository.js'

export default class CatalogoRepository extends GenericRepository {
    constructor(dao){
        super(dao);
    }
    getCatalogByDescType = (description_type) => {
        return this.dao.getCatalogByType(description_type)
    }
    getCatalogByDescType = (description_type, id_catalogo_superior) => {
        return this.dao.getCatalogByType(description_type, id_catalogo_superior)
    }
    getCatalogByDescName = (description_type, description) => {
        return this.dao.getCatalogByName(description_type, description)
    }
    getCatalogByTypeAndAlterValue = (description_type, alter_value) => {
        return this.dao.getCatalogByTypeAndAlterValue(description_type, alter_value)
    }
}