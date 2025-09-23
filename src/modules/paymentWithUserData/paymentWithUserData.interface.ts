import { ObjectId } from "mongoose"

export type TPayment = {
    _id?:ObjectId
    name: String
    userId: String
    email: String
    address: String
    phone: String
    stripePaymentId: String
}