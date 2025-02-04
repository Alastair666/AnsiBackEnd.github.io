import { validationResult } from 'express-validator'
import BeneficiarioService from '../services/operacion.beneficiarios.service.js'
import DistritoService from '../services/operacion.distrito.service.js'
import DomicilioService from '../services/operacion.domicilio.service.js'
import CatalogoService from '../services/global.catalogo.service.js'
import { createCPtool } from './cp.controller.js'

export const createBeneficiary = async(req,res)=>{
    try {
        const errores = validationResult(req)
        if (!errores.isEmpty())
            return res.status(401).json({ errores: errores.array() })

        //

        // Validando Campos de Catalogo
        const { id_tipo, previo, id_distrito, domicilio, curp, ap_paterno, ap_materno, nombre, fecha_nac, 
            id_genero, id_tipo_seguro, no_afiliacion, clave_mem, fecha_ingreso } = req.body
        const distrito = await DistritoService.getDistritoService().getBy({ _id: id_distrito })
        const tipo = await CatalogoService.getCatalogoService().getBy({ _id: id_tipo })
        const genero = await CatalogoService.getCatalogoService().getBy({ _id: id_genero })
        const tipo_seguro = await CatalogoService.getCatalogoService().getBy({ _id: id_tipo_seguro })
        if (distrito) {
            if (tipo) {
                if (genero) {
                    if (tipo_seguro) {
                        let cm = ''
                        if (previo)
                            cm = clave_mem    
                        else {
                            const gen = genero.valor_alterno === 'MAS' ? 'H' : 'F'
                            const fec_ing = new Date(fecha_ingreso)
                            const añoCompleto = fec_ing.getFullYear()
                            cm = `${distrito.valor_alterno}${curp.substring(0, 10)}${gen}-${añoCompleto.toString().slice(-2)}`
                        }

                        // Validando registro previo
                        const beneficiarioPrevio = await BeneficiarioService.getBeneficiariosService().getBeneficiaryByClaveMem(cm)
                        if (beneficiarioPrevio)
                            res.status(400).json({ result: "error", errors: `The CM: ${cm} already exists` })
                        
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
                            let newBeneficiary = {
                                id_tipo: tipo._id,
                                id_domicilio: address.id_domicilio,
                                curp: curp,
                                ap_paterno: ap_paterno, 
                                ap_materno: ap_materno, 
                                nombre: nombre, 
                                fecha_nac: fecha_nac,
                                id_genero: genero._id,
                                id_tipo_seguro: tipo_seguro._id,
                                no_afiliacion: no_afiliacion,
                                clave_mem: cm,
                                fecha_ingreso: fecha_ingreso
                            }
                            const result = await BeneficiarioService.getBeneficiariosService().create(newBeneficiary)
                            if (result) 
                                res.status(200).json({ result: "success", payload: result })
                            else 
                                res.status(400).json({ result: "error", errors: "Can't create the Beneficiary" })
                        }
                        else
                            res.status(400).json({ result: "error", errors: "Can't create the address" })
                    }
                    else
                        res.status(400).json({ result: "error", errors: "Invalid Fields: id_tipo_seguro" })
                }
                else
                    res.status(400).json({ result: "error", errors: "Invalid Fields: id_genero" })
            }
            else
                res.status(400).json({ result: "error", errors: "Invalid Fields: id_tipo" })
        }
        else
                res.status(400).json({ result: "error", errors: "Invalid Fields: id_distrito" })
    } catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}