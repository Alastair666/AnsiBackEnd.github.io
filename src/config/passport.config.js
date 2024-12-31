import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import UsuarioService from '../services/seguridad.usuario.service'
import PerfilService from '../services/seguridad.perfil.service.js'
import PerfilUsuarioService from '../services/seguridad.perfil.usuario.service.js'
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
        //console.log(jwt_payload)
        try {
            const user = await UsuarioService.getUsuarioService().getUserById(jwt_payload.user.id)
            //console.log(user)
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            return done(null, user)//jwt_payload.user)
        } catch (error){
            console.error(error)
            return done(error)
        }
    }))//*/
    // Register User
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    },  async(req,username,password,done)=>{
            const { first_name, last_name1, last_name2, phone_number, role } = req.body
            try {
                //Validando Campos Requeridos
                let resultado = false, msj_error = ''
                if (!first_name) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'first_name is required'
                if (!last_name1) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'last_name 1 is required'
                if (!last_name2) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'last_name 2 is required'
                if (!phone_number) msj_error += (!(msj_error.trim() === '') ? '\n' : '') + 'phone number is required'
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
                        nombre: first_name, 
                        ap_paterno: last_name1,
                        ap_materno: last_name2,
                        email: username,
                        no_telefono: phone_number, 
                        clave_acceso: password
                    }
                    let result = await UsuarioService.getUsuarioService().createUser(newUser)
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
                            if (userProfile)
                                return done(null, result)
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
        passwordField: 'password'
    }, async (username, password, done)=>{
        try {
            //Consultando email en uso
            const user = await UsuarioService.getUsuarioService().getLoginUser(username, password)
            if (!user) return done(null, false, { message: `This email '${username}' doesn't exists!` })
            //Validando contraseña
            if (!isValidPassword(user, password)) return done(null, false, { message: `The password is incorrect.` })
            //Devolviendo resultado obtenido
            return done(null, user)
        } catch (err) {
            console.error(err)
            return done(err)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        let user = await userService.findById(id)
        done(null, user)
    })
}

export default initializePassport