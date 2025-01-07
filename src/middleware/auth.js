import bcrypt from 'bcryptjs'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import PerfilDB from '../dao/dbclasses/seguridad.perfil.db.js'

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
export const authorization = (role) => {
    return async (req, res, next) => {
        //console.log(`Entra en autorización: ${req.user.id}`)
        try {
            //Validando Token en encabezado
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) 
                return res.status(401).json({ message: 'Access denied!, no token provide.' })
            //Validando decodificación de token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            if (!decoded) 
                return res.status(401).send({ error: "Unauthorized" })
            else
                req.user = decoded.user;
            // Validando perfil de administrador
            if (role === 'admin') {
                const perfildb = new PerfilDB()
                const perfil = await perfildb.findById(req.user.id_perfil)
                if (perfil) {
                    let admin = perfil.administrador ? 'admin' : 'user'
                    if (admin !== role)
                        return res.status(403).send({ error: "No permission" })
                }
                else return res.status(403).send({ error: "Profile not found" })
            }
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