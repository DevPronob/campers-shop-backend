import AppError from "../../errors/AppError"
import { TCart } from "./cart.interface"
import { Cart } from "./cart.model"
import httpStatus from "http-status";

const createCartIntoDb = async (payload: TCart) => {
    const isCartExits = await Cart.findById(payload.productId)
    if (isCartExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Already Added To Cart")
    }
    const result = await Cart.create(payload)
    return result
}

const getCartFrom = async (id: string) => {
    const result = await Cart.find({userId:id}).populate('productId')
    return result
}

const updateCartIntoDb = async (id: string, payload: TCart) => {
    const isCartExits = await Cart.findById(id)
    if (!isCartExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Cart Not Found")
    }

    const result = await Cart.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })
    return result
}

const deleteCartFromDb = async (id: string) => {
    console.log(id)
    const isCartExits = await Cart.findById(id)
    if (!isCartExits) {
        throw new AppError(httpStatus.NOT_FOUND, "Cart Product Not Found")
    }

    console.log(isCartExits)

    const result = await Cart.findOneAndDelete({ _id: isCartExits._id })
    console.log(result)
    return result
}


export const cartService = {
    createCartIntoDb,
    getCartFrom,
    updateCartIntoDb,
    deleteCartFromDb
}