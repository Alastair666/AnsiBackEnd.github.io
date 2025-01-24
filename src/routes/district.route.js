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
    ], passportCall('jwt'), authorization('admin'), createDistrict)

router.put('/:did', passportCall('jwt'), authorization('admin'), updateDistrict)

router.get('/', passportCall('jwt'), authorization('admin'), getDistrict)

router.get('/:did', passportCall('jwt'), authorization('admin'), getDistrictById)

export default router