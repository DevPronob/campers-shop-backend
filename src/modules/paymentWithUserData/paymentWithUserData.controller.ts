import httpStatus from "http-status";
import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import { paymentService } from "./paymentWithUserData.service";
import { Request, Response } from "express";
import { IUser, IUserDocument } from "../user/user.interface";
import { ObjectId } from 'mongoose';
import AppError from "../../errors/AppError";
import { Payment } from "./paymentWithUserData.model";


const createPayment = catchAsync(async (req: Request, res: Response) => {
    const result = await paymentService.setPayment(req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'payment successfull',
        data: result
    })
})


const createPaymentWithUser = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IUserDocument;
    const payload= {
        ...req.body,
        userId: (user as any)._id.toString()
    }
    const result = await paymentService.setUserPayment(payload)
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'payment successfull with user',
        data: result
    })
})

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
 const user = req.user as IUserDocument;
 console.log(user)
if (!user?._id) {
  throw new AppError(401, "You are not authorized to access this route");
}

const result = await paymentService.getPaymentById(user._id.toString());
    console.log(result,"result")
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'payment found',
        data: result
    })
})

const getPayments =catchAsync(async (req:Request,res:Response) =>{
    const result = await paymentService.getpayments();
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'payment found',
        data: result
    })
})

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const payment = await Payment.findOne({_id:req.params.id}); 
    console.log(payment,"payment")
    const result = await paymentService.updateOrderStatus((payment as any)._id, req.body.status);
    console.log(result,"result")
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'payment found',
        data: result
    })
    console.log(req.params.id,"req.params.id",req.body.status,"req.body.status")
})
const cancleOrder = catchAsync(async (req: Request, res: Response) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
        throw new AppError(404, "Payment not found");
    }
    const result = await paymentService.cancleOrder(req.params.id);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'payment found',
        data: result
    })
})


export const paymentController = {
    createPayment,
    createPaymentWithUser,
    getPaymentById,
    getPayments,
    updateOrderStatus,
    cancleOrder
}