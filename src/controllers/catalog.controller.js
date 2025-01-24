import { validationResult } from 'express-validator'
import CatalogService from '../services/global.catalogo.service.js'

export const getCatalogByTypeName = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })
        
        /** TODO: Implementar la lógica para obtener el catálogo por nombre */
        const catalog = req.body
        const result = await CatalogService.getCatalogoService().getCatalogByDescType(catalog.description_type, catalog.id_catalogo_superior)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the catalog" })
    } catch (ex){
        console.log(ex)
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getCatalogByTypeAndDescName = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })
        
        /** TODO: Implementar la lógica para obtener el catálogo por nombre */
        const catalog = req.body
        const result = await CatalogService.getCatalogoService().getCatalogByDescName(catalog.description_type, catalog.description)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the catalog" })
    } catch (ex){
        console.log(ex)
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getCatalogByTypeAndAlterValue = async(req,res)=>{
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })
        
        /** TODO: Implementar la lógica para obtener el catálogo por nombre */
        const catalog = req.body
        const result = await CatalogService.getCatalogoService().getCatalogByTypeAndAlterValue(catalog.description_type, catalog.alter_value)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the catalog" })
    } catch (ex){
        console.log(ex)
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getCatalogByID = async(req,res)=>{
    try {
        // Obteniendo ID del producto y parametros para actualizar
        let { cid } = req.params
        const result = await CatalogService.getCatalogoService().getBy({ _id: cid })
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the catalog" })
    } catch (ex){
        console.log(ex)
        res.status(400).json({ result: "error", errors: ex.message })
    }
}