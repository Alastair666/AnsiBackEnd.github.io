import { Usuario } from '../dao/factory.js'
import UsuarioRepository from '../repository/seguridad.usuario.repository.js'

export default class UsuarioService {
    static getUsuarioService(){
        try {
            return new UsuarioRepository(new Usuario())
        }
        catch (error) {
            console.log(error)
        }
    }
}