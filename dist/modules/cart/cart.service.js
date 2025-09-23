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
const cart_model_1 = require("./cart.model");
const http_status_1 = __importDefault(require("http-status"));
const createCartIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCartExits = yield cart_model_1.Cart.findById(payload.productId);
    if (isCartExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Already Added To Cart");
    }
    const result = yield cart_model_1.Cart.create(payload);
    return result;
});
const getCartFrom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ userId: id }).populate('productId');
    return result;
});
const updateCartIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCartExits = yield cart_model_1.Cart.findById(id);
    if (!isCartExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart Not Found");
    }
    const result = yield cart_model_1.Cart.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
const deleteCartFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const isCartExits = yield cart_model_1.Cart.findById(id);
    if (!isCartExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart Product Not Found");
    }
    console.log(isCartExits);
    const result = yield cart_model_1.Cart.findOneAndDelete({ _id: isCartExits._id });
    console.log(result);
    return result;
});
exports.cartService = {
    createCartIntoDb,
    getCartFrom,
    updateCartIntoDb,
    deleteCartFromDb
};
