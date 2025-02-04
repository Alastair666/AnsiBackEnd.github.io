import { Router } from 'express'
import { body } from 'express-validator'
import { createGroup, getGroup, getGroupById, updateGroup } from '../controllers/group.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.post('/',
    [
        body('id_distrito').notEmpty().withMessage('id_distrito is required'),
        body('id_estatus').notEmpty().withMessage('id_estatus is required'),
        body('numero').notEmpty().withMessage('numero is required')
                      .isNumeric().withMessage('numero must be numeric'),
        body('domicilio').notEmpty().withMessage('domicilio is required'),
        body('domicilio.cp').notEmpty().withMessage('cp is required')
                  .isLength({ min: 5, max: 5 }).withMessage('cp must be of five numbers')
                  .isNumeric().withMessage('cp must be numeric'),
        body('domicilio.colonia').notEmpty().withMessage('colonia is required'),
        body('domicilio.calle').notEmpty().withMessage('calle is required'),
        body('domicilio.no_ext').notEmpty().withMessage('no_ext is required'),
        body('domicilio.no_int').notEmpty().withMessage('no_int is required'),
        body('domicilio.id_pais').notEmpty().withMessage('id_pais is required'),
        body('domicilio.id_estado').notEmpty().withMessage('id_estado is required'),
        body('fecha_fundacion').notEmpty().withMessage('fecha_fundacion is required')
    ], passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.grupo', actions: 'onlyCreate' }), createGroup)

router.get('/', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.grupo', actions: 'onlyRead' }), getGroup)

router.get('/:gid', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.grupo', actions: 'onlyRead' }), getGroupById)

router.put('/:gid', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.grupo', actions: 'onlyUpdate' }), updateGroup)

export default router