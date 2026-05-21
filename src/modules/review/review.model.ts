import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
});
export const Review = model<TReview>('Review', reviewSchema);