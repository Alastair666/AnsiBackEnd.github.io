import { validationResult } from 'express-validator'
import DistritoService from '../services/operacion.distrito.service.js'
import CatalogoService from '../services/global.catalogo.service.js'

export const createDistrict = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })
        //Obteniendo Catalogo Activo
        const estatusDistrito = await CatalogoService.getCatalogoService().getCatalogByDescName('Estatus Distrito','Activo')
        const newDistrict = {
            id_estatus: estatusDistrito._id,
            descripcion: req.body.descripcion,
            abreviatura: req.body.abreviatura ? req.body.abreviatura : req.body.descripcion,
            fecha_fundacion: req.body.fecha_fundacion
        }
        const result = await DistritoService.getDistritoService().create(newDistrict)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the district" })
    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}

export const getDistrictById = async(req,res)=> {
    try {
        // Obteniendo ID del producto y parametros para actualizar
        let { uid } = req.params
        const result = await DistritoService.getDistritoService().getDistrictById(uid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the user" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}

export const updateDistrict = async(req,res)=> {
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Obteniendo ID del producto y parametros para actualizar
        let { did } = req.params
        let district = req.body
        let districtToReplace = {
            id: did,
            id_estatus: district.nombre,
            descripcion: district.descripcion,
            abreviatura: district.abreviatura,
            fecha_fundacion: district.fecha_fundacion
        }
        // Editando usuario en BD
        const result = await DistritoService.getDistritoService().update(did, districtToReplace)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't update the distric" })

    } catch (err) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}