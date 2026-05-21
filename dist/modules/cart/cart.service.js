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
exports.cartService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const cart_model_1 = require("./cart.model");
const mongoose_1 = require("mongoose");
// 🔹 Add product to cart
const createCartIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = payload;
    console.log(payload, "payload in createCartIntoDb");
    let cart = yield cart_model_1.Cart.findOne({ userId });
    // If cart does not exist
    if (!cart) {
        return yield cart_model_1.Cart.create({
            userId,
            items: [
                {
                    productId: new mongoose_1.Types.ObjectId(productId),
                    quantity,
                },
            ],
        });
    }
    // Check if product already exists in cart
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (item) {
        // Add quantity instead of just +1
        item.quantity += quantity;
    }
    else {
        cart.items.push({
            productId: new mongoose_1.Types.ObjectId(productId),
            quantity,
        });
    }
    yield cart.save();
    return cart;
});
// 🔹 Get cart by user
const getCartFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId }).populate("items.productId");
    // if (!cart) {
    //   throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
    // }
    return cart;
});
// 🔹 Update quantity
const updateCartIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = payload;
    console.log(payload, "payload in updateCartIntoDb");
    const cart = yield cart_model_1.Cart.findOne({ userId });
    console.log(productId, "cart in updateCartIntoDb");
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    const item = cart.items.find((i) => i.productId.toString() === productId);
    console.log(item, "item in updateCartIntoDb");
    if (!item) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not in cart");
    }
    console.log(quantity, "quantity in updateCartIntoDb");
    item.quantity = quantity;
    yield cart.save();
    return cart;
});
// 🔹 Remove product from cart
const deleteCartFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, id } = payload;
    const cart = yield cart_model_1.Cart.findOne({ userId });
    console.log(cart, "cart in deleteCartFromDb");
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    cart.items = cart.items.filter((i) => i._id.toString() !== id);
    console.log(cart, "cart after filter");
    console.log(id, " after filter");
    yield cart.save();
    return cart;
});
// 🔹 Clear cart after order
const clearCartFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.Cart.findOne({ userId });
    if (!cart)
        return null;
    cart.items = [];
    yield cart.save();
    return cart;
});
exports.cartService = {
    createCartIntoDb,
    getCartFromDb,
    updateCartIntoDb,
    deleteCartFromDb,
    clearCartFromDb,
};
