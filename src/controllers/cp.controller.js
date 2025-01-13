import CodigoPostalService from '../services/operacion.codigo_postal.service.js'

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