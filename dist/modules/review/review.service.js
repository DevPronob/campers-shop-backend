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
exports.reviewService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const review_model_1 = require("./review.model");
const createReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(review);
    return result;
});
const getReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findById(id);
    if (!review) {
        throw new AppError_1.default(404, "Review not found");
    }
    return review;
});
const getReviewByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.find({ productId: productId }).populate("userId").populate("productId");
    console.log("service", review);
    if (!review) {
        throw new AppError_1.default(404, "Review not found");
    }
    return review;
});
const getReviewByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.find({ userId });
    if (!review) {
        throw new AppError_1.default(404, "Review not found");
    }
    return review;
});
const updateReviewById = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReview = yield review_model_1.Review.findByIdAndUpdate(id, { rating: review.rating, comment: review.comment }, { new: true, runValidators: true });
    return updatedReview;
    console.log(review, id, "review");
});
const deleteReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedReview = yield review_model_1.Review.findByIdAndDelete(id);
    return deletedReview;
});
exports.reviewService = {
    createReview,
    getReviewById,
    getReviewByProductId,
    getReviewByUserId,
    updateReviewById,
    deleteReviewById,
};
