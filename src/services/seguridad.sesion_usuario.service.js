import { SesionUsuario } from '../dao/factory.js'
import SesionUsuarioRepository from '../repository/seguridad.sesion_usuario.repository.js'

export default class SesionUsuarioService {
    static getSesionUsuarioService(){
        try {
            return new SesionUsuarioRepository(new SesionUsuario())
        }
        catch (error) {
            console.log(error)
        }
    }
}