import { validationResult } from 'express-validator'
import UsuarioService from '../services/seguridad.usuario.service'
import passport from 'passport'
import { generateToken } from '../middleware/auth.js'

export const createUser = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ errores: errores.array() });
        }
        const newUser = req.body
        const result = await UsuarioService.getUsuarioService().create(newUser)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the user" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getUserById = async(req,res)=>{
    try {
        // Obteniendo ID del producto y parametros para actualizar
        let { uid } = req.params
        const result = await UsuarioService.getUsuarioService().getUserById(uid)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't find the user" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
