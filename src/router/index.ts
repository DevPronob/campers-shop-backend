import { Router } from "express";
import { productRoute } from "../modules/products/products.route";
import { categoryRoute } from "../modules/category/category.router";
import { cartRoute } from "../modules/cart/cart.router";
import { paymentRoute } from "../modules/paymentWithUserData/paymentWithUserData.route";
import {  userRoute } from "../modules/user/user.route";
import { wishlistRoute } from "../modules/wishlist/wishlist.route";

const router = Router()
const modeuleRoutes = [
    {
        path: '/products',
        route: productRoute
    },
    {
        path: '/category',
        route: categoryRoute
    },
    {
        path: '/cart',
        route: cartRoute
    },
    {
        path: '/payment',
        route: paymentRoute
    },
     {
        path: '/user',
        route: userRoute
    },
    {
        path: '/wishlist',
        route: wishlistRoute
    }
]

modeuleRoutes.forEach((ele) => router.use(ele.path, ele.route))
export default router

