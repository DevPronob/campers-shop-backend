import { ObjectId } from "mongoose"
import { PAYMENT_STATUS } from "./paymentWithUser.constant"

export type TPayment = {
    _id?:ObjectId
    name: String
    userId: String
    email: String
    address: String
    phone: String
    status:typeof PAYMENT_STATUS | String,
    stripePaymentId: String,
    amount: number,
    quantity: number,
    products: Array<any>,
}