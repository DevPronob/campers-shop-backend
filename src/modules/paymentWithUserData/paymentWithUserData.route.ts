import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { paymentValidation } from './paymentWithUserData.validation'
import { paymentController } from './paymentWithUserData.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'


const router = express.Router()
router.post('/createPayment',paymentController.createPayment)
router.get('/orders',auth(USER_ROLE.USER,USER_ROLE.ADMIN),paymentController.getPaymentById)
router.get('/allPayments',auth(USER_ROLE.ADMIN), paymentController.getPayments)
router.put('/updateOrderStatus/:id',auth(USER_ROLE.ADMIN), validateRequest(paymentValidation.updateOrderStatusValidationSchema), paymentController.updateOrderStatus)
router.post('/',auth(USER_ROLE.USER),validateRequest(paymentValidation.paymentValidationSchema), paymentController.createPaymentWithUser)
router.put(
  "/cancelOrder/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
    paymentController.cancleOrder
);


export const paymentRoute = router