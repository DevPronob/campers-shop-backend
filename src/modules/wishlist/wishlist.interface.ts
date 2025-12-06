import { ObjectId } from "mongoose";

export interface IWishlist {
    productId: ObjectId,
    userId?:string
}