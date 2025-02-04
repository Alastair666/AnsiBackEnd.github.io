import { validationResult } from 'express-validator'
import GrupoService from '../services/operacion.grupo.service.js'
import DistritoService from '../services/operacion.distrito.service.js'
import DomicilioService from '../services/operacion.domicilio.service.js'
import CatalogoService from '../services/global.catalogo.service.js'
import { createCPtool } from './cp.controller.js'

export const createGroup = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })

        // Validando Campos de Catalogo
        const { id_distrito, id_estatus, nombre, numero, domicilio, fecha_fundacion } = req.body
        const distrito = await DistritoService.getDistritoService().getBy({ _id: id_distrito })
        const estatus = await CatalogoService.getCatalogoService().getBy({ _id: id_estatus })
        if (distrito) {
            if (domicilio) {
                if (estatus) {
                    // En caso de que no exista el código postal, se genera
                    const cpFinal = await createCPtool(domicilio.cp, domicilio.id_pais, domicilio.id_estado)
                    if (cpFinal.result === "error")
                        res.status(400).json(cpFinal)
                    //Armando el objeto para la creación de la dirección
                    const newAddress = {
                        cp: cpFinal.payload._id,
                        colonia: domicilio.colonia,
                        calle: domicilio.calle,
                        nombre: domicilio.nombre,
                        no_ext: domicilio.no_ext,
                        no_int: domicilio.no_int
                    }
                    // Creando domicilio nuevo
                    const address = await DomicilioService.getDomicilioService().create(newAddress)
                    if (address) {
                        let newGroup = {
                            id_distrito: distrito._id,
                            id_estatus: estatus._id,
                            nombre: nombre ? nombre : '--',
                            numero: numero,
                            id_domicilio: address._id,
                            fecha_fundacion: fecha_fundacion
                        }
                        const result = await GrupoService.getGrupoService().create(newGroup)
                        if (result) 
                            res.status(200).json({ result: "success", payload: result })
                        else 
                            res.status(400).json({ result: "error", errors: "Can't create the Group" })
                    }
                    else
                        res.status(400).json({ result: "error", errors: "Can't create the address" })
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
            const { id_distrito, id_estatus, nombre, numero, fecha_fundacion } = req.body
            const distrito = id_distrito ? await DistritoService.getDistritoService().getBy({ _id: id_distrito }) : oldGroup.id_distrito
            const estatus = id_estatus ? await CatalogoService.getCatalogoService().getBy({ _id: id_estatus }): oldGroup.id_estatus
            if (distrito) {
                if (estatus) {
                    let newGroup = {
                        id_distrito: distrito._id,
                        id_estatus: estatus._id,
                        nombre: nombre ? nombre : oldGroup.nombre,
                        numero: numero ? numero : oldGroup.numero,
                        id_domicilio: oldGroup.id_domicilio,
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