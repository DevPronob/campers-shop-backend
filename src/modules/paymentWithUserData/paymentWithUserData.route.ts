import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { paymentValidation } from './paymentWithUserData.validation'
import { paymentController } from './paymentWithUserData.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'


const router = express.Router()
router.post('/createPayment',paymentController.createPayment)
router.post('/',auth(USER_ROLE.USER),validateRequest(paymentValidation.paymentValidationSchema), paymentController.createPaymentWithUser)
router.get('/',auth(USER_ROLE.USER), paymentController.getPaymentById)

export const paymentRoute = router