import { Request, Response } from "express";
import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import { cartService } from "./cart.service";
import httpStatus from "http-status";
const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;

  const payload = {
    userId: user._id.toString(),
    productId: req.body.productId,
    quantity: req.body.quantity,
  };

  const result = await cartService.createCartIntoDb(payload as any);
  console.log(payload,"result")

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Product added to cart successfully",
    data: result,
  });
});
const getCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;

  const result = await cartService.getCartFromDb(user._id.toString());

  console.log(result,"result")

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart retrieved successfully",
    data: result,
  });
});
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const {quantity } = req.body;
  const {id} =req.params
  console.log(req.body,"req.body in updateCart")

  const result = await cartService.updateCartIntoDb({
    userId: user._id.toString(),
    productId:id,
    quantity,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart updated successfully",
    data: result,
  });
});
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const { id } = req.params;
  console.log(req.params,"req.params")


  const result = await cartService.deleteCartFromDb({
    userId: user._id.toString(),
    id,
  });

  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product removed from cart successfully",
    data: result,
  });
});

export const cartController = {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
};
