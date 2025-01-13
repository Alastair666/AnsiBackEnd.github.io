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