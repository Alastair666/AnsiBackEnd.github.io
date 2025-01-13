import { Router } from 'express'
import { body } from 'express-validator'
import { getCatalogByTypeName, getCatalogByTypeAndDescName, getCatalogByTypeAndAlterValue, getCatalogByID } from '../controllers/catalog.controller.js'

const router = Router()

router.get('/getByCatalogType', 
    [
        body('description_type').isString().withMessage('description_type is required')
    ], getCatalogByTypeName
)
router.get('/getByCatalogNameAndType', 
    [
        body('description_type').isString().withMessage('description_type is required'),
        body('description').isString().withMessage('description is required')
    ], getCatalogByTypeAndDescName
)
router.get('/getCatalogTypeAndAlterValue', 
    [
        body('description_type').isString().withMessage('description_type is required'),
        body('alter_value').isString().withMessage('alter_value is required')
    ], getCatalogByTypeAndAlterValue)
router.get('/:cid', getCatalogByID)

export default router