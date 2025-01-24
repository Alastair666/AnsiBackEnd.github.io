import catalogModel from '../models/global.catalogo.js'
import catalogTypeModel from '../models/global.catalogo_tipo.js'
import GenericDB from './generic.db.js'

export default class CatalogoDB extends GenericDB {
    constructor() {
        super(catalogModel)
    }
    // Obtiene todos los catalogos dado un id de tipo
    async getCatalogByType(description_type, id_catalogo_superior = null) {
        try {
            const catalogType = await catalogTypeModel.findOne({ descripcion: description_type })
            if (!catalogType)
                return []
            let query
            if (id_catalogo_superior)
                query = { id_catalogo_tipo: catalogType._id, id_catalogo_superior: id_catalogo_superior }
            else
                query = { id_catalogo_tipo: catalogType._id }
            const catalog = await this.model.find(query)
            if (!catalog)
                return []
            return catalog
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getCatalogByName(description_type, description) {
        try {
            const catalogType = await catalogTypeModel.findOne({ descripcion: description_type })
            if (!catalogType)
                return []
            //const catalog = await this.model.findOne({ id_catalogo_tipo: catalogType._id })
            const catalog = await this.model.findOne({ 
                id_catalogo_tipo: catalogType._id,
                descripcion: description
            })
            if (!catalog)
                return []
            return catalog
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getCatalogByTypeAndAlterValue(description_type, alter_value) {
        try {
            const catalogType = await catalogTypeModel.findOne({ descripcion: description_type })
            if (!catalogType)
                return []
            const catalog = await this.model.findOne({ 
                id_catalogo_tipo: catalogType._id,
                valor_alterno: alter_value
            })
            if (!catalog)
                return []
            return catalog
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}