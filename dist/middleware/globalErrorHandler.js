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
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
// import config from "../config"; // uncomment if you need NODE_ENV
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong!",
        },
    ];
    // 🔹 Handle Mongoose duplicate key error
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = yield (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // 🔹 Handle Mongoose validation error
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = yield (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // 🔹 Handle Zod validation error
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = yield (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // 🔹 Handle Mongoose cast error (invalid ObjectId, etc.)
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = yield (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // 🔹 Handle custom AppError
    else if ((yield err) instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    // Final response
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.node_env === "development" ? err.stack : null,
    });
});
exports.default = globalErrorHandler;
