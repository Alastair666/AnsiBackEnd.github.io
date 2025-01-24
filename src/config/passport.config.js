import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UsuarioService from '../services/seguridad.usuario.service.js'
import PerfilService from '../services/seguridad.perfil.service.js'
import PerfilUsuarioService from '../services/seguridad.perfil_usuario.service.js'
import jwt from 'passport-jwt'
import { isValidPassword } from '../middleware/auth.js'

// Cargar variables de entorno
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

// Función que extrae a cookie del encabezado de la petición
const cookieExtractor = (req)=>{
    let token = null
    if (req && req.cookies){
        let cookie = req.cookies
        token = cookie.jwt
    }
    return token
}

const initializePassport = ()=>{
    // Passport JWT
    const options = {
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }
    passport.use('jwt', new JWTStrategy(options, async(jwt_payload, done)=>{
        console.log('Entro a passport JWT')
        //console.log(process.env.JWT_SECRET)
        //console.log(jwt_payload)
        try {
            const user = await UsuarioService.getUsuarioService().getBy({email:jwt_payload.user.email})
            // Validando si el usuario tiene un perfil asignado
            const userProfile = await PerfilUsuarioService.getPerfilUsuarioService().getBy({ id_usuario: user._id, perfil_activo: true })
            
            if (!user && !userProfile) {
                return done(null, false, { message: 'User and/or Profile not found' });
            }
            let userFinal = {
                id: user._id,
                nombre: user.nombre,
                ap_paterno: user.ap_paterno,
                ap_materno: user.ap_materno,
                email: user.email,
                no_telefono: user.no_telefono,
                clave_acceso: user.clave_acceso,
                id_perfil: userProfile.id_perfil
            }
            return done(null, userFinal)//jwt_payload.user)
        } catch (error){
            console.error(error)
            return done(error)
        }
    }))//*/
    // Register User
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'clave_acceso'
    },  async(req,username,password,done)=>{
            const { nombre, ap_paterno, ap_materno, no_telefono, role } = req.body
            try {
                //Validando Campos Requeridos
                let resultado = false, msj_error = ''
                if (!nombre) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'first_name is required'
                if (!ap_paterno) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'last_name 1 is required'
                if (!ap_materno) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'last_name 2 is required'
                if (!no_telefono) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'phone number is required'
                if (!role) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'role is required'
                if (msj_error.trim() === '')
                    resultado = true
                console.warn(msj_error)
                //Validando resultado obtenido
                if (resultado) {
                    // Validando si el usuario ya existe
                    const duplicatedUser = await UsuarioService.getUsuarioService().getUserByEmail(username)
                    if (duplicatedUser)
                        return done(null, false, { message: `This email '${username}' is already in use` })
                    else
                        console.warn(`This email '${username}' is not in use`)

                    // Validando Perfil ingresado
                    const profile = await PerfilService.getPerfilService().getProfileById(role)
                    if (!profile)
                        return done(null, false, { message: `Cannot retrieve the specified profile` })
                    else
                        console.warn(`The profile: '${profile.nombre}' was successfully obtained`)
                    
                    //Creando registro de usuario
                    const newUser = {
                        nombre: nombre, 
                        ap_paterno: ap_paterno,
                        ap_materno: ap_materno,
                        email: username,
                        no_telefono: no_telefono, 
                        clave_acceso: password
                    }
                    let result = await UsuarioService.getUsuarioService().create(newUser)
                    if (result) {
                        console.log(`User created successfully`)
                        const user = await UsuarioService.getUsuarioService().getUserByEmail(username)
                        if (user) {
                            let newUserProfile = { 
                                id_perfil: profile._id,
                                id_usuario: user._id,
                                perfil_activo: true
                            }
                            const userProfile = await PerfilUsuarioService.getPerfilUsuarioService().create(newUserProfile)
                            if (userProfile) {
                                console.log(`User profile created successfully`)
                                let userprofile = {
                                    id: user._id,
                                    nombre: user.nombre,
                                    ap_paterno: user.ap_paterno,
                                    ap_materno: user.ap_materno,
                                    email: user.email,
                                    no_telefono: user.no_telefono,
                                    //clave_acceso: user.clave_acceso,
                                    id_perfil: profile._id
                                }
                                return done(null, userprofile)
                            }
                            else
                                return done(null, false, { message: `Error assigning profile to user` })
                        }
                        else
                            return done(null, false, { message: `Error getting created user` })
                    }
                    else
                        return done(null, false, { message: `Error creating user` })
                } else {
                    return done(null, false, { message: msj_error })
                }
            }
            catch (err) {
                console.log(err)
                return done(null, false, { message: err })
            }
    }))
    // Log User
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'clave_acceso'
    }, async (username, password, done)=>{
        try {
            //Consultando email en uso
            //console.log(`User: ${username} trying to login with Password: ${password}`)
            const user = await UsuarioService.getUsuarioService().getLoginUser(username, password)
            if (!user) return done(null, false, { message: `This email '${username}' doesn't exists!` })
            //Validando contraseña
            if (!isValidPassword(user, password)) return done(null, false, { message: `The password is incorrect.` })
            // Validando si el usuario tiene un perfil asignado
            const userProfile = await PerfilUsuarioService.getPerfilUsuarioService().getBy({ id_usuario: user._id, perfil_activo: true })
            if (!userProfile) return done(null, false, { message: `User profile not assigned` })
            //console.log(userProfile)
            let userFinal = {
                id: user._id,
                nombre: user.nombre,
                ap_paterno: user.ap_paterno,
                ap_materno: user.ap_materno,
                email: user.email,
                no_telefono: user.no_telefono,
                clave_acceso: user.clave_acceso,
                id_perfil: userProfile.id_perfil
            }
            //console.log(userFinal)
            //Devolviendo resultado obtenido
            return done(null, userFinal)
        } catch (err) {
            console.error(err)
            return done(err)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        const userBD = await UsuarioService.getUsuarioService().findById(id)
        // Validando si el usuario tiene un perfil asignado
        const userProfile = await PerfilUsuarioService.getPerfilUsuarioService().getBy({ id_usuario: user._id, perfil_activo: true })
        let user = {
            id: userBD._id,
            nombre: userBD.nombre,
            ap_paterno: userBD.ap_paterno,
            ap_materno: userBD.ap_materno,
            email: userBD.email,
            no_telefono: userBD.no_telefono,
            clave_acceso: userBD.clave_acceso,
            id_perfil: userProfile.id_perfil
        }
        done(null, user)
    })
}

export default initializePassport