import { Request, Response } from "express";
import catchAsync from "../../utilitis/catchAsync";
import sendResponse from "../../utilitis/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./category.service";
const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.createCategoryIntoDb(req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Category created successfully',
        data: result
    })
})


const getCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await categoryService.getCategoryFromDb();
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category rectrive successfully',
        data: result
    })
})

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await categoryService.getSingleCategoryFromDb(id);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category rectrive successfully',
        data: result
    })
})



export const categoryController = {
    createCategory,
    getCategory,
    getSingleCategory
}