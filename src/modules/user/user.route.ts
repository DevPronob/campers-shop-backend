import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from './../../middleware/auth';
import { USER_ROLE } from "./user.constant";

const router =Router()
router.post("/register",userController.registerUser)
router.post("/login",userController.logInUser)
router.get("/all-users",userController.getAllUsers)
router.put("/:id",userController.updateRoleByAdmin)
router.get("/:id",auth(USER_ROLE.USER,USER_ROLE.ADMIN),userController.getUserById)
router.get("/:email",userController.getUserByEmail)



export const userRoute =router