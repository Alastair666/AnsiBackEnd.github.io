import { Router } from 'express'
import { body } from 'express-validator'
import { createDistrict, updateDistrict, getDistrict, getDistrictById } from '../controllers/district.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.post('/', 
    [
        body('descripcion').notEmpty().withMessage('descripcion is required'),
        body('abreviatura').notEmpty().withMessage('abreviatura is required'),
        body('fecha_fundacion').notEmpty().withMessage('fecha_fundacion is required')
    ], passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.distrito', actions: 'onlyCreate' }), createDistrict)

router.put('/:did', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.distrito', actions: 'onlyUpdate' }), updateDistrict)

router.get('/', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.distrito', actions: 'onlyRead' }), getDistrict)

router.get('/:did', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.distrito', actions: 'onlyRead' }), getDistrictById)

export default router