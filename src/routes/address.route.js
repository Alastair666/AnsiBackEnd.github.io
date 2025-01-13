import { Router } from 'express'
import { body } from 'express-validator'
import { createAddress } from '../controllers/address.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.post('/',
    [
        body('cp').notEmpty().withMessage('cp is required')
                  .isLength({ min: 5, max: 5 }).withMessage('cp must be of five numbers')
                  .isNumeric().withMessage('cp must be numeric'),
        body('colonia').notEmpty().withMessage('colonia is required'),
        body('calle').notEmpty().withMessage('calle is required'),
        body('no_ext').notEmpty().withMessage('no_ext is required'),
        body('no_int').notEmpty().withMessage('no_int is required'),
        body('id_pais').notEmpty().withMessage('id_pais is required'),
        body('id_estado').notEmpty().withMessage('id_estado is required')
    ], passportCall('jwt'), authorization('user'), createAddress)

export default router