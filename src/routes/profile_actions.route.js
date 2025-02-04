import { Router } from 'express'
import { body } from 'express-validator'
import { createProfileAction, getProfileActionById, updateProfileAction } from '../controllers/profile_action.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.post('/',
    [
        body('id_perfil').notEmpty().withMessage('ID perfil is required'),
        body('id_entidad_accion').notEmpty().withMessage('entidad accion is required'),
        body('actions').notEmpty().isObject().withMessage('actions debe ser un objeto'),
        body('actions.Create').isBoolean().withMessage('actions.create debe ser booleano'),
        body('actions.Update').isBoolean().withMessage('actions.update debe ser booleano'),
        body('actions.Read').isBoolean().withMessage('actions.read debe ser booleano'),
        body('actions.Delete').isBoolean().withMessage('actions.delete debe ser booleano'),
    ], passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil_acciones', actions: 'full' }), createProfileAction)

router.get('/:pid', passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil_acciones', actions: 'full' }), getProfileActionById)

router.put('/:pid',
    [
        body('id_perfil').notEmpty().withMessage('ID perfil is required'),
        body('id_entidad_accion').notEmpty().withMessage('entidad accion is required'),
        body('actions').notEmpty().isObject().withMessage('actions debe ser un objeto'),
        body('actions.Create').isBoolean().withMessage('actions.create debe ser booleano'),
        body('actions.Update').isBoolean().withMessage('actions.update debe ser booleano'),
        body('actions.Read').isBoolean().withMessage('actions.read debe ser booleano'),
        body('actions.Delete').isBoolean().withMessage('actions.delete debe ser booleano'),
    ], passportCall('jwt'), authorization({ role: 'admin', entity: 'seguridad.perfil_acciones', actions: 'full' }), updateProfileAction)

export default router