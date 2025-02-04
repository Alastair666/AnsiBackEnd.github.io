import { Router } from 'express'
import { body } from 'express-validator'
import { createBeneficiary } from '../controllers/beneficiary.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.post('/',
    [
        body('id_tipo').notEmpty().withMessage('id_tipo is required'),
        body('previo').isBoolean().notEmpty().withMessage('id_distrito is required'),
        body('id_distrito').notEmpty().withMessage('id_distrito is required'),
        body('curp').notEmpty().withMessage('curp is required'),
        body('ap_paterno').notEmpty().withMessage('ap_paterno is required'),
        body('ap_materno').notEmpty().withMessage('ap_materno is required'),
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('fecha_nac').notEmpty().isDate().withMessage('fecha_nac is required'),
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('id_genero').notEmpty().withMessage('id_genero is required'),
        body('id_tipo_seguro').notEmpty().withMessage('id_tipo_seguro is required'),
        body('no_afiliacion').notEmpty().withMessage('no_afiliacion is required'),
        body('clave_mem').notEmpty().withMessage('clave_mem is required'),
        body('fecha_ingreso').notEmpty().withMessage('fecha_ingreso is required'),
        body('domicilio').notEmpty().withMessage('domicilio is required'),
        body('domicilio.cp').notEmpty().withMessage('cp is required')
                  .isLength({ min: 5, max: 5 }).withMessage('cp must be of five numbers')
                  .isNumeric().withMessage('cp must be numeric'),
        body('domicilio.colonia').notEmpty().withMessage('colonia is required'),
        body('domicilio.calle').notEmpty().withMessage('calle is required'),
        body('domicilio.no_ext').notEmpty().withMessage('no_ext is required'),
        body('domicilio.no_int').notEmpty().withMessage('no_int is required'),
        body('domicilio.id_pais').notEmpty().withMessage('id_pais is required'),
        body('domicilio.id_estado').notEmpty().withMessage('id_estado is required')
    ], passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.beneficiario', actions: 'onlyCreate' }), createBeneficiary)

export default router