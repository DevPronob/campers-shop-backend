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
exports.paymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilitis/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utilitis/sendResponse"));
const paymentWithUserData_service_1 = require("./paymentWithUserData.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield paymentWithUserData_service_1.paymentService.setPayment(req.body);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'payment successfull',
        data: result
    });
}));
const createPaymentWithUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = Object.assign(Object.assign({}, req.body), { userId: user._id.toString() });
    const result = yield paymentWithUserData_service_1.paymentService.setUserPayment(payload);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'payment successfull with user',
        data: result
    });
}));
const getPaymentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (!(user === null || user === void 0 ? void 0 : user._id)) {
        throw new AppError_1.default(401, "You are not authorized to access this route");
    }
    const result = yield paymentWithUserData_service_1.paymentService.getPaymentById(user._id.toString());
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'payment found',
        data: result
    });
}));
exports.paymentController = {
    createPayment,
    createPaymentWithUser,
    getPaymentById
};
