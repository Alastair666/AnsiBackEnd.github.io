import { ArchivoDrive } from '../dao/factory.js'
import ArchivoDriveRepository from '../repository/global.archivo_drive.repository.js'

export default class ArchivoDriveService {
    static getArchivoDriveService(){
        try {
            return new ArchivoDriveRepository(new ArchivoDrive())
        }
        catch (error) {
            console.log(error)
        }
    }
}