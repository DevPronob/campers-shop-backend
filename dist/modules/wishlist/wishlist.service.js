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
exports.WishlistService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const wishlist_model_1 = require("./wishlist.model");
const createWhishlistItemDto = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingItem = yield wishlist_model_1.Wishlist.findOne({ productId, userId });
    if (existingItem) {
        throw new AppError_1.default(400, "Product already in wishlist");
    }
    const wishListItem = yield wishlist_model_1.Wishlist.create({ productId, userId });
    return wishListItem;
});
const getWishlistItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistItems = yield wishlist_model_1.Wishlist.find({ userId }).populate("productId").populate("userId");
    return wishlistItems;
});
const deleteWishlistItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlistItem = yield wishlist_model_1.Wishlist.findByIdAndDelete(id);
    return wishlistItem;
});
exports.WishlistService = {
    createWhishlistItemDto,
    getWishlistItems,
    deleteWishlistItem
};
