import { Request, Response } from "express";
import catchAsync from "../../utilitis/catchAsync";
import { productService } from "./products.service";
import sendResponse from "../../utilitis/sendResponse";
import httpStatus from "http-status";


const createProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.createProductIntoDb(req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'product created successfully',
        data: result
    })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.getProductFromDb(req.query);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'product rectrive successfully',
        data: result
    })
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productService.getSingleProductFromDb(id);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'product rectrive successfully',
        data: result
    })
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productService.updateProductIntoDb(id, req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'product updated successfully',
        data: result
    })
})

const updateMultipleProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await productService.updateMultipleProductIntoDb(req.body);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'products updated successfully',
        data: result
    })
})


const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productService.deleteProductFromDb(id);
    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'product deleted successfully',
        data: result
    })
})


export const productController = {
    createProduct,
    getProduct,
    getSingleProduct,
    updateProduct,
    updateMultipleProduct,
    deleteProduct
}