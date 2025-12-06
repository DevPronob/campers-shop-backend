import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { categoryController } from './category.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()
router.post('/',auth(USER_ROLE.ADMIN), categoryController.createCategory)
router.get('/',auth(USER_ROLE.ADMIN,USER_ROLE.USER), categoryController.getCategory)

router.get('/:id',auth(USER_ROLE.ADMIN,USER_ROLE.USER), categoryController.getSingleCategory)
// router.get('/:id', productController.getSingleProduct)


export const categoryRoute = router