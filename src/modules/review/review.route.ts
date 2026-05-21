
import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router =Router()
router.post("/", auth(USER_ROLE.USER,USER_ROLE.ADMIN),reviewController.createReview)
router.get("/:id",auth(USER_ROLE.USER,USER_ROLE.ADMIN),reviewController.getReviewById)
router.get("/product/:productId",auth(USER_ROLE.USER,USER_ROLE.ADMIN),reviewController.getReviewByProductId)
router.get("/:userId",auth(USER_ROLE.USER,USER_ROLE.ADMIN),reviewController.getReviewByUserId)
router.put("/update/:id", auth(USER_ROLE.USER,USER_ROLE.ADMIN),reviewController.updateReviewById)
router.delete("/:id", auth(USER_ROLE.USER,USER_ROLE.ADMIN),reviewController.deleteReviewById)

export const reviewRoute =router