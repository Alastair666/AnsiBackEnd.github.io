import CodigoPostalService from '../services/operacion.codigo_postal.service.js'
import CatalogoService from '../services/global.catalogo.service.js'

export const createCPtool = async (cp, id_pais, id_estado) => {
    let retorno
    try {
        // Validando CP
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
                const cpFinal = await CodigoPostalService.getCodigoPostalService().create(newCP)
                if (cpFinal) 
                    retorno = { result: "success", payload: cpFinal }
                else 
                    retorno = { result: "error", errors: "Can't create the Address" }
            }
            else
                retorno = { result: "error", errors: "Invalid Fields: id_pais or id_estado" }
        }
        else
            retorno = { result: "success", payload: cpID }
    } catch (ex) {
        retorno = { result: "error", errors: ex.message }
    }
    // Devolviendo resultado obtenido
    return retorno
}

export const createCP = async (req, res) => {
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })

        const { cp, id_pais, id_estado } = req.body
        // Validando CP
        const cpID = await createCPtool(cp, id_pais, id_estado)
        if (cpID.result === "success")
            return res.status(200).json(cpID)
        else
            return res.status(400).json(cpID)
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}

export const getPostalCode = async(req,res)=> {
    try {
        // Obteniendo ID del producto y parametros para actualizar
        let { cp } = req.params
        const result = await CodigoPostalService.getCodigoPostalService().getByCP(cp)
        //console.log(`CP: ${cp} - Resultado: ${JSON.stringify(result)}`)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the Postal Code" })
    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}