# Sistema de Gestión y Seguimiento Scouts (SIGESS)

### Asociación Nacional de Scouts Independientes

## Introducción
- **Descripción del Proyecto:** Breve descripción del Sistema de Gestión y Seguimiento Scouts (SIGESS) y su propósito.
- **Objetivo:** Facilitar la gestión y seguimiento de actividades y miembros de la Asociación Nacional de Scouts Independientes.

## Características del Sistema
- Funcionalidades Principales
- Beneficios para los usuarios

## Estructura del Proyecto
- Descripción de la estructura de carpetas
- Detalle de componentes clave

### VIEWS - with ACTIONS
**Login**
- Autentica Usuario
- Redirecciona a Register

**Register**
- Crea pre-registro

**Index**
- Página Principal al acceder
    - -> Membresia Activa (Grupo/Distrito)
    - -> Grafico por Secciones (Grupo/Distrito)
    - -> Registros Pendientes de Autorizar (Grupo/Distrito)

**Config (Admin)**
- Distrito(s)
- Grupo(s)
- Autoriza Usuarios (Acepta/Rechaza) 
    - -> Envia correo de respuesta
- Sube fotografía de entidad (Grupo/Distrito)

**Beneficiary**
- CRUD
- Autoriza registros
- Importación másiva (XLSX) de registros
- Sube fotografia de perfil

**Records**
- Autoriza/Rechaza registros 

**Profile**
- CRUD
- Acciones
- Accesos

**User**
- CRUD
- Asigna Perfiles
- Asigna Accesos

**ENDPOINTS**

Session
-Auth
-Register

User
-CRUD
-Authorize

CRUD
-Beneficiary
-Group
-District
-Profile

## Modelos de Datos
- Ubicación de los modelos
- Descripción de cada modelo
    - Usuario
    - Actividad
    - Grupo
    - Inscripción



## Contribuciones
Cómo Contribuir: Instrucciones sobre cómo otros pueden contribuir al desarrollo del sistema.
Licencia
Tipo de Licencia: Información sobre la licencia bajo la cual se distribuye el sistema.