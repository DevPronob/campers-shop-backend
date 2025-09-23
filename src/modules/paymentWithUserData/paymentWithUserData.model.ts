import mongoose from "mongoose";
import { TPayment } from "./paymentWithUserData.interface";
const { Schema, model } = mongoose;

const paymentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: false },
    userId: { type: String, required: true },
    // cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    stripePaymentId: { type: String, required: true },
}, { timestamps: true });


export const Payment = model<TPayment>('Payment', paymentSchema);