import { Router } from 'express'
import { getPostalCode } from '../controllers/cp.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.get('/:cp', passportCall('jwt'), authorization({ role: 'user', entity: 'operacion.codigo_postal', actions: 'onlyRead' }), getPostalCode)

export default router