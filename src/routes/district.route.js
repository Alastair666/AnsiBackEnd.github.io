import { Router } from 'express'
import { body } from 'express-validator'
import { createDistrict, updateDistrict } from '../controllers/district.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.post('/', 
    [
        body('id_estatus').notEmpty().withMessage('id_estatus is required'),
        body('descripcion').notEmpty().withMessage('descripcion is required'),
        body('abreviatura').notEmpty().withMessage('abreviatura is required'),
        body('fecha_fundacion').notEmpty().withMessage('fecha_fundacion is required')
    ],createDistrict)

router.put('/:uid', updateDistrict)