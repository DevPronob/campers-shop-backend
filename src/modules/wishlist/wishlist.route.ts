import { Router } from "express";
import { WishlistController } from "./wishlist.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router =Router()
router.post("/",auth(USER_ROLE.USER,USER_ROLE.ADMIN),WishlistController.createWishlistItem)
router.get("/",auth(USER_ROLE.USER,USER_ROLE.ADMIN),WishlistController.getWishlistItems)
router.delete("/:id",auth(USER_ROLE.USER,USER_ROLE.ADMIN),WishlistController.deleteWishlistItem)

export const wishlistRoute =router