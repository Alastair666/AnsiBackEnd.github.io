import { validationResult } from 'express-validator'
import PerfilService from '../services/seguridad.perfil.service.js'
//import passport from 'passport'
//import { generateToken } from '../middleware/auth.js'

export const createProfile = async (req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ errores: errores.array() });
        }
        const newProfile = req.body
        const result = await PerfilService.getPerfilService().create(newProfile)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the profile" })
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getProfileByName = async (req,res)=>{
    try {
        const name = req.params.name
        //console.log(req.params)
        //console.log(name)
        const result = await PerfilService.getPerfilService().getProfileByName(name)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the especified profile" })
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getAllProfiles = async (req,res)=>{
    try {
        const result = await PerfilService.getPerfilService().getAll()
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the especified profile" })
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}