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
exports.cartController = void 0;
const catchAsync_1 = __importDefault(require("../../utilitis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilitis/sendResponse"));
const cart_service_1 = require("./cart.service");
const http_status_1 = __importDefault(require("http-status"));
// 🔹 ADD PRODUCT TO CART
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = {
        userId: user._id.toString(),
        productId: req.body.productId,
        quantity: req.body.quantity,
    };
    const result = yield cart_service_1.cartService.createCartIntoDb(payload);
    console.log(payload, "result");
    //   return res.status(200).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "Product added to cart successfully",
    //     data: payload,
    //   });
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Product added to cart successfully",
        data: result,
    });
}));
// 🔹 GET MY CART
const getCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield cart_service_1.cartService.getCartFromDb(user._id.toString());
    console.log(result, "result");
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart retrieved successfully",
        data: result,
    });
}));
// 🔹 UPDATE PRODUCT QUANTITY
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { quantity } = req.body;
    const { id } = req.params;
    console.log(req.body, "req.body in updateCart");
    const result = yield cart_service_1.cartService.updateCartIntoDb({
        userId: user._id.toString(),
        productId: id,
        quantity,
    });
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Cart updated successfully",
        data: result,
    });
}));
// 🔹 REMOVE PRODUCT FROM CART
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    console.log(req.params, "req.params");
    const result = yield cart_service_1.cartService.deleteCartFromDb({
        userId: user._id.toString(),
        id,
    });
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Product removed from cart successfully",
        data: result,
    });
}));
exports.cartController = {
    addToCart,
    getCart,
    updateCart,
    deleteCart,
};
