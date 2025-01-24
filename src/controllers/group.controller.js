import { validationResult } from 'express-validator'
import GrupoService from '../services/operacion.grupo.service.js'
import DistritoService from '../services/operacion.distrito.service.js'
import DomicilioService from '../services/operacion.domicilio.service.js'
import CatalogoService from '../services/global.catalogo.service.js'

export const createGroup = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })

        // Validando Campos de Catalogo
        const { id_distrito, id_estatus, nombre, numero, id_domicilio, fecha_fundacion } = req.body
        const distrito = await DistritoService.getDistritoService().getBy({ _id: id_distrito })
        const domicilio = await DomicilioService.getDomicilioService().getBy({ _id: id_domicilio })
        const estatus = await CatalogoService.getCatalogoService().getBy({ _id: id_estatus })
        if (distrito) {
            if (domicilio) {
                if (estatus) {
                    let newGroup = {
                        id_distrito: distrito._id,
                        id_estatus: estatus._id,
                        nombre: nombre ? nombre : '--',
                        numero: numero,
                        id_domicilio: domicilio._id,
                        fecha_fundacion: fecha_fundacion
                    }
                    const result = await GrupoService.getGrupoService().create(newGroup)
                    if (result) 
                        res.status(200).json({ result: "success", payload: result })
                    else 
                        res.status(400).json({ result: "error", errors: "Can't create the Group" })
                }
                else
                    res.status(400).json({ result: "error", errors: "Invalid Fields: id_estatus" })
            }
            else
                res.status(400).json({ result: "error", errors: "Invalid Fields: id_domicilio" })
        }
        else
            res.status(400).json({ result: "error", errors: "Invalid Fields: id_distrito" })

    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const updateGroup = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })

        // Obteniendo ID del producto y parametros para actualizar
        let { gid } = req.params
        const oldGroup = await GrupoService.getGrupoService().getGroupById(gid)
        if (oldGroup) {
            // Validando Campos de Catalogo
            const { id_distrito, id_estatus, nombre, numero, id_domicilio, fecha_fundacion } = req.body
            const distrito = id_distrito ? await DistritoService.getDistritoService().getBy({ _id: id_distrito }) : oldGroup.id_distrito
            const domicilio = id_domicilio ? await DomicilioService.getDomicilioService().getBy({ _id: id_domicilio }) : oldGroup.id_domicilio
            const estatus = id_estatus ? await CatalogoService.getCatalogoService().getBy({ _id: id_estatus }): oldGroup.id_estatus
            if (distrito) {
                if (domicilio) {
                    if (estatus) {
                        let newGroup = {
                            id_distrito: distrito._id,
                            id_estatus: estatus._id,
                            nombre: nombre ? nombre : oldGroup.nombre,
                            numero: numero ? numero : oldGroup.numero,
                            id_domicilio: domicilio._id,
                            fecha_fundacion: fecha_fundacion ? fecha_fundacion : oldGroup.fecha_fundacion
                        }
                        const result = await GrupoService.getGrupoService().update(gid, newGroup)
                        if (result) 
                            res.status(200).json({ result: "success", payload: result })
                        else 
                            res.status(400).json({ result: "error", errors: "Can't update the Group" })
                    }
                    else
                        res.status(400).json({ result: "error", errors: "Invalid Fields: id_estatus" })
                }
                else
                    res.status(400).json({ result: "error", errors: "Invalid Fields: id_domicilio" })
            }
            else
                res.status(400).json({ result: "error", errors: "Invalid Fields: id_distrito" })
        }
        else
            res.status(400).json({ result: "error", errors: "Can't find the Group" })
    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getGroupById = async(req,res)=> {
    try {
        // Obteniendo ID del producto y parametros para actualizar
        let { gid } = req.params
        const result = await GrupoService.getGrupoService().getGroupById(gid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the group" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getGroup = async(req,res)=> {
    try {
        // Obteniendo ID del producto y parametros para actualizar
        const result = await GrupoService.getGrupoService().getAll()
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the group" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}