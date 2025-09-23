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
exports.productService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const products_model_1 = require("./products.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(payload);
    return result;
});
const getProductFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(products_model_1.Product.find(), query)
        .search(['name', 'description'])
        .filter()
        .sort();
    const result = yield productQuery.modelQuery;
    return result;
});
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById({ _id: id });
    return result;
});
const updateProductIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExits = yield products_model_1.Product.findById(id);
    if (!isProductExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product is not exits");
    }
    const result = yield products_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
});
const updateMultipleProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bulkOps = payload.map((update) => ({
        updateOne: {
            filter: { _id: update._id },
            update: { $set: { quantity: update.quantity } }
        }
    }));
    const result = yield products_model_1.Product.bulkWrite(bulkOps);
    return result;
});
const deleteProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExits = yield products_model_1.Product.findById(id);
    if (!isProductExits) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product is not exits");
    }
    const result = yield products_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.productService = {
    createProductIntoDb,
    getProductFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    updateMultipleProductIntoDb,
    deleteProductFromDb
};
