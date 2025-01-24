import { validationResult } from 'express-validator'
import DomicilioService from '../services/operacion.domicilio.service.js'
import CodigoPostalService from '../services/operacion.codigo_postal.service.js'
import CatalogoService from '../services/global.catalogo.service.js'
import { createCPtool } from './cp.controller.js'

export const createAddress = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })
        const { cp, colonia, calle, nombre, no_ext, no_int, id_pais, id_estado } = req.body
        // En caso de que no exista el código postal, se genera
        const cpFinal = await createCPtool(cp, id_pais, id_estado)
        if (cpFinal.result === "error")
            res.status(400).json(cpFinal)
        //Armando el objeto para la creación de la dirección
        const newAddress = {
            cp: cpFinal.payload._id,
            colonia: colonia,
            calle: calle,
            nombre: nombre,
            no_ext: no_ext,
            no_int: no_int
        }
        const result = await DomicilioService.getDomicilioService().create(newAddress)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the Address" })
    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const updateAddress = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })

        // Obteniendo ID de la dirección
        let { aid } = req.params
        const oldAddress = await DomicilioService.getDomicilioService().getAddressById(aid)
        if (oldAddress) {
            // Validando Campos de Catalogo
            const { cp, calle, colonia, nombre, no_int, no_ext, id_pais, id_estado } = req.body
            // En caso de que no exista el código postal, se genera
            const cpFinal = await createCPtool(cp, id_pais, id_estado)
            if (cpFinal.result === "error")
                res.status(400).json(cpFinal)
            
            //Armando el objeto para la creación de la dirección
            const newAddress = {
                cp: cpFinal.payload._id,
                colonia: colonia,
                calle: calle,
                nombre: nombre,
                no_ext: no_ext,
                no_int: no_int
            }
            const result = await DomicilioService.getDomicilioService().update(aid, newAddress)
            if (result) 
                res.status(200).json({ result: "success", payload: result })
            else 
                res.status(400).json({ result: "error", errors: "Can't create the Address" })
        }
        else
            res.status(400).json({ result: "error", errors: "Can't find the Address" })
    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getAddressById = async(req,res)=> {
    try {
        // Obteniendo ID de la dirección
        let { aid } = req.params
        const result = await DomicilioService.getDomicilioService().getAddressById(aid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the Address" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getAddress = async(req,res)=> {
    try {
        // Obteniendo ID del producto y parametros para actualizar
        const result = await DomicilioService.getDomicilioService().getAll()
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the Address" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const deleteAddressById = async(req,res)=> {
    try {
        // Obteniendo ID de la dirección
        let { aid } = req.params
        const address = await DomicilioService.getDomicilioService().getAddressById(aid)
        if (address) {
            const result = await DomicilioService.getDomicilioService().delete(aid)
            if (result) 
                res.status(200).json({ result: "success", payload: result })
            else 
                res.status(400).json({ result: "error", errors: "Can't delete the Address" })
        }
        else 
            res.status(400).json({ result: "error", errors: "Can't find the Address" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}