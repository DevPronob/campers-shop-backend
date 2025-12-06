import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { productController } from './product.controller'
import { productValidation } from './products.validation'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()
router.post('/',auth(USER_ROLE.ADMIN), validateRequest(productValidation.productsValidationSchema), productController.createProduct)
router.get('/', productController.getProduct)
router.get('/:id', productController.getSingleProduct)
router.put('/:id',auth(USER_ROLE.ADMIN), productController.updateProduct)
router.put('/updateMProduct', productController.updateMultipleProduct)
router.delete('/:id', productController.deleteProduct)
export const productRoute = router