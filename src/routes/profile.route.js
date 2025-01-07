import { Router } from 'express'
import { body } from 'express-validator'
import { createProfile, getProfileByName, getAllProfiles } from "../controllers/profile.controller.js"
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
        body('administrador').notEmpty().withMessage('administrador is required')
    ], createProfile)

router.get('/:name', getProfileByName)

router.get('/', getAllProfiles)

export default router