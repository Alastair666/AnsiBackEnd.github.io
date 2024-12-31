import config from '../config/persistence.config.js'

export let ArchivoDrive
export let ArchivoRegistro
export let BitacoraTipo
export let Bitacora
export let CatalogoTipo
export let Catalogo
export let Tabla
export let AdelantoProgresivo
export let AdelantoProgresivoDetalle
export let Adelantos
export let Beneficiarios
export let CodigoPostal
export let Distrito
export let Domicilio
export let Grupo
export let Registro
export let Retos
export let Seccion
export let Tutores
export let PerfilAcceso
export let PerfilAccesoDetalle
export let PerfilAcciones
export let PerfilUsuario
export let Perfil
export let SesionUsuario
export let Usuario

async function inicializaRepositorios(){
    switch (config.persistence){
        case 'MONGODB': {
            // Obteniendo instancia de base de datos
            const { default: ArchivoDriveDB } = await import('./dbclasses/global.archivo_drive.db.js')
            const { default: ArchivoRegistroDB } = await import('./dbclasses/global.archivo_registro.db.js')
            const { default: BitacoraTipoDB } = await import('./dbclasses/global.bitacora_tipo.db.js')
            const { default: BitacoraDB } = await import('./dbclasses/global.bitacora_tipo.db.js')
            const { default: CatalogoTipoDB } = await import('./dbclasses/global.catalogo_tipo.db.js')
            const { default: CatalogoDB } = await import('./dbclasses/global.catalogo_tipo.db')
            const { default: TablaDB } = await import('./dbclasses/global.tabla.db.js')
            const { default: AdelantoProgresivoDetalleDB } = await import('./dbclasses/operacion.adelanto_progresivo_detalle.db.js')
            const { default: AdelantoProgresivoDB } = await import('./dbclasses/operacion.adelanto_progresivo.db.js')
            const { default: AdelantosDB } = await import('./dbclasses/operacion.adelantos.db.js')
            const { default: BeneficiariosDB } = await import('./dbclasses/operacion.beneficiarios.db.js')
            const { default: CodigoPostalDB } = await import('./dbclasses/operacion.codigo_postal.db.js')
            const { default: DistritoDB } = await import('./dbclasses/operacion.distrito.db.js')
            const { default: DomicilioDB } = await import('./dbclasses/operacion.domicilio.db.js')
            const { default: GrupoDB } = await import('./dbclasses/operacion.grupo.db.js')
            const { default: RegistroDB } = await import('./dbclasses/operacion.registro.db.js')
            const { default: RetosDB } = await import('./dbclasses/operacion.retos.db.js')
            const { default: SeccionDB } = await import('./dbclasses/operacion.seccion.db.js')
            const { default: TutoresDB } = await import('./dbclasses/operacion.tutores.db.js')
            const { default: PerfilAccesoDB } = await import('./dbclasses/seguridad.perfil_acceso.db.js')
            const { default: PerfilAccesoDetalleDB } = await import('./dbclasses/seguridad.perfil_acceso_definicion.db.js')
            const { default: PerfilAccionesDB } = await import('./dbclasses/seguridad.perfil_acciones.db.js')
            const { default: PerfilUsuarioDB } = await import('./dbclasses/seguridad.perfil_usuario.db.js')
            const { default: PerfilDB } = await import('./dbclasses/seguridad.perfil.db.js')
            const { default: SesionUsuarioDB } = await import('./dbclasses/seguridad.sesion_usuario.db.js')
            const { default: UsuarioDB } = await import('./dbclasses/seguridad.usuario.db.js')
            // Asignando instancias a variables
            ArchivoDrive = ArchivoDriveDB
            ArchivoRegistro = ArchivoRegistroDB
            BitacoraTipo = BitacoraTipoDB
            Bitacora = BitacoraDB
            CatalogoTipo = CatalogoTipoDB
            Catalogo = CatalogoDB
            Tabla = TablaDB
            AdelantoProgresivoDetalle = AdelantoProgresivoDetalleDB
            AdelantoProgresivo = AdelantoProgresivoDB
            Adelantos = AdelantosDB
            Beneficiarios = BeneficiariosDB
            CodigoPostal = CodigoPostalDB
            Distrito = DistritoDB
            Domicilio = DomicilioDB
            Grupo = GrupoDB
            Registro = RegistroDB
            Retos = RetosDB
            Seccion = SeccionDB
            Tutores = TutoresDB
            PerfilAcceso = PerfilAccesoDB
            PerfilAccesoDetalle = PerfilAccesoDetalleDB
            PerfilAcciones = PerfilAccionesDB
            PerfilUsuario = PerfilUsuarioDB
            Perfil = PerfilDB
            SesionUsuario = SesionUsuarioDB
            Usuario = UsuarioDB
            break
        }
    }
}

await inicializaRepositorios()