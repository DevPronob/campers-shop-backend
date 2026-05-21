import AppError from "../../errors/AppError";
import { TReview } from "./review.interface";
import { Review } from "./review.model";


const createReview = async (review: TReview) => {
    const result = await Review.create(review);
    return result;
};
const getReviewById = async (id: string) => {
    const review = await Review.findById(id);
    if (!review) {
        throw new AppError(404, "Review not found");
    }
    return review;
};
const getReviewByProductId = async (productId: string) => {
    const review = await Review.find({ productId:productId }).populate("userId").populate("productId");
    console.log("service",review)
    if (!review) {
        throw new AppError(404, "Review not found");
    }
    return review;
};
const getReviewByUserId = async (userId: string) => {
    const review = await Review.find({ userId });
    if (!review) {
        throw new AppError(404, "Review not found");
    }
    return review;
};
const updateReviewById = async (id: string, review: TReview) => {
    const updatedReview = await Review.findByIdAndUpdate(
        id,
        { rating: review.rating, comment: review.comment },
        { new: true, runValidators: true } 
    );
    return updatedReview;
    console.log(review,id,"review")
};
const deleteReviewById = async (id: string) => {
    const deletedReview = await Review.findByIdAndDelete(id);
    return deletedReview;
};

export const reviewService = {
    createReview,
    getReviewById,
    getReviewByProductId,
    getReviewByUserId,
    updateReviewById,
    deleteReviewById,
};