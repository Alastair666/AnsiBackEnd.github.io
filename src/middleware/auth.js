import bcrypt from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { deepEqual } from '../utils.js'
import TablaDB from '../dao/dbclasses/global.tabla.db.js'
import PerfilDB from '../dao/dbclasses/seguridad.perfil.db.js'
import PerfilAccionesDB from '../dao/dbclasses/seguridad.perfil_acciones.db.js'

/**
 * Funciones de encriptación para la contraseña
 * **/
export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
export const isValidPassword = (user, password) => {
    //console.log(`User Pass: ${user.clave_acceso}, Password: ${password}`)
    return bcrypt.compareSync(password, user.clave_acceso)
}

/**
 * Funciones para autenticar la petición
 * **/
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            //console.log(`Error: ${err}\nUser: ${user}\nInfo: ${info}`)
            if (err) {
                //console.log(err)
                return next(err)
            }
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            //console.log(`JWT Authentication!`)
            //console.log(req.user)
            next()
        })(req, res, next)
    }
}
/**
 * Funciones para autorizar la solicitud
 * **/
export const authorization = (options) => {
    return async (req, res, next) => {
        //console.log(`Entra en autorización: ${req.user.id}`)
        try {
            //Validando Token en encabezado
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) 
                return res.status(401).json({ message: 'Access denied!, no token provide.' })
            //Validando decodificación de token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(decoded)
            if (!decoded) 
                return res.status(401).send({ error: "Unauthorized" })
            else
                req.user = decoded.user;
            //console.log(options)
            
            let errors = [], permissions = null, entity = null
            const entityDB = new TablaDB()
            if (!(options.role))
                errors.push('No role found.')
            if (!(options.entity))
                errors.push('No entity found.')
            else {
                entity = await entityDB.getEntityByAlias(options.entity)
                //console.log(entity)
                if (!entity)
                    errors.push('The provided entity is invalid.')
            }
            if (!(options.actions))
                errors.push('No actions found.')
            else {
                permissions = accessConfig(options.actions)
                if (!permissions)
                    errors.push(`The action's config, is invalid`)
            }
            if (errors.length > 0)
                return res.status(401).send({ error: errors.join(' ') })
            
            // Validando ROL asignado
            let admin = options.role === 'admin', resultRole = false
            const perfildb = new PerfilDB()
            const perfil = await perfildb.findById(req.user.id_perfil)
            if (perfil) {
                // Validando si el perfil requiere un administrador
                if (admin) {
                    if (!perfil.administrador)
                        return res.status(403).json({ message: 'Access denied!, you are not an admin'})
                    resultRole = true
                } else resultRole = true
                // Validando las acciones permitidas del perfil
                if (resultRole && !perfil.administrador) {
                    const perfilAcciondb = new PerfilAccionesDB()
                    const perfilAccion = await perfilAcciondb.getBy({
                        id_entidad_accion: entity._id,
                        id_perfil: perfil.id_perfil
                    })
                    if (perfilAccion) {
                        //Validando Configuracion
                        switch (options.actions) {
                            case 'onlyRead':
                                if (!(perfilAccion.acciones.Read == permissions.Read))
                                    return res.status(403).send({ error: `No permission to read ${entity.alias}` })
                                break
                            case 'onlyCreate':
                                if (!(perfilAccion.acciones.Create == permissions.Create))
                                    return res.status(403).send({ error: `No permission to create ${entity.alias}` })
                                break
                            case 'onlyUpdate':
                                if (!(perfilAccion.acciones.Update == permissions.Update))
                                    return res.status(403).send({ error: `No permission to update ${entity.alias}` })
                                break
                            case 'onlyDelete':
                                if (!(perfilAccion.acciones.Delete == permissions.Delete))
                                    return res.status(403).send({ error: `No permission to delete ${entity.alias}` })
                                break
                            case 'full':
                                if (!deepEqual(options.permissions, perfilAccion.acciones))
                                    return res.status(403).send({ error: `No ${options.actions} permissions to manage ${entity.alias}` })
                                break
                            default:
                                return res.status(403).send({ error: `${options.actions} isn't a permission defined for ${entity.alias}` })
                        }
                    } else return res.status(403).send({ error: "Action's Profile not found" })
                }
            } else return res.status(403).send({ error: "Profile not found" })
            next()
        } catch (err) {
            console.error(err)
            return res.status(401).json({ message: `Invalid Token. ${err.message}` });
        }
    }
}
/**
 * Funciones para gestionar el token JWT
 * **/
export const generateToken = (user) => {
    return jwt.sign({ 
        user: {
            id: user._id, 
            nombre: user.nombre, 
            ap_paterno: user.ap_paterno,
            ap_materno: user.ap_materno,
            email: user.email, 
            no_telefono: user.no_telefono,
            clave_acceso: user.clave_acceso,
            id_perfil: user.id_perfil
        }
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
}
export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provide.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token.' });
    }
}
/**
 * Funciones para gestionar el acceso a los perfiles
 * **/
export const accessConfig = (config) => {
    let permissions = {}
    // Validando configuración solicitada
    switch (config) {
        case 'full': 
            permissions = { Create: true, Read: true, Update: true, Delete: true }
            break
        case 'onlyRead': 
            permissions = { Create: false, Read: true, Update: false, Delete: false }
            break
        case 'onlyCreate': 
            permissions = { Create: true, Read: false, Update: false, Delete: false }
            break
        case 'onlyUpdate': 
            permissions = { Create: false, Read: false, Update: true, Delete: false }
            break
        case 'onlyDelete': 
            permissions = { Create: false, Read: false, Update: false, Delete: true }
            break
        case 'manageRecord': 
            permissions = { Create: true, Read: true, Update: true, Delete: false }
            break
        default:
            permissions = null
            //permissions = { Create: false, Read: false, Update: false, Delete: false }
            break
    }
    return permissions
}