import { Router } from 'express'
import { body } from 'express-validator'
import { createProfile, getProfileByName, getAllProfiles, updateProfile, getProfileById } from "../controllers/profile.controller.js"
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Insertar un nuevo Perfil
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
 *                 description: Nombre del perfil
 *               detalles:
 *                 type: string
 *                 description: Especificación del Perfil
 *               administrador:
 *                 type: string
 *                 description: Indicador del perfil de administrador
 *             example:
 *               nombre: Nacional
 *               detalles: Consejo nacional de ANSI
 *               administrador: true
 *     responses:
 *       201:
 *         description: Perfil Creado Exitosamente
 *       400:
 *         description: Hay un Error en los datos ingresados | Perfil Previamente Creado
 *       500:
 *         description: Error Interno del Servidor (Desconocido)
 */
router.post('/',
    [
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('detalles').notEmpty().withMessage('detalles is required'),
        body('administrador').notEmpty().withMessage('administrador is required'),
        body('bit_nacional').notEmpty().withMessage('bit_nacional is required'),
        body('bit_distrito').notEmpty().withMessage('bit_distrito is required'),
        body('bit_region').notEmpty().withMessage('bit_region is required'),
        body('bit_grupo').notEmpty().withMessage('bit_grupo is required'),
        body('bit_seccion').notEmpty().withMessage('bit_seccion is required')
    ], passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil', actions: 'full' }), createProfile)

router.get('/:name', passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil', actions: 'full' }), getProfileByName)

router.get('/:pid', passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil', actions: 'full' }), getProfileById)

router.get('/', passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil', actions: 'full' }), getAllProfiles)

router.put('/:pid',
    [
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('detalles').notEmpty().withMessage('detalles is required'),
        body('administrador').notEmpty().withMessage('administrador is required'),
        body('bit_nacional').notEmpty().withMessage('bit_nacional is required'),
        body('bit_distrito').notEmpty().withMessage('bit_distrito is required'),
        body('bit_region').notEmpty().withMessage('bit_region is required'),
        body('bit_grupo').notEmpty().withMessage('bit_grupo is required'),
        body('bit_seccion').notEmpty().withMessage('bit_seccion is required')
    ], passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil', actions: 'full' }), updateProfile)

export default router