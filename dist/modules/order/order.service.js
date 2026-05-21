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
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const cart_model_1 = require("../cart/cart.model");
const order_constant_1 = require("./order.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "payload in createOrder");
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const cart = yield cart_model_1.Cart.findById(payload.cartId).session(session);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const order = yield order_model_1.Order.create([
            {
                userId: payload.userId,
                cartId: cart._id,
                paymentId: payload.paymentId,
                status: payload.status ? order_constant_1.ORDER_STATUS.PAID : order_constant_1.ORDER_STATUS.PENDING,
                totalPrice: payload.totalPrice || 0,
            },
        ], { session });
        yield cart_model_1.Cart.findByIdAndDelete(cart._id).session(session);
        yield session.commitTransaction();
        session.endSession();
        return order[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getOrderById = (orderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId).populate("cartId");
    if (!order) {
        throw new Error("Order not found");
    }
    if (order.userId.toString() !== userId) {
        throw new Error("Unauthorized access");
    }
    return order;
});
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.Order.find({ userId }).sort({ createdAt: -1 });
});
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    if (!order.status) {
        throw new Error("Order status is invalid");
    }
    // 🔒 Status transition rules
    const validTransitions = {
        pending: ["paid", "failed", "cancelled"],
        paid: ["rejected"],
        failed: [],
        cancelled: [],
        rejected: [],
    };
    if (!validTransitions[order.status].includes(status)) {
        throw new Error(`Cannot change status from ${order.status} to ${status}`);
    }
    order.status = status;
    yield order.save();
    return order;
});
const cancleOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    order.status = order_constant_1.ORDER_STATUS.CANCELLED;
    yield order.save();
    return order;
});
const overviewOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    const userOrder = yield orders.filter(order => order.userId.toString() === userId);
    const totalOrder = userOrder.length;
    const totalPrice = userOrder.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
    return {
        totalOrder,
        totalPrice
    };
});
exports.OrderService = {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderStatus,
    cancleOrder,
    overviewOrder
};
