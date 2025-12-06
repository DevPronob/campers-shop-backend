import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { cartController } from './cart.controller'
import { cartValidation } from './cart.validation'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'


const router = express.Router()
router.post('/',auth(USER_ROLE.USER,USER_ROLE.ADMIN),validateRequest(cartValidation.cartValidationSchema), cartController.createCart)
router.get('/',auth(USER_ROLE.USER,USER_ROLE.ADMIN), cartController.getCart)
router.put('/:id',auth(USER_ROLE.USER,USER_ROLE.ADMIN), cartController.updateCart)
router.delete('/:id',auth(USER_ROLE.USER,USER_ROLE.ADMIN), cartController.deleteCart)
export const cartRoute = router