import { Router } from 'express'
import { getPostalCode } from '../controllers/cp.controller.js'
import { authorization, passportCall } from '../middleware/auth.js'

const router = Router()

router.get('/:cp', passportCall('jwt'), authorization('user'), getPostalCode)

export default router