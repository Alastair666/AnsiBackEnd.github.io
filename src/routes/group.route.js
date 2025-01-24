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
        body('id_domicilio').notEmpty().withMessage('id_domicilio is required'),
        body('fecha_fundacion').notEmpty().withMessage('fecha_fundacion is required')
    ], passportCall('jwt'), authorization('user'), createGroup)

router.get('/', passportCall('jwt'), authorization('admin'), getGroup)

router.get('/:gid', passportCall('jwt'), authorization('admin'), getGroupById)

router.put('/:gid', passportCall('jwt'), authorization('admin'), updateGroup)

export default router