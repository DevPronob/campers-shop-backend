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
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = Object.assign({ userId: user._id.toString() }, req.body);
    console.log(user);
    const result = yield cart_service_1.cartService.createCartIntoDb(payload);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Cart created successfully',
        data: result
    });
}));
const getCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield cart_service_1.cartService.getCartFrom(user._id.toString());
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Cart Rectrive successfully',
        data: result
    });
}));
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield cart_service_1.cartService.updateCartIntoDb(id, req.body);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Cart updated successfully',
        data: result
    });
}));
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield cart_service_1.cartService.deleteCartFromDb(id);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Cart deleted successfully',
        data: result
    });
}));
exports.cartController = {
    createCart,
    getCart,
    updateCart,
    deleteCart
};
