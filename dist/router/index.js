"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_route_1 = require("../modules/products/products.route");
const category_router_1 = require("../modules/category/category.router");
const cart_router_1 = require("../modules/cart/cart.router");
const paymentWithUserData_route_1 = require("../modules/paymentWithUserData/paymentWithUserData.route");
const user_route_1 = require("../modules/user/user.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const router = (0, express_1.Router)();
const modeuleRoutes = [
    {
        path: '/products',
        route: products_route_1.productRoute
    },
    {
        path: '/category',
        route: category_router_1.categoryRoute
    },
    {
        path: '/cart',
        route: cart_router_1.cartRoute
    },
    {
        path: '/payment',
        route: paymentWithUserData_route_1.paymentRoute
    },
    {
        path: '/user',
        route: user_route_1.userRoute
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.wishlistRoute
    }
];
modeuleRoutes.forEach((ele) => router.use(ele.path, ele.route));
exports.default = router;
