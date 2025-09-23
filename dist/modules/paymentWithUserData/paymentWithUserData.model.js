"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const paymentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: false },
    userId: { type: String, required: true },
    // cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    stripePaymentId: { type: String, required: true },
}, { timestamps: true });
exports.Payment = model('Payment', paymentSchema);
