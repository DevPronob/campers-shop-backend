import { Router } from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middleware/validateRequest";
import { orderValidation } from "./order.validation";
import { USER_ROLE } from "../user/user.constant";
import { auth } from "../../middleware/auth";

const route =Router();

route.post("/createOrder",auth(USER_ROLE.ADMIN,USER_ROLE.USER),validateRequest(orderValidation.createOrderValidationSchema),OrderController.createOrder);
route.get("/myOrders",auth(USER_ROLE.USER,USER_ROLE.ADMIN),OrderController.getMyOrders);
route.get("/order/:id",OrderController.getOrderById);
route.put("/updateOrderStatus/:id",OrderController.updateOrderStatus);
route.put("/cancelOrder/:id",OrderController.cancleOrder);
route.get("/overview",auth(USER_ROLE.ADMIN,USER_ROLE.USER),OrderController.overviewOrder);
route.delete("/deleteOrder/:id",auth(USER_ROLE.USER,USER_ROLE.ADMIN),OrderController.deleteOrderById);

export const orderRoute = route;