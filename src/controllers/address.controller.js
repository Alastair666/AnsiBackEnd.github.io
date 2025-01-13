import { validationResult } from 'express-validator'
import DomicilioService from '../services/operacion.domicilio.service.js'
import CodigoPostalService from '../services/operacion.codigo_postal.service.js'
import CatalogoService from '../services/global.catalogo.service.js'

export const createAddress = async(req,res)=> {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })
        let cpFinal
        const { cp, colonia, calle, nombre, no_ext, no_int, id_pais, id_estado } = req.body
        // En caso de que no exista el código postal, se genera
        const cpID = await CodigoPostalService.getCodigoPostalService().getByCP(cp)
        if (!cpID) {
            const c_estado = await CatalogoService.getCatalogoService().getBy({_id: id_estado})
            const pais = await CatalogoService.getCatalogoService().getBy({_id: id_pais})
            if (c_estado && pais) {
                newCP = {
                    cp: cp, 
                    c_estado: c_estado, 
                    id_pais: pais
                }
                cpFinal = await CodigoPostalService.getCodigoPostalService().create(newCP)
            }
            else
                res.status(400).json({ result: "error", errors: "Invalid Fields: id_pais or id_estado" })
        }
        else
            cpFinal = cpID

        //Armando el objeto para la creación de la dirección
        const newAddress = {
            cp: cpFinal._id,
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