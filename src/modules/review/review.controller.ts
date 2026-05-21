
import { Request, Response } from "express";
import catchAsync from "../../utilitis/catchAsync";
import { reviewService } from "./review.service";
import sendResponse from "../../utilitis/sendResponse";
import httpStatus from "http-status";
import { TReview } from "./review.interface";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any)._id;
    req.body.userId = userId;
    console.log(req.body,req.user)
    const result = await reviewService.createReview(req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Review created successfully',
        data: result
    })
})

const getReviewById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await reviewService.getReviewById(id);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Review Rectrive successfully',
        data: result
    })
    console.log(req.params)
})

const getReviewByProductId = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params
    const result = await reviewService.getReviewByProductId(productId);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Review Rectrive successfully',
        data: result
    })
    console.log(productId)
})

const getReviewByUserId = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params
    const result = await reviewService.getReviewByUserId(userId);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Review Rectrive successfully',
        data: result
    })
})

const updateReviewById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await reviewService.updateReviewById(id, req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Review updated successfully',
        data: result
    })
})
const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await reviewService.deleteReviewById(id);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Review deleted successfully',
        data: result
    })
}
)

export const reviewController = {
    createReview,
    getReviewById,
    getReviewByProductId,
    getReviewByUserId,
    updateReviewById,
    deleteReviewById
}