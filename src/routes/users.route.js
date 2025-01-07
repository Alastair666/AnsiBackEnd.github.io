import { Router } from 'express'
import { body } from 'express-validator'
import { getUserById, getRegister, getLoginUser, updateUser, deleteUser } from '../controllers/users.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Insertar un nuevo Usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               ap_paterno:
 *                 type: string
 *                 description: Apellido Paterno del usuario
 *               ap_materno:
 *                 type: string
 *                 description: Apellido Materno del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario (Único)
 *               no_telefono:
 *                 type: string
 *                 description: Número Telefónico del usuario (Único)
 *               clave_acceso:
 *                 type: string
 *                 description: Contraseña del usuario (Encriptada)
 *               perfil:
 *                 type: string
 *                 description: Perfil del usuario (Administrador, Nacional, etc)
 *             example:
 *               nombre: Reyes Marcelo
 *               ap_paterno: Pacheco
 *               ap_materno: Acosta
 *               email: rpacheco@ansi-scouts-mexico.org
 *               clave_acceso: ansi1234
 *               perfil: Nacional
 *     responses:
 *       201:
 *         description: Usuario Creado Exitosamente
 *       400:
 *         description: Hay un Error en los datos ingresados | Usuario Previamente Creado
 *       500:
 *         description: Error Interno del Servidor (Desconocido)
 */
router.post('/register', 
    [
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('ap_paterno').notEmpty().withMessage('ap_paterno is required'),
        body('ap_materno').notEmpty().withMessage('ap_materno is required'),
        body('email').notEmpty().withMessage('email is required'),
        body('no_telefono').notEmpty().withMessage('no_telefono is required'),
        body('clave_acceso').notEmpty().withMessage('clave_acceso is required'),
        body('perfil').notEmpty().withMessage('perfil is required')
    ],getRegister)
/**
 * @swagger
 * /api/users/failregister:
 *   get:
 *     summary: Fallo en Registro
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Devuelve una excepción al generar el registro de usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: Exception
 *                   description: Failed!
 *       404:
 *         description: No fue posible registrar al Usuario
 */
router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})
/** POST 
 * Inicio de Sesión de Usuario
 * **/
router.post('/login', getLoginUser)
/**
 * @swagger
 * /api/users/faillogin:
 *   get:
 *     summary: Fallo en Inicio de Sesión
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Devuelve una excepción al realizar el inicio de sesión del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: Exception
 *                   description: Failed!
 *       404:
 *         description: No fue posible registrar al Usuario
 */
router.get('/faillogin', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})
/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por Identificador (ID)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador único (ID) del Usuario
 *     responses:
 *       200:
 *         description: Usuario Único
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador único (ID) del Usuario
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 ap_paterno:
 *                   type: string
 *                   description: Apellido Paterno del usuario
 *                 ap_materno:
 *                   type: string
 *                   description: Apellido Materno del usuario
 *                 email:
 *                   type: string
 *                   description: Email del usuario
 *       401:
 *         description: Debe de tener acceso a la API (Token)
 *       404:
 *         description: No fue posible encontrar al Usuario
 */
router.get('/:uid', passportCall('jwt'), authorization('admin'), getUserById)
/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario por Identificador (ID)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador único (ID) del Usuario por Actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               ap_paterno:
 *                 type: string
 *                 description: Apellido Paterno del usuario
 *               ap_materno:
 *                 type: string
 *                 description: Apellido Materno del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               no_telefono:
 *                 type: string
 *                 description: Número Telfónico del usuario
 *               clave_acceso:
 *                 type: string
 *                 description: Clave de Acceso del usuario
 *             example:
 *               nombre: Reyes Marcelo
 *               ap_paterno: Pacheco
 *               email: reypacheco@example.com
 *               no_telefono: 00-11-22-33-44
 *     responses:
 *       200:
 *         description: Usuario Actualizado Exitosamente
 *       401:
 *         description: Debe de tener acceso a la API (Token)
 *       404:
 *         description: No fue posible encontrar al Usuario
 */
router.put('/:uid', passportCall('jwt'), authorization('admin'), updateUser)
/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por Identificador (ID)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Identificador único (ID) del Usuario por Eliminar
 *     responses:
 *       200:
 *         description: Usuario Eliminado Exitosamente
 *       401:
 *         description: Debe de tener acceso a la API (Token)
 *       404:
 *         description: No fue posible encontrar al Usuario
 */
router.delete('/:uid', passportCall('jwt'), authorization('admin'), deleteUser)

export default router