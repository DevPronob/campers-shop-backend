import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { productController } from './product.controller'
import { productValidation } from './products.validation'

const router = express.Router()
router.post('/', validateRequest(productValidation.productsValidationSchema), productController.createProduct)
router.get('/', productController.getProduct)
router.get('/:id', productController.getSingleProduct)
router.put('/:id', productController.updateProduct)
router.put('/updateMProduct', productController.updateMultipleProduct)
router.delete('/:id', productController.deleteProduct)
export const productRoute = router