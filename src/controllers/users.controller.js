import { validationResult } from 'express-validator'
import UsuarioService from '../services/seguridad.usuario.service.js'
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
export const getRegister = async(req, res, next) =>{
    passport.authenticate('register', { session: false, failureRedirect: '/failregister' }, async(err, user, info)=>{
        try {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            //console.log(user)
            res.send({ status: "success", user })
        }
        catch (ex){
            res.status(400).json({ result: "error", errors: ex.message })
        }
    })(req, res, next)
}
export const getLoginUser = async(req, res, next) =>{
    passport.authenticate('login', { session: false, failureRedirect: '/faillogin' }, async(err, user, info)=>{
        try {
            //console.log(`Error: ${err}`)
            //console.log(`User: ${user}`)
            //console.log(`Info: ${info}`)
            if (err) return next(err);
            if (!user) 
                return res.status(401).json({ message: info.message })
            const token = generateToken(user)
            //httpOnly: true, -- Para que el navegador pueda acceder a la cookie se omite el valor
            res.cookie("jwt", token, { secure: true, sameSite: 'Strict' })
            console.log(`Token en user/login: ${token}`)
            //console.log(userFinal)
            res.send({ status: "success", user : {
                id: user.id,
                nombre: user.nombre,
                ap_paterno: user.ap_paterno,
                ap_materno: user.ap_materno,
                email: user.email,
                no_telefono: user.no_telefono,
                clave_acceso: user.clave_acceso,
                id_perfil: user.id_perfil
            }})
        }
        catch (ex){
            console.log(ex)
            res.status(400).json({ result: "error", errors: ex.message })
        }
    })(req, res, next)
}
export const updateUser = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Obteniendo ID del producto y parametros para actualizar
        let { uid } = req.params
        let user = req.body
        let userToReplace = {
            id: user._id,
            nombre: user.nombre,
            ap_paterno: user.ap_paterno,
            ap_materno: user.ap_materno,
            email: user.email,
            no_telefono: user.no_telefono,
            clave_acceso: user.clave_acceso
        }
        // Editando usuario en BD
        const result = await UsuarioService.getUsuarioService.update(uid, userToReplace)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the user" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const deleteUser = async(req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ result: "error", errors: errores.array() });
        }
        // Obteniendo ID del producto y parametros para actualizar
        let { uid } = req.params
        // Editando usuario en BD
        const result = await UsuarioService.getUsuarioService().delete(uid)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the user" })
    }
    catch (ex){
        res.status(400).json({ result: "error", errors: ex.message })
    }
}