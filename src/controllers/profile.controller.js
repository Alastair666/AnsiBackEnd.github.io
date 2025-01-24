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
export const getProfileById = async (req,res)=>{
    try {
        // Obteniendo ID del Perfil
        let { pid } = req.params
        const result = await PerfilService.getPerfilService().getProfileById(pid)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the especified profile" })
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const updateProfile = async (req,res)=>{
    try {
        // Obteniendo ID del Perfil
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ errores: errores.array() });
        }
        let { pid } = req.params
        const newProfile = req.body
        const profile = await PerfilService.getPerfilService().getProfileById(pid)
        if (profile) {
            const result = await PerfilService.getPerfilService().update(pid, newProfile)
            if (result) 
                res.status(200).json({ result: "success", payload: result })
            else 
                res.status(400).json({ result: "error", errors: "Can't find the profile" })
        }
        else 
            res.status(400).json({ result: "error", errors: "Can't get the especified profile" })
    } catch (ex) {
        res.status(500).json({ result: "error", errors: ex.message })
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