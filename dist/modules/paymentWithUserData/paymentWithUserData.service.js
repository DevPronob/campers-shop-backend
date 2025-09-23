"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const paymentWithUserData_model_1 = require("./paymentWithUserData.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const cart_model_1 = require("../cart/cart.model");
const stripe = new stripe_1.default(config_1.default.stripe);
const setPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { price } = payload;
    const amount = Math.round(price * 100);
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
            // You can also attach metadata if needed
            metadata: { integration_check: 'accept_a_payment' },
        });
        return {
            clientSecret: paymentIntent.client_secret,
        };
    }
    catch (error) {
        console.error('Error creating payment intent:', error);
        throw new AppError_1.default(500, 'Failed to create payment intent');
    }
});
const setUserPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentWithUserData_model_1.Payment.create(payload);
    if (payload.userId) {
        yield cart_model_1.Cart.deleteMany({ userId: payload.userId });
        console.log(`Cart deleted for user: ${payload.userId}`);
    }
    return result;
});
const getPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const payment = yield paymentWithUserData_model_1.Payment.findOne({ userId: id });
    console.log(payment);
    if (!payment) {
        throw new AppError_1.default(404, "Payment not found");
    }
    return payment;
});
exports.paymentService = {
    setPayment,
    setUserPayment,
    getPaymentById
};
