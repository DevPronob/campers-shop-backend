import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { TProduct } from "./products.interface"
import { Product } from "./products.model"
import QueryBuilder from "../../builder/QueryBuilder"


const createProductIntoDb = async (payload: TProduct) => {
    const result = await Product.create(payload)
    return result
}

const getProductFromDb = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
        Product.find(),
        query
    )
        .search(['name', 'description'])
        .filter()
        .sort()

    const result = await productQuery.modelQuery;
    return result;
}

const getSingleProductFromDb = async (id: string) => {

    const result = await Product.findById({ _id: id })
    return result
}

const updateProductIntoDb = async (id: string, payload: TProduct) => {
    const isProductExits = await Product.findById(id)
    if (!isProductExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Product is not exits")
    }

    const result = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result
}

const updateMultipleProductIntoDb = async (payload: any) => {

    const bulkOps = payload.map((update:any) => ({
        updateOne: {
            filter: { _id: update._id },
            update: { $set: { quantity: update.quantity } }
        }
    }));

    const result = await Product.bulkWrite(bulkOps);

    return result

}


const deleteProductFromDb = async (id: string) => {
    const isProductExits = await Product.findById(id)
    if (!isProductExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Product is not exits")
    }

    const result = await Product.findByIdAndDelete(id)
    return result
}


export const productService = {
    createProductIntoDb,
    getProductFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    updateMultipleProductIntoDb,
    deleteProductFromDb
}