import { Request, Response } from "express";
import { OrderService } from "./order.service";
import httpStatus from "http-status";
import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";


const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { cartId, paymentId,status,totalPrice } = req.body;
  const userId = req.user.id;

  const order = await OrderService.createOrder({
    userId,
    cartId,
    paymentId,
    status,
    totalPrice,
  });
  console.log(req.body,"body")

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: order,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const order = await OrderService.getOrderById(id, userId);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order found",
    data: order,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const orders = await OrderService.getUserOrders(userId);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await OrderService.updateOrderStatus(id, status);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated",
    data: order,
  });
});

const cancleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await OrderService.cancleOrder(id);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated",
    data: order,
  });
});

const overviewOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const order = await OrderService.overviewOrder(userId);
  console.log(order,"order in overviewOrder");

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders overview retrieved successfully",
    data: order,
  });
});

const deleteOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id,"order id in deleteOrderById");

  const order = await OrderService.deleteOrderById(id);

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order deleted successfully",
    data: order,
  });
});

export const OrderController = {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  cancleOrder,
  overviewOrder,
  deleteOrderById
};
