import { PerfilUsuario } from '../dao/factory.js'
import PerfilUsuarioRepository from '../repository/seguridad.perfil_usuario.repository.js'

export default class PerfilUsuarioService {
    static getPerfilUsuarioService(){
        try {
            return new PerfilUsuarioRepository(new PerfilUsuario())
        }
        catch (error) {
            console.log(error)
        }
    }
}