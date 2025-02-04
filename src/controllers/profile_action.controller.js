import { validationResult } from 'express-validator'
import PerfilAccionesService from '../services/seguridad.perfil_acciones.service.js'
import PerfilService from '../services/seguridad.perfil.service.js'
import TablaService from '../services/global.tabla.service.js'

export const createProfileAction = async (req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ errores: errores.array() });
        }
        //Validando si el perfil es valido
        const { id_perfil, id_entidad_accion, actions } = req.body
        const perfil = await PerfilService.getPerfilService().getProfileById(id_perfil)
        if (!perfil)
            res.status(400).json({ result: "error", errors: "The profile is invalid" })
        const entidad = await TablaService.getTablaService().getTableById(id_entidad_accion)
        if (!entidad)
            res.status(400).json({ result: "error", errors: "The entity is invalid" })
        
        //console.log(perfil)
        //console.log(entidad)
        //Creando acción del perfil
        const newActionProfile = {
            id_perfil: perfil._id,
            id_entidad_accion: entidad._id,
            acciones: actions
        }
        //console.log(newActionProfile)
        const result = await PerfilAccionesService.getPerfilAccionesService().create(newActionProfile)
        if (result)
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't create the profile action" })//*/
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const getProfileActionById = async (req,res)=>{
    try {
        // Obteniendo ID del Perfil
        let { pid } = req.params
        const result = await PerfilAccionesService.getPerfilAccionesService().getProfileActionById(pid)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the especified profile action" })
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}
export const updateProfileAction = async (req,res)=>{
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(401).json({ errores: errores.array() });
        }
        // Obteniendo ID del Perfil
        let { pid } = req.params
        //Validando si el perfil es valido
        const { id_perfil, id_entidad_accion, actions } = req.body
        const perfil = await PerfilService.getPerfilService().getProfileById(id_perfil)
        if (!perfil)
            res.status(400).json({ result: "error", errors: "The profile is invalid" })
        const entidad = await TablaService.getTablaService().getTableById(id_entidad_accion)
        if (!entidad)
            res.status(400).json({ result: "error", errors: "The entity is invalid" })
        
        //Creando acción del perfil
        const newActionProfile = {
            id_perfil: perfil._id,
            id_entidad_accion: entidad._id,
            acciones: actions
        }
        //console.log(newActionProfile)
        const result = await PerfilAccionesService.getPerfilAccionesService().update(pid, newActionProfile)
        //console.log(result)
        if (result) 
            res.status(200).json({ result: "success", payload: result })
        else 
            res.status(400).json({ result: "error", errors: "Can't get the especified profile action" })
    } catch (ex) {
        res.status(400).json({ result: "error", errors: ex.message })
    }
}