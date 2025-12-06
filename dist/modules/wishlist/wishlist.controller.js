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
exports.WishlistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const wishlist_service_1 = require("./wishlist.service");
const sendResponse_1 = __importDefault(require("../../utilitis/sendResponse"));
const createWishlistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const wishlistItem = yield wishlist_service_1.WishlistService.createWhishlistItemDto(productId, userId);
    return (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'wishlist item created successfully',
        data: wishlistItem
    });
});
const getWishlistItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const wishlistItems = yield wishlist_service_1.WishlistService.getWishlistItems(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'wishlist items created successfully',
        data: wishlistItems
    });
});
const deleteWishlistItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const wishlistItem = yield wishlist_service_1.WishlistService.deleteWishlistItem(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'wishlist item deleted successfully',
        data: wishlistItem
    });
});
exports.WishlistController = {
    createWishlistItem,
    getWishlistItems,
    deleteWishlistItem
};
