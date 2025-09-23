import { ObjectId } from "mongoose"

export type TCart = {
    productId: ObjectId,
    quantity: number,
    userId?:string
}